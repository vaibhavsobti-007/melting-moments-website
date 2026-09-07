import type { PricingPackage } from "@/types";

/**
 * Pricing packages shown on /pricing and the home-page teaser.
 * Add, remove, or reorder entries freely — the pricing page renders
 * whatever is in this array.
 */
export const pricingPackages: PricingPackage[] = [
  {
    id: "portrait",
    name: "Portrait Session",
    priceLabel: "From $350",
    description:
      "A relaxed session built around real light and real expressions — for individuals, couples, or families who want a portrait that actually feels like them.",
    inclusions: [
      "60-minute session, one location",
      "Up to 2 outfit changes",
      "15 retouched high-resolution images + 15 lightly edited images",
      "Private online gallery",
      "Print release included",
    ],
  },
  {
    id: "birthday-milestone",
    name: "Birthday & Milestone Session",
    priceLabel: "From $450",
    description:
      "A celebration session built to capture the whole feeling of the day — cake smash, milk bath, and family portraits, alongside the candid moments in between that guests won't think to photograph.",
    inclusions: [
      "90-minute on-location session",
      "Cake smash, milk bath, and family portraits",
      "15 retouched high-resolution images + 15 lightly edited images",
      "Private online gallery",
      "Print release included",
    ],
    featured: true,
  },
  {
    id: "custom",
    name: "Extended Session",
    priceLabel: "Hourly, on request",
    description:
      "For anything that goes beyond a single session — a multi-generation family shoot, a milestone celebration, a personal project with multiple looks. Tell me what you're imagining and we'll build the timeline together.",
    inclusions: [
      "90+ minutes minimum",
      "Tailored shot list and timeline",
      "Image gallery sized to match your session length",
      "Priced hourly — get in touch for a rate",
    ],
  },
];
