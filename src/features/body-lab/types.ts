export type BodyCheckInKind = 'pump' | 'standard' | 'scan';
export type BodyCheckInStatus = 'draft' | 'uploading' | 'ready' | 'failed';
export type BodyMediaType = 'photo' | 'video';
export type BodyPose = 'front' | 'side' | 'back' | 'mirror' | 'other';

export type BodyCheckInDraft = {
  kind: BodyCheckInKind;
  workoutSessionId?: string | null;
  capturedAt?: string;
  weightKg?: number | null;
  bodyFatMin?: number | null;
  bodyFatMax?: number | null;
  measurements?: Record<string, number> | null;
  note?: string | null;
  cypherAnalysisConsent?: boolean;
};

export type BrowserBodyMedia = {
  file: File;
  mediaType: BodyMediaType;
  pose: BodyPose;
  width?: number | null;
  height?: number | null;
  durationMs?: number | null;
};

export type BodyMediaAsset = {
  id: string;
  checkInId: string;
  storagePath: string;
  mediaType: BodyMediaType;
  mimeType: string;
  pose: BodyPose;
  width: number | null;
  height: number | null;
  durationMs: number | null;
  fileSizeBytes: number | null;
  sortOrder: number;
  createdAt: string;
};

export type BodyCheckIn = {
  id: string;
  userId: string;
  workoutSessionId: string | null;
  clientRequestId: string | null;
  kind: BodyCheckInKind;
  status: BodyCheckInStatus;
  capturedAt: string;
  weightKg: number | null;
  bodyFatMin: number | null;
  bodyFatMax: number | null;
  measurements: Record<string, number> | null;
  note: string | null;
  cypherAnalysisConsent: boolean;
  createdAt: string;
  updatedAt: string;
  media: BodyMediaAsset[];
};

export type UploadProgress = {
  assetIndex: number;
  assetCount: number;
  assetPercent: number;
  overallPercent: number;
  fileName: string;
};
