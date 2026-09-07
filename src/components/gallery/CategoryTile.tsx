import Image from "next/image";
import Link from "next/link";
import type { Category, Photo } from "@/types";

export function CategoryTile({
  category,
  cover,
  count,
}: {
  category: Category;
  cover: Photo | undefined;
  count: number;
}) {
  return (
    <Link
      href={`/portfolio/${category.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-cloud/5"
    >
      {cover ? (
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
        />
      ) : null}
      <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
        <span className="font-display text-2xl text-paper sm:text-3xl">{category.title}</span>
        <span className="text-xs uppercase tracking-[0.12em] text-paper/70">
          {count} {count === 1 ? "photo" : "photos"}
        </span>
      </span>
    </Link>
  );
}
