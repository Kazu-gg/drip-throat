import manifest from "@/lib/generated/optimized-images.json";

export type OptimizedImage = {
  src: string;
  width: number;
  height: number;
  bytes: number;
};

type ImageManifest = Record<string, OptimizedImage>;

const images = manifest as ImageManifest;

export function getOptimizedImage(key: string): OptimizedImage | undefined {
  return images[key];
}

/** Prefer optimized local image; fall back to placeholder URL until uploaded. */
export function optimizedSrc(key: string, fallback: string): string {
  return images[key]?.src ?? fallback;
}

export function optimizedDimensions(
  key: string
): { width: number; height: number } | undefined {
  const entry = images[key];
  if (!entry) return undefined;
  return { width: entry.width, height: entry.height };
}
