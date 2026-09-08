import type { Testimonial } from "@/types";

/**
 * Client testimonials shown on /testimonials.
 *
 * Real quotes, sourced from actual Facebook/Instagram reviews and DMs.
 */
export const testimonials: Testimonial[] = [
  {
    id: "deepali-bohra",
    quote:
      "Melting moments photography by Sakshi is so amazing to work with. Thank you so much Sakshi. This was a very big moment for all of us that you captured remarkably and you made it so easy, relaxing, comfortable and memorable with your calm and awesomeness. Your imagination and attention to our needs and all the little details was commendable. We all are very happy and satisfied with the photo shoot.",
    author: "Deepali Bohra",
    source: "Facebook",
    featured: true,
    order: 0,
  },
  {
    id: "amrita-anand",
    quote:
      "Photoshoot with Sakshi is a wonderful experience. Thank you Sakshi for making our special moment memorable. Photographs are simply gorgeous. I would highly recommend her and appreciate her work very much.",
    author: "Amrita Anand",
    source: "Facebook",
    featured: true,
    order: 1,
  },
  {
    id: "family-royal-theme",
    quote:
      "I've received our last family photoshoot pictures from Sakshi and they are amazing! Ankit and I couldn't recommend her enough. I must say, Sakshi is very friendly, welcoming and professional and was so good at capturing natural, candid shots of us. The royal theme of our last photoshoot especially the kids' pictures with all the editing and props that she arranged were so well captured to cherish them forever. Thank you so much. Looking forward to our next shoot soon.",
    author: "Smita Gupta",
    source: "Instagram",
    order: 2,
  },
  {
    id: "daughter-first-birthday",
    quote:
      "Amazing experience with Sakshi.. my daughter's first bday is so much memorable now... Sakshi captured her so beautifully... Very creative, patient and so open for ideas. Make this lockdown memorable for good reasons... get clicked at the comfort of our own society.",
    author: "Shradha",
    source: "Instagram",
    order: 3,
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
