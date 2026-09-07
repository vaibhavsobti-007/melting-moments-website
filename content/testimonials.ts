import type { Testimonial } from "@/types";

/**
 * Client testimonials shown on /testimonials.
 *
 * These are placeholders on purpose — every quote below says so directly,
 * because a fake-but-plausible quote could be mistaken for a real client
 * review by someone visiting the live site. Replace each one with an actual
 * comment or DM from Instagram (with the commenter's permission to feature
 * it) before launch. See README.md → "Add a testimonial" for the workflow.
 */
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "This is a placeholder. Replace it with a real comment from your Instagram page — copy the client's exact wording.",
    author: "Add the client's name",
    source: "Instagram",
    featured: true,
    order: 0,
  },
  {
    id: "placeholder-2",
    quote:
      "Another placeholder slot. Screenshot or copy a genuine comment from a tagged post or DM, with permission to share it here.",
    author: "Add the client's name",
    source: "Instagram",
    order: 1,
  },
  {
    id: "placeholder-3",
    quote:
      "A third placeholder — remove this one entirely if you only have two real testimonials ready to publish.",
    author: "Add the client's name",
    source: "Instagram",
    order: 2,
  },
];

export function getTestimonials(): Testimonial[] {
  return [...testimonials].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getFeaturedTestimonials(limit = 3): Testimonial[] {
  return getTestimonials()
    .filter((testimonial) => testimonial.featured)
    .slice(0, limit);
}
