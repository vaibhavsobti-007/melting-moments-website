#!/usr/bin/env node
/**
 * Scans public/images/{hero,about,portfolio/<category>}/ and syncs each
 * pool's content/photos/<manifest>.json.
 *
 * - New image files get a new manifest entry: dimensions read automatically,
 *   `title`/`alt` defaulted from the filename (edit them to something real —
 *   the auto-generated `alt` deliberately flags itself as a placeholder so
 *   it's never mistaken for a finished, accessible description).
 * - Existing entries are left untouched (your titles, alt text, `featured`,
 *   and `order` are preserved) except width/height, which are re-checked.
 * - Entries whose image file no longer exists are reported, not deleted —
 *   remove them from the JSON by hand once you've confirmed the file is gone.
 *
 * Usage: npm run sync-photos
 */
import { readdirSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { imageSize } from "image-size";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const IMAGES_DIR = join(ROOT, "public/images");
const PORTFOLIO_DIR = join(IMAGES_DIR, "portfolio");
const CONTENT_DIR = join(ROOT, "content/photos");
const VALID_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function humanize(id) {
  return id
    .replace(/-placeholder$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function loadExisting(manifest) {
  const file = join(CONTENT_DIR, `${manifest}.json`);
  if (!existsSync(file)) return [];
  try {
    return JSON.parse(readFileSync(file, "utf-8"));
  } catch (err) {
    console.error(`  ! Could not parse ${file}, starting fresh:`, err.message);
    return [];
  }
}

/**
 * @param manifest  base name of the JSON file under content/photos/
 * @param dir       directory of image files on disk for this pool
 * @param category  value stored in each record's `category` field
 */
function syncPool(manifest, dir, category) {
  const files = readdirSync(dir).filter((f) => VALID_EXT.has(extname(f).toLowerCase()));
  const existing = loadExisting(manifest);
  const existingById = new Map(existing.map((p) => [p.id, p]));
  const seenIds = new Set();

  const result = files.map((file, index) => {
    const id = basename(file, extname(file));
    seenIds.add(id);
    const { width, height } = imageSize(readFileSync(join(dir, file)));

    const prior = existingById.get(id);
    if (prior) {
      return { ...prior, filename: file, width, height, category };
    }

    const isPlaceholder = id.endsWith("-placeholder");
    console.log(`  + new photo: ${manifest}/${file}`);
    return {
      id,
      filename: file,
      category,
      title: humanize(id),
      alt: isPlaceholder
        ? `Placeholder photo for ${humanize(id)} — replace with real photography`
        : humanize(id),
      width,
      height,
      order: index,
    };
  });

  for (const prior of existing) {
    if (!seenIds.has(prior.id)) {
      console.warn(`  ! ${manifest}/${prior.id} is in the manifest but the image file is missing`);
    }
  }

  result.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  mkdirSync(CONTENT_DIR, { recursive: true });
  writeFileSync(join(CONTENT_DIR, `${manifest}.json`), JSON.stringify(result, null, 2) + "\n");
  console.log(`  synced ${result.length} photo(s) -> content/photos/${manifest}.json`);
}

function main() {
  const pools = [];

  // Dedicated, non-portfolio pools.
  for (const name of ["hero", "about"]) {
    const dir = join(IMAGES_DIR, name);
    if (existsSync(dir)) pools.push({ manifest: name, dir, category: name });
  }

  // One pool per portfolio category — folder name is the category slug.
  if (existsSync(PORTFOLIO_DIR)) {
    const categorySlugs = readdirSync(PORTFOLIO_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    for (const slug of categorySlugs) {
      pools.push({ manifest: slug, dir: join(PORTFOLIO_DIR, slug), category: slug });
    }
  }

  if (pools.length === 0) {
    console.error(`No image pools found under ${IMAGES_DIR}`);
    process.exit(1);
  }

  for (const pool of pools) {
    console.log(`\n${pool.manifest}`);
    syncPool(pool.manifest, pool.dir, pool.category);
  }
  console.log("\nDone.");
}

main();
