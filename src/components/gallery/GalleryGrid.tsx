"use client";

import type { Photo } from "@/types";
import { useLightbox } from "@/lib/useLightbox";
import { PhotoCard } from "./PhotoCard";
import { Lightbox } from "./Lightbox";

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const { index, open, close, next, prev } = useLightbox(photos.length);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 sm:gap-6 lg:columns-3">
        {photos.map((photo, i) => (
          <div key={photo.id} className="break-inside-avoid">
            <PhotoCard
              photo={photo}
              onOpen={() => open(i)}
              priority={i < 2}
              index={i + 1}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>

      {index !== null ? (
        <Lightbox photos={photos} index={index} onClose={close} onNext={next} onPrev={prev} />
      ) : null}
    </>
  );
}
