import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { getVisibleCategories } from "@content/categories";
import { photoRecordListSchema } from "@/lib/validations";
import type { Photo } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "photos");

/**
 * Reads and validates content/photos/<manifest>.json, then resolves each
 * record's `filename` into a public `src` under `srcDir`. Throws (failing
 * the build) if a photo is missing required fields like alt text — that's
 * intentional.
 */
function loadPool(manifest: string, srcDir: string): Photo[] {
  const file = path.join(CONTENT_DIR, `${manifest}.json`);
  if (!existsSync(file)) return [];

  const raw = JSON.parse(readFileSync(file, "utf-8"));
  const records = photoRecordListSchema.parse(raw);
  return records
    .map((record) => ({ ...record, src: `${srcDir}/${record.filename}` }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getPhotosByCategory(slug: string): Photo[] {
  return loadPool(slug, `/images/portfolio/${slug}`);
}

/** The homepage hero draws from this dedicated pool, not from any portfolio category. */
export function getHeroPhotos(): Photo[] {
  return loadPool("hero", "/images/hero");
}

/** The About page portrait draws from this dedicated pool. */
export function getAboutPhotos(): Photo[] {
  return loadPool("about", "/images/about");
}

export function getAllPhotos(): Photo[] {
  return getVisibleCategories().flatMap((category) => getPhotosByCategory(category.slug));
}

export function getFeaturedPhotos(limit = 8): Photo[] {
  return getAllPhotos()
    .filter((photo) => photo.featured)
    .slice(0, limit);
}

export function getPhotoById(category: string, id: string): Photo | undefined {
  return getPhotosByCategory(category).find((photo) => photo.id === id);
}

export function getAdjacentPhotos(category: string, id: string) {
  const photos = getPhotosByCategory(category);
  const index = photos.findIndex((photo) => photo.id === id);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? photos[index - 1] : undefined,
    next: index < photos.length - 1 ? photos[index + 1] : undefined,
  };
}
