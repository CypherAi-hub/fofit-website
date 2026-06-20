import { useCallback, useEffect, useRef, useState } from "react";

import { supabase } from "../../lib/supabase";
import {
  deleteBodyCheckIn,
  getSignedBodyMediaUrl,
  listBodyTimeline,
  saveBodyCheckInWeb,
} from "./bodyLabService";
import type {
  BodyCheckIn,
  BodyCheckInDraft,
  BrowserBodyMedia,
  UploadProgress,
} from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

export type TimelineState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; checkIns: BodyCheckIn[] };

/**
 * The Body Lab data layer for the web page. Owns the timeline, the per-thumbnail
 * signed URLs (private bucket — refreshed on load), and the upload lifecycle with
 * progress + cancel. Never reports an upload "saved" — that verification lives in
 * saveBodyCheckInWeb (refetch + status check).
 */
export function useBodyLab() {
  const [timeline, setTimeline] = useState<TimelineState>({ status: "loading" });
  const [thumbUrls, setThumbUrls] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    setTimeline({ status: "loading" });
    try {
      const checkIns = await listBodyTimeline(supabase, 50);
      if (!mountedRef.current) return;
      setTimeline({ status: "ready", checkIns });

      // Sign the first photo per check-in for thumbnails. Per-item catch so one
      // bad signed URL never fails the whole timeline.
      const entries = await Promise.all(
        checkIns.map(async (checkIn) => {
          const photo =
            checkIn.media.find((m) => m.mediaType === "photo") ?? checkIn.media[0];
          if (!photo) return null;
          try {
            const url = await getSignedBodyMediaUrl(supabase, photo.storagePath);
            return [checkIn.id, url] as const;
          } catch {
            return null;
          }
        }),
      );
      if (!mountedRef.current) return;
      const map: Record<string, string> = {};
      for (const entry of entries) if (entry) map[entry[0]] = entry[1];
      setThumbUrls(map);
    } catch (e) {
      if (!mountedRef.current) return;
      setTimeline({
        status: "error",
        message: e instanceof Error ? e.message : "Could not load your Body Lab.",
      });
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const upload = useCallback(
    async (draft: BodyCheckInDraft, media: BrowserBodyMedia[]): Promise<boolean> => {
      setUploadError(null);
      setUploadProgress({
        assetIndex: 0,
        assetCount: media.length,
        assetPercent: 0,
        overallPercent: 0,
        fileName: media[0]?.file.name ?? "",
      });
      const controller = new AbortController();
      abortRef.current = controller;
      const clientRequestId = crypto.randomUUID();
      try {
        await saveBodyCheckInWeb({
          config: { supabase, supabaseUrl: SUPABASE_URL },
          draft,
          media,
          clientRequestId,
          signal: controller.signal,
          onProgress: (p) => {
            if (mountedRef.current) setUploadProgress(p);
          },
        });
        if (mountedRef.current) setUploadProgress(null);
        await refresh();
        return true;
      } catch (e) {
        if (!mountedRef.current) return false;
        setUploadProgress(null);
        if (e instanceof DOMException && e.name === "AbortError") {
          setUploadError("Upload cancelled.");
        } else {
          setUploadError(e instanceof Error ? e.message : "Upload failed. Please try again.");
        }
        return false;
      } finally {
        abortRef.current = null;
      }
    },
    [refresh],
  );

  const cancelUpload = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const remove = useCallback(
    async (checkInId: string): Promise<void> => {
      await deleteBodyCheckIn(supabase, checkInId);
      await refresh();
    },
    [refresh],
  );

  /** Sign a private media path on demand (for the full-size viewer). */
  const signMediaUrl = useCallback(
    (storagePath: string): Promise<string> => getSignedBodyMediaUrl(supabase, storagePath),
    [],
  );

  const clearUploadError = useCallback(() => setUploadError(null), []);

  return {
    timeline,
    thumbUrls,
    uploadProgress,
    uploadError,
    upload,
    cancelUpload,
    remove,
    refresh,
    signMediaUrl,
    clearUploadError,
  };
}
