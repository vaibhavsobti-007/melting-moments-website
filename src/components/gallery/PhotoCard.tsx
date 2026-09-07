import Image from "next/image";
import type { Photo } from "@/types";

export function PhotoCard({
  photo,
  onOpen,
  sizes,
  priority = false,
  index,
}: {
  photo: Photo;
  onOpen: () => void;
  sizes: string;
  priority?: boolean;
  /** 1-based position within its gallery — shown as an editorial index mark on hover. */
  index?: number;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative mb-4 block w-full overflow-hidden bg-cloud/5 focus-visible:outline-offset-4 sm:mb-6"
      aria-label={`Open photo: ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full object-contain transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
      />
      <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
      {index !== undefined ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-4 font-display text-sm italic text-paper opacity-0 [text-shadow:0_1px_10px_rgba(247,241,231,0.85)] transition-opacity duration-500 group-hover:opacity-90"
        >
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-8 text-sm text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
      >
        {photo.title}
      </span>
    </button>
  );
}
