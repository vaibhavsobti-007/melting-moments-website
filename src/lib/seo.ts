import type { Metadata } from "next";
import { site } from "@content/site";
import { getHeroPhotos } from "@/lib/photos";

export function buildMetadata(params: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${site.url}${params.path}`;
  // Next.js replaces the parent's `openGraph`/`twitter` objects wholesale
  // rather than deep-merging them, so every page needs its own fallback
  // image. Drawn from the hero pool at request time — never a hardcoded
  // filename — so it keeps working as hero photos are added or replaced.
  const image = params.image ?? getHeroPhotos()[0]?.src;
  return {
    title: params.title,
    description: params.description,
    alternates: { canonical: url },
    openGraph: {
      title: params.title,
      description: params.description,
      url,
      siteName: site.brand,
      type: "website",
      images: image ? [{ url: `${site.url}${image}` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
      images: image ? [`${site.url}${image}`] : undefined,
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.brand,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    url: site.url,
    areaServed: site.location,
    sameAs: site.social.map((s) => s.url),
    founder: {
      "@type": "Person",
      name: site.ownerName,
    },
  };
}
