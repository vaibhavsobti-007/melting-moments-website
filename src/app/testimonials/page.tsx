import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@content/site";
import { getTestimonials } from "@content/testimonials";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials",
  description: `What clients have said about sessions with ${site.name}.`,
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const testimonials = getTestimonials();

  return (
    <Section className="py-32 sm:py-40">
      <Reveal>
        <h1 className="max-w-2xl text-balance font-heading text-5xl font-medium text-paper sm:text-6xl">
          Kind words
        </h1>
        <p className="mt-4 max-w-xl text-base text-paper/70 sm:text-lg">
          A few notes from clients, shared from Instagram.
        </p>
      </Reveal>

      <Reveal className="mt-14 divide-y divide-line border-y border-line">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.id} className="py-12">
            <blockquote className="max-w-2xl font-display text-3xl italic leading-relaxed text-paper sm:text-4xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm uppercase tracking-[0.12em] text-paper/70">
              {testimonial.author} <span aria-hidden="true">·</span> {testimonial.source}
            </figcaption>
          </figure>
        ))}
      </Reveal>

      <Reveal className="mt-20 text-center">
        <h2 className="font-heading text-3xl font-medium text-paper sm:text-4xl">
          Ready to create something worth keeping?
        </h2>
        <Link
          href="/contact"
          className="mt-6 inline-block text-sm uppercase tracking-[0.12em] text-paper underline underline-offset-4 hover:text-paper/70"
        >
          Get in Touch
        </Link>
      </Reveal>
    </Section>
  );
}
