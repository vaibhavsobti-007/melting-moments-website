import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@content/site";
import { getAboutPhotos } from "@/lib/photos";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Learn about ${site.name} — photography philosophy, experience, and approach.`,
  path: "/about",
});

export default function AboutPage() {
  const aboutPhoto = getAboutPhotos()[0];

  return (
    <Section className="grid grid-cols-1 gap-12 py-32 sm:py-40 md:grid-cols-2 md:gap-16">
      <Reveal className="relative aspect-[4/5] overflow-hidden bg-cloud/5 md:sticky md:top-28 md:h-fit">
        {aboutPhoto ? (
          <Image
            src={aboutPhoto.src}
            alt={aboutPhoto.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        ) : null}
      </Reveal>

      <Reveal delay={100}>
        <h1 className="font-heading text-5xl font-medium text-paper sm:text-6xl">Hello, I&rsquo;m {site.name}</h1>
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-paper/70">
          {site.ownerName} — Founder &amp; Photographer, {site.location}
        </p>

        <div className="mt-8 space-y-6 text-base text-paper/80 sm:text-lg">
          <p>
            I&rsquo;m the person behind Melting Moments — a photography practice built on
            a simple belief: moments don&rsquo;t have to fade the way memories do. A
            birthday candle blown out too fast, a child&rsquo;s laugh caught mid-air, the
            quiet in-between seconds nobody thinks to hold onto — these are the
            photographs I chase.
          </p>
          <p>
            I shoot the way I remember things: a little soft around the edges, warm in
            the light, more feeling than fact. Less about a perfect pose, more about the
            exact tilt of a smile before it changes.
          </p>
          <p>
            Every session — whether it&rsquo;s a birthday, a portrait, or something
            entirely personal — starts the same way: I watch first, and photograph
            second.
          </p>
        </div>

        <div className="mt-10 border-t border-line pt-10">
          <h2 className="font-heading text-2xl font-medium text-paper">Philosophy</h2>
          <p className="mt-3 font-display text-2xl italic leading-relaxed text-paper/70">
            Heart over perfection. Feeling over formality. A photograph that melts
            you a little, every time you look at it.
          </p>
        </div>

        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-3 border border-paper/40 px-6 py-3 text-sm uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
        >
          Get in Touch
        </Link>
      </Reveal>
    </Section>
  );
}
