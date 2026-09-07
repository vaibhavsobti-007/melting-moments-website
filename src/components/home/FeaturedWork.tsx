"use client";

import type { Photo } from "@/types";
import { useLightbox } from "@/lib/useLightbox";
import { PhotoCard } from "@/components/gallery/PhotoCard";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedWork({ photos }: { photos: Photo[] }) {
  const { index, open, close, next, prev } = useLightbox(photos.length);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <Reveal key={photo.id} className={i === 0 ? "col-span-2" : ""}>
            <PhotoCard
              photo={photo}
              onOpen={() => open(i)}
              priority={i === 0}
              index={i + 1}
              sizes={i === 0 ? "100vw" : "(min-width: 1024px) 33vw, 50vw"}
            />
          </Reveal>
        ))}
      </div>

      {index !== null ? (
        <Lightbox photos={photos} index={index} onClose={close} onNext={next} onPrev={prev} />
      ) : null}
    </>
  );
}
