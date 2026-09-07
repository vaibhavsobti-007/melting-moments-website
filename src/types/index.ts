export type Category = {
  slug: string;
  title: string;
  description: string;
  coverPhotoId: string;
  order: number;
  visible: boolean;
};

/**
 * As authored in content/photos/*.json — everything a photo needs, keyed to
 * a physical file by `filename` alone. Replacing a placeholder is just
 * overwriting that file; nothing here needs to change unless the caption
 * changes too.
 */
export type PhotoRecord = {
  id: string;
  filename: string;
  category: string;
  title: string;
  alt: string;
  featured?: boolean;
  order?: number;
  /** Original source filename (e.g. from the camera/Drive export), for reference only. */
  originalFilename?: string;
  // Populated by `npm run sync-photos` — not hand-authored.
  width: number;
  height: number;
};

/** A PhotoRecord plus its resolved public URL, computed at load time. */
export type Photo = PhotoRecord & { src: string };

export type PricingPackage = {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  inclusions: string[];
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  /** e.g. "Instagram", "Google Review" — shown next to the author. */
  source: string;
  /** Link to the original comment/post, if there is one. */
  sourceUrl?: string;
  featured?: boolean;
  order?: number;
};
