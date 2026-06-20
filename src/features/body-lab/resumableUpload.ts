import type { SupabaseClient } from '@supabase/supabase-js';
import * as tus from 'tus-js-client';

export type ResumableUploadInput = {
  supabase: SupabaseClient;
  supabaseUrl: string;
  bucketName: string;
  objectPath: string;
  file: File;
  signal?: AbortSignal;
  onProgress?: (percent: number) => void;
};

function projectIdFromSupabaseUrl(supabaseUrl: string): string {
  const hostname = new URL(supabaseUrl).hostname;
  const projectId = hostname.split('.')[0];
  if (!projectId) throw new Error('Could not determine Supabase project ID.');
  return projectId;
}

export async function uploadResumable({
  supabase,
  supabaseUrl,
  bucketName,
  objectPath,
  file,
  signal,
  onProgress,
}: ResumableUploadInput): Promise<void> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;
  if (!session?.access_token) throw new Error('You must be signed in to upload media.');

  const projectId = projectIdFromSupabaseUrl(supabaseUrl);

  return new Promise<void>((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: `https://${projectId}.storage.supabase.co/storage/v1/upload/resumable`,
      retryDelays: [0, 3_000, 5_000, 10_000, 20_000],
      headers: {
        authorization: `Bearer ${session.access_token}`,
        'x-upsert': 'false',
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName,
        objectName: objectPath,
        contentType: file.type || 'application/octet-stream',
        cacheControl: '3600',
      },
      chunkSize: 6 * 1024 * 1024,
      onError: reject,
      onProgress(bytesUploaded, bytesTotal) {
        const percent = bytesTotal === 0 ? 0 : (bytesUploaded / bytesTotal) * 100;
        onProgress?.(Math.max(0, Math.min(100, percent)));
      },
      onSuccess() {
        resolve();
      },
    });

    const abort = () => {
      upload.abort(true).finally(() => reject(new DOMException('Upload cancelled.', 'AbortError')));
    };

    if (signal?.aborted) {
      abort();
      return;
    }

    signal?.addEventListener('abort', abort, { once: true });

    upload
      .findPreviousUploads()
      .then((previousUploads) => {
        if (previousUploads.length > 0) upload.resumeFromPreviousUpload(previousUploads[0]);
        upload.start();
      })
      .catch(reject);
  });
}
