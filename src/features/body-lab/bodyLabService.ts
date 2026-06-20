import type { SupabaseClient } from '@supabase/supabase-js';

import { preprocessProgressImage } from './imagePreprocess';
import { uploadResumable } from './resumableUpload';
import { buildBodyMediaPath, pathBelongsToUser } from './storagePaths';
import type {
  BodyCheckIn,
  BodyCheckInDraft,
  BodyMediaAsset,
  BrowserBodyMedia,
  UploadProgress,
} from './types';

const BODY_MEDIA_BUCKET = 'body-lab-private';
const RESUMABLE_THRESHOLD_BYTES = 6 * 1024 * 1024;

type ServiceConfig = {
  supabase: SupabaseClient;
  supabaseUrl: string;
};

function mapMedia(row: Record<string, unknown>): BodyMediaAsset {
  return {
    id: String(row.id),
    checkInId: String(row.check_in_id),
    storagePath: String(row.storage_path),
    mediaType: row.media_type as BodyMediaAsset['mediaType'],
    mimeType: String(row.mime_type),
    pose: row.pose as BodyMediaAsset['pose'],
    width: (row.width as number | null) ?? null,
    height: (row.height as number | null) ?? null,
    durationMs: (row.duration_ms as number | null) ?? null,
    fileSizeBytes: (row.file_size_bytes as number | null) ?? null,
    sortOrder: Number(row.sort_order ?? 0),
    createdAt: String(row.created_at),
  };
}

function mapCheckIn(row: Record<string, unknown>): BodyCheckIn {
  const nestedMedia = (row.body_media_assets ?? []) as Record<string, unknown>[];
  return {
    id: String(row.id),
    userId: String(row.user_id),
    workoutSessionId: (row.workout_session_id as string | null) ?? null,
    clientRequestId: (row.client_request_id as string | null) ?? null,
    kind: row.kind as BodyCheckIn['kind'],
    status: row.status as BodyCheckIn['status'],
    capturedAt: String(row.captured_at ?? row.created_at),
    weightKg: (row.weight_kg as number | null) ?? null,
    bodyFatMin: (row.body_fat_min as number | null) ?? null,
    bodyFatMax: (row.body_fat_max as number | null) ?? null,
    measurements: (row.measurements as Record<string, number> | null) ?? null,
    note: (row.note as string | null) ?? null,
    cypherAnalysisConsent: Boolean(row.cypher_analysis_consent),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    media: nestedMedia.map(mapMedia).sort((a, b) => a.sortOrder - b.sortOrder),
  };
}

async function requireUser(supabase: SupabaseClient) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error('You must be signed in.');
  return user;
}

async function clearDraftAssets(supabase: SupabaseClient, checkInId: string): Promise<void> {
  const { data: assets } = await supabase
    .from("body_media_assets")
    .select("storage_path")
    .eq("check_in_id", checkInId);
  const paths = (assets ?? [])
    .map((a) => String((a as Record<string, unknown>).storage_path))
    .filter(Boolean);
  if (paths.length > 0) {
    await supabase.storage.from(BODY_MEDIA_BUCKET).remove(paths);
  }
  await supabase.from("body_media_assets").delete().eq("check_in_id", checkInId);
  await supabase
    .from("body_check_ins")
    .update({ status: "uploading", failure_reason: null })
    .eq("id", checkInId);
}

async function createOrReuseDraft(
  supabase: SupabaseClient,
  userId: string,
  clientRequestId: string,
  draft: BodyCheckInDraft,
): Promise<Record<string, unknown>> {
  const { data: existing, error: existingError } = await supabase
    .from('body_check_ins')
    .select('*')
    .eq('client_request_id', clientRequestId)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing) {
    // Already-complete (a verify-fail retry, or a duplicate request): return as-is so the caller
    // short-circuits to the ready check-in. NEVER clear a ready check-in's media.
    if (existing.status === "ready") return existing as Record<string, unknown>;
    // Otherwise it's a partial/failed attempt: clear partial assets (storage + rows) + reset so
    // the re-upload starts clean (otherwise finalize's media-count check never matches — review).
    await clearDraftAssets(supabase, String(existing.id));
    return { ...(existing as Record<string, unknown>), status: "uploading" };
  }

  const { data, error } = await supabase
    .from('body_check_ins')
    .insert({
      user_id: userId,
      client_request_id: clientRequestId,
      workout_session_id: draft.workoutSessionId ?? null,
      kind: draft.kind,
      status: 'uploading',
      captured_at: draft.capturedAt ?? new Date().toISOString(),
      weight_kg: draft.weightKg ?? null,
      body_fat_min: draft.bodyFatMin ?? null,
      body_fat_max: draft.bodyFatMax ?? null,
      measurements: draft.measurements ?? null,
      note: draft.note?.trim() || null,
      cypher_analysis_consent: draft.cypherAnalysisConsent ?? false,
      source_platform: 'web',
    })
    .select('*')
    .single();

  if (error) throw error;
  return data as Record<string, unknown>;
}

async function markFailed(
  supabase: SupabaseClient,
  checkInId: string,
  error: unknown,
): Promise<void> {
  const reason = error instanceof Error ? error.message : 'Unknown upload failure';
  await supabase
    .from('body_check_ins')
    .update({ status: 'failed', failure_reason: reason.slice(0, 500) })
    .eq('id', checkInId);
}

async function uploadOneAsset(input: {
  config: ServiceConfig;
  userId: string;
  checkInId: string;
  media: BrowserBodyMedia;
  sortOrder: number;
  signal?: AbortSignal;
  onProgress?: (percent: number) => void;
}): Promise<void> {
  const { config, userId, checkInId, media, sortOrder, signal, onProgress } = input;
  const assetId = crypto.randomUUID();

  let file = media.file;
  let width = media.width ?? null;
  let height = media.height ?? null;

  if (media.mediaType === 'photo') {
    const processed = await preprocessProgressImage(media.file);
    file = processed.file;
    width = processed.width;
    height = processed.height;
  }

  const storagePath = buildBodyMediaPath({
    userId,
    checkInId,
    assetId,
    mimeType: file.type,
  });

  let uploaded = false;
  try {
    if (media.mediaType === 'video' || file.size >= RESUMABLE_THRESHOLD_BYTES) {
      await uploadResumable({
        supabase: config.supabase,
        supabaseUrl: config.supabaseUrl,
        bucketName: BODY_MEDIA_BUCKET,
        objectPath: storagePath,
        file,
        signal,
        onProgress,
      });
    } else {
      if (signal?.aborted) throw new DOMException('Upload cancelled.', 'AbortError');
      const { error } = await config.supabase.storage
        .from(BODY_MEDIA_BUCKET)
        .upload(storagePath, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false,
        });
      if (error) throw error;
      onProgress?.(100);
    }

    uploaded = true;

    const { error: assetError } = await config.supabase.from('body_media_assets').insert({
      id: assetId,
      check_in_id: checkInId,
      user_id: userId,
      storage_path: storagePath,
      media_type: media.mediaType,
      mime_type: file.type,
      pose: media.pose,
      width,
      height,
      duration_ms: media.durationMs ?? null,
      file_size_bytes: file.size,
      sort_order: sortOrder,
      upload_status: 'ready',
    });

    if (assetError) throw assetError;
  } catch (error) {
    if (uploaded) {
      await config.supabase.storage.from(BODY_MEDIA_BUCKET).remove([storagePath]);
    }
    throw error;
  }
}

export async function saveBodyCheckInWeb(input: {
  config: ServiceConfig;
  draft: BodyCheckInDraft;
  media: BrowserBodyMedia[];
  clientRequestId: string;
  signal?: AbortSignal;
  onProgress?: (progress: UploadProgress) => void;
}): Promise<BodyCheckIn> {
  const { config, draft, media, clientRequestId, signal, onProgress } = input;
  if (media.length === 0) throw new Error('Add at least one photo or video.');

  const user = await requireUser(config.supabase);
  const checkInRow = await createOrReuseDraft(
    config.supabase,
    user.id,
    clientRequestId,
    draft,
  );
  const checkInId = String(checkInRow.id);

  if (checkInRow.status === 'ready') {
    return getBodyCheckIn(config.supabase, checkInId);
  }

  try {
    for (let index = 0; index < media.length; index += 1) {
      await uploadOneAsset({
        config,
        userId: user.id,
        checkInId,
        media: media[index],
        sortOrder: index,
        signal,
        onProgress(assetPercent) {
          const overallPercent = ((index + assetPercent / 100) / media.length) * 100;
          onProgress?.({
            assetIndex: index,
            assetCount: media.length,
            assetPercent,
            overallPercent,
            fileName: media[index].file.name,
          });
        },
      });
    }

    const { error: finalizeError } = await config.supabase.rpc('finalize_body_check_in', {
      p_check_in_id: checkInId,
    });
    if (finalizeError) throw finalizeError;
  } catch (error) {
    await markFailed(config.supabase, checkInId, error);
    throw error;
  }

  // Finalize committed → the check-in IS ready. The verify below is a read-only sanity check; a
  // transient refetch failure must NOT downgrade a committed-ready check-in to failed (review).
  // On a verify error the caller can retry — createOrReuseDraft short-circuits the now-ready draft.
  const persisted = await getBodyCheckIn(config.supabase, checkInId);
  if (persisted.status !== 'ready' || persisted.media.length !== media.length) {
    throw new Error('The check-in could not be verified after upload.');
  }
  return persisted;
}

export async function getBodyCheckIn(
  supabase: SupabaseClient,
  checkInId: string,
): Promise<BodyCheckIn> {
  const { data, error } = await supabase
    .from('body_check_ins')
    .select('*, body_media_assets(*)')
    .eq('id', checkInId)
    .single();
  if (error) throw error;
  return mapCheckIn(data as Record<string, unknown>);
}

export async function listBodyTimeline(
  supabase: SupabaseClient,
  limit = 50,
): Promise<BodyCheckIn[]> {
  const { data, error } = await supabase
    .from('body_check_ins')
    .select('*, body_media_assets(*)')
    .eq('status', 'ready')
    .order('captured_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map((row) => mapCheckIn(row as Record<string, unknown>));
}

export async function getSignedBodyMediaUrl(
  supabase: SupabaseClient,
  storagePath: string,
  expiresInSeconds = 600,
): Promise<string> {
  const user = await requireUser(supabase);
  if (!pathBelongsToUser(storagePath, user.id)) {
    throw new Error('Invalid private media path.');
  }

  const { data, error } = await supabase.storage
    .from(BODY_MEDIA_BUCKET)
    .createSignedUrl(storagePath, expiresInSeconds);
  if (error) throw error;
  return data.signedUrl;
}

export async function deleteBodyCheckIn(
  supabase: SupabaseClient,
  checkInId: string,
): Promise<void> {
  const checkIn = await getBodyCheckIn(supabase, checkInId);
  const paths = checkIn.media.map((asset) => asset.storagePath);

  if (paths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from(BODY_MEDIA_BUCKET)
      .remove(paths);
    if (storageError) throw storageError;
  }

  const { error: rowError } = await supabase
    .from('body_check_ins')
    .delete()
    .eq('id', checkInId);
  if (rowError) throw rowError;
}
