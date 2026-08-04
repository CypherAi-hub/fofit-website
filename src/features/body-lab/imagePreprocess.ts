export type ImagePreprocessOptions = {
  maxLongEdge?: number;
  quality?: number;
  outputType?: 'image/jpeg' | 'image/webp';
};

export type PreprocessedImage = {
  file: File;
  width: number;
  height: number;
};

async function loadImage(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if ('createImageBitmap' in window) {
    return createImageBitmap(file);
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = 'async';
    image.src = objectUrl;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function sourceDimensions(source: ImageBitmap | HTMLImageElement) {
  if ('naturalWidth' in source) {
    return { width: source.naturalWidth, height: source.naturalHeight };
  }
  return { width: source.width, height: source.height };
}

export async function preprocessProgressImage(
  original: File,
  options: ImagePreprocessOptions = {},
): Promise<PreprocessedImage> {
  if (!original.type.startsWith('image/')) {
    throw new Error('The selected file is not an image.');
  }

  if (original.type === 'image/heic' || original.type === 'image/heif') {
    throw new Error('HEIC is not supported in this web build yet. Export as JPEG or use the mobile app.');
  }

  const maxLongEdge = options.maxLongEdge ?? 2200;
  const quality = options.quality ?? 0.86;
  const outputType = options.outputType ?? 'image/jpeg';

  const source = await loadImage(original);
  try {
    const { width: sourceWidth, height: sourceHeight } = sourceDimensions(source);
    const scale = Math.min(1, maxLongEdge / Math.max(sourceWidth, sourceHeight));
    const width = Math.max(1, Math.round(sourceWidth * scale));
    const height = Math.max(1, Math.round(sourceHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Image processing is unavailable in this browser.');

    context.drawImage(source, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => (result ? resolve(result) : reject(new Error('Could not encode image.'))),
        outputType,
        quality,
      );
    });

    const baseName = original.name.replace(/\.[^.]+$/, '') || 'progress-photo';
    const extension = outputType === 'image/webp' ? 'webp' : 'jpg';
    return {
      file: new File([blob], `${baseName}.${extension}`, {
        type: outputType,
        lastModified: Date.now(),
      }),
      width,
      height,
    };
  } finally {
    if ('close' in source && typeof source.close === 'function') source.close();
  }
}
