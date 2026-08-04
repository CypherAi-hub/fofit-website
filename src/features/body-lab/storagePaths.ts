const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/webm': 'webm',
};

export function extensionForMimeType(mimeType: string): string {
  const extension = EXTENSIONS[mimeType.toLowerCase()];
  if (!extension) throw new Error(`Unsupported media type: ${mimeType || 'unknown'}`);
  return extension;
}

function assertUuid(value: string, label: string): void {
  if (!UUID_RE.test(value)) throw new Error(`${label} must be a UUID.`);
}

export function buildBodyMediaPath(input: {
  userId: string;
  checkInId: string;
  assetId: string;
  mimeType: string;
}): string {
  assertUuid(input.userId, 'userId');
  assertUuid(input.checkInId, 'checkInId');
  assertUuid(input.assetId, 'assetId');

  const extension = extensionForMimeType(input.mimeType);
  return `${input.userId}/${input.checkInId}/${input.assetId}.${extension}`;
}

export function pathBelongsToUser(storagePath: string, userId: string): boolean {
  if (!UUID_RE.test(userId)) return false;
  return storagePath.startsWith(`${userId}/`) && !storagePath.includes('..');
}
