import Image from "next/image";
import Link from "next/link";
import { site } from "@content/site";
import type { Photo } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function Hero({ photo }: { photo: Photo }) {
  return (
    <section className="relative flex h-[92vh] min-h-[560px] w-full items-end overflow-hidden bg-ink">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="100vw"
        // Custom focal point: on narrow/tall viewports, object-cover's default
        // center crop cuts off the subject, who sits right-of-center in this photo.
        className="object-cover object-[70%_38%]"
      />
      {/* Bottom-heavy scrim guarantees the text stays legible regardless of
          how bright the underlying photo is at any given moment. */}
      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <div className="relative z-10 mx-auto w-full max-w-content px-6 pb-16 sm:px-10 sm:pb-20">
        <Reveal>
          {/* Warm-white halo (not a dark shadow) — the hero text is dark, so
              it needs a light glow behind it to stay legible over the photo. */}
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-paper/80 [text-shadow:0_1px_16px_rgba(247,241,231,0.8)]">
            {site.location}
          </p>
          <h1 className="max-w-3xl text-balance font-heading text-5xl font-medium leading-[1.1] tracking-tight text-paper [text-shadow:0_2px_24px_rgba(247,241,231,0.7)] sm:text-7xl">
            {site.tagline}
          </h1>
          <Link
            href="/portfolio"
            className="mt-8 inline-flex items-center gap-3 border border-paper/40 px-6 py-3 text-sm uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            View Portfolio
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
