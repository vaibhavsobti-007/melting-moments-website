import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { getVisibleCategories } from "@content/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/portfolio", "/pricing", "/testimonials", "/about", "/contact"];
  const categoryPaths = getVisibleCategories().map((c) => `/portfolio/${c.slug}`);

  return [...staticPaths, ...categoryPaths].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
