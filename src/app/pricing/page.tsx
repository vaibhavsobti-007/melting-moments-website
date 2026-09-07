import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pricingPackages } from "@content/pricing";
import { getFeaturedPhotos } from "@/lib/photos";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description: "Photography packages and pricing for portraits, birthdays, and custom sessions.",
  path: "/pricing",
});

export default function PricingPage() {
  // Any wide-enough featured photo works here — no photo id is hardcoded,
  // so this keeps working automatically as the photo catalog changes.
  const featured = getFeaturedPhotos();
  const bannerPhoto = featured.find((p) => p.width / p.height >= 0.9) ?? featured[0];

  return (
    <>
      <section className="relative flex h-[46vh] min-h-[320px] w-full items-end overflow-hidden bg-ink">
        {bannerPhoto ? (
          <Image
            src={bannerPhoto.src}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        ) : null}
        <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <Section className="relative z-10 pb-12">
          <h1 className="font-heading text-5xl font-medium text-paper sm:text-6xl">Investment</h1>
          <p className="mt-4 max-w-xl text-base text-paper/70 sm:text-lg">
            A starting point for planning your session. Every package can be tailored —
            get in touch and we&rsquo;ll shape the details together.
          </p>
        </Section>
      </section>

      <Section className="py-24 sm:py-32">
        <Reveal className="divide-y divide-line border-y border-line">
          {pricingPackages.map((pkg, i) => (
            <div
              key={pkg.id}
              className="grid grid-cols-1 gap-6 py-12 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-10"
            >
              <span className="font-display text-2xl italic text-paper/30">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                {pkg.featured ? (
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-accent">
                    Most Booked
                  </p>
                ) : null}
                <h2 className="font-heading text-3xl font-medium text-paper sm:text-4xl">{pkg.name}</h2>
                <p className="mt-3 max-w-md text-base text-paper/70">{pkg.description}</p>
                <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 text-sm text-paper/80 sm:grid-cols-2">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-start gap-4 sm:items-end">
                <span className="text-xl text-accent sm:text-2xl">{pkg.priceLabel}</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-paper/40 px-6 py-3 text-sm uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                >
                  Book a Session
                </Link>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-20 text-center">
          <h2 className="font-heading text-3xl font-medium text-paper sm:text-4xl">
            Don&rsquo;t see quite what you need?
          </h2>
          <Link
            href="/contact"
            className="mt-6 inline-block text-sm uppercase tracking-[0.12em] text-paper underline underline-offset-4 hover:text-paper/70"
          >
            Contact Me
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
