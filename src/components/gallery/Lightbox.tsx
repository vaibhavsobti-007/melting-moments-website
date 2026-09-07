"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/types";

export function Lightbox({
  photos,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<Element | null>(null);
  const photo = photos[index];

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[100] flex flex-col bg-[#171310]/[0.97] backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <p className="text-sm text-ink/70">
          {index + 1} / {photos.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="text-sm uppercase tracking-[0.12em] text-ink/80 hover:text-ink"
        >
          Close
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous photo"
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 p-3 text-ink/70 hover:text-ink sm:left-4"
        >
          <ArrowIcon direction="left" />
        </button>

        <div className="relative flex h-full w-full items-center justify-center">
          <Image
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="100vw"
            className="max-h-[78vh] w-auto max-w-full object-contain"
            priority
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 p-3 text-ink/70 hover:text-ink sm:right-4"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <p className="px-6 pb-8 text-center text-sm text-ink/70">{photo.title}</p>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
