import type { Metadata } from "next";
import { getVisibleCategories } from "@content/categories";
import { getPhotosByCategory } from "@/lib/photos";
import { CategoryTile } from "@/components/gallery/CategoryTile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description: "Browse photography by category — portraits, families, couples, and more.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const categories = getVisibleCategories();

  return (
    <Section className="py-32 sm:py-40">
      <Reveal>
        <h1 className="max-w-2xl text-balance font-heading text-5xl font-medium text-paper sm:text-6xl">
          Portfolio
        </h1>
        <p className="mt-4 max-w-xl text-base text-paper/70 sm:text-lg">
          A selection of work across portraits, milestones, and personal projects.
        </p>
      </Reveal>

      <Reveal className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {categories.map((category) => {
          const photos = getPhotosByCategory(category.slug);
          return (
            <CategoryTile
              key={category.slug}
              category={category}
              cover={photos.find((p) => p.id === category.coverPhotoId) ?? photos[0]}
              count={photos.length}
            />
          );
        })}
      </Reveal>
    </Section>
  );
}
