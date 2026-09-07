import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug, getVisibleCategories } from "@content/categories";
import { getPhotoById, getPhotosByCategory } from "@/lib/photos";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  const cover = getPhotoById(category.slug, category.coverPhotoId);
  return buildMetadata({
    title: category.title,
    description: category.description,
    path: `/portfolio/${category.slug}`,
    image: cover?.src,
  });
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category || !getVisibleCategories().some((c) => c.slug === category.slug)) {
    notFound();
  }

  const photos = getPhotosByCategory(category.slug);

  return (
    <Section className="py-32 sm:py-40">
      <Link
        href="/portfolio"
        className="text-sm uppercase tracking-[0.12em] text-paper/70 hover:text-paper"
      >
        ← Back to Portfolio
      </Link>

      <Reveal>
        <h1 className="mt-6 text-balance font-heading text-5xl font-medium text-paper sm:text-6xl">
          {category.title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-paper/70 sm:text-lg">{category.description}</p>
      </Reveal>

      <div className="mt-14">
        {photos.length > 0 ? (
          <GalleryGrid photos={photos} />
        ) : (
          <p className="text-paper/70">No photos in this gallery yet.</p>
        )}
      </div>
    </Section>
  );
}
