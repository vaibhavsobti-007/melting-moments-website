import type { Category } from "@/types";

/**
 * Portfolio categories. To add a new category:
 * 1. Create a folder in public/images/portfolio/<slug>/ and add photos to it.
 * 2. Add an entry below.
 * 3. Run `npm run sync-photos`.
 * No component changes required — /portfolio/[category] picks it up automatically.
 */
export const categories: Category[] = [
  {
    slug: "portraits",
    title: "Portraits",
    description:
      "Portraits built around real light and real expression — for people who'd rather remember a feeling than a pose.",
    coverPhotoId: "portrait-01",
    order: 1,
    visible: true,
  },
  {
    slug: "graduation-milestones",
    title: "Graduation & Milestones",
    description:
      "The milestones worth marking — graduations, achievements, and the moments that deserve more than a phone photo.",
    coverPhotoId: "graduation-01",
    order: 2,
    visible: true,
  },
  {
    slug: "maternity",
    title: "Maternity",
    description:
      "The quiet weeks before everything changes — soft, honest, and entirely yours.",
    coverPhotoId: "maternity-01",
    order: 3,
    visible: true,
  },
  {
    slug: "family",
    title: "Family",
    description:
      "Real family moments — the chaos, the closeness, the in-between seconds that actually look like you.",
    coverPhotoId: "family-01",
    order: 4,
    visible: true,
  },
  {
    slug: "couples",
    title: "Couples",
    description:
      "For two people, in love, being exactly themselves in front of the camera.",
    coverPhotoId: "couples-01",
    order: 5,
    visible: true,
  },
  {
    slug: "birthday-milestones",
    title: "Birthday Milestones",
    description:
      "The birthdays worth remembering — candles, cake, and the small candid seconds around them that make a year feel like a year.",
    coverPhotoId: "birthday-01",
    order: 6,
    visible: true,
  },
  {
    slug: "creative-lifestyle",
    title: "Creative / Lifestyle",
    description:
      "Personal, unscripted work — creative frames shot for no reason other than they were worth keeping.",
    coverPhotoId: "creative-01",
    order: 7,
    visible: true,
  },
];

export function getVisibleCategories(): Category[] {
  return [...categories]
    .filter((category) => category.visible)
    .sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
