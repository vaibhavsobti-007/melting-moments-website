import Image from "next/image";
import Link from "next/link";
import { site } from "@content/site";
import { getVisibleCategories } from "@content/categories";
import { pricingPackages } from "@content/pricing";
import { getAboutPhotos, getFeaturedPhotos, getHeroPhotos, getPhotosByCategory } from "@/lib/photos";
import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { CategoryTile } from "@/components/gallery/CategoryTile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  const featured = getFeaturedPhotos(8);
  const categories = getVisibleCategories();
  const categoryPhotos = categories.map((category) => ({
    category,
    photos: getPhotosByCategory(category.slug),
  }));

  // The hero draws from its own dedicated pool (public/images/hero/), never
  // from a portfolio category — so it can't ever duplicate a gallery photo.
  const heroPhotos = getHeroPhotos();
  const heroPhoto =
    heroPhotos.find((photo) => photo.width / photo.height >= 1.3) ?? heroPhotos[0];
  const aboutPhoto = getAboutPhotos()[0];
  const pricingPhoto = featured.find((p) => p.width / p.height < 0.9) ?? featured[0];

  return (
    <>
      {heroPhoto ? <Hero photo={heroPhoto} /> : null}

      <Section className="py-24 sm:py-32">
        <Reveal>
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-heading text-4xl font-medium text-paper sm:text-5xl">
              <span className="mr-3 font-sans text-base italic text-paper/40">01</span>
              Selected Work
            </h2>
            <Link
              href="/portfolio"
              className="text-sm uppercase tracking-[0.12em] text-paper/70 hover:text-paper"
            >
              View All
            </Link>
          </div>
        </Reveal>
        {featured.length > 0 ? <FeaturedWork photos={featured.slice(0, 8)} /> : null}
      </Section>

      {/* Full-bleed — deliberately breaks the container so the galleries feel like
          an extension of the photography rather than boxed UI content. */}
      <section className="pb-24 sm:pb-32">
        <Section>
          <Reveal>
            <h2 className="mb-12 font-heading text-4xl font-medium text-paper sm:text-5xl">
              <span className="mr-3 font-sans text-base italic text-paper/40">02</span>
              Galleries
            </h2>
          </Reveal>
        </Section>
        <Reveal className="grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
          {categoryPhotos.map(({ category, photos }) => (
            <CategoryTile
              key={category.slug}
              category={category}
              cover={photos.find((p) => p.id === category.coverPhotoId) ?? photos[0]}
              count={photos.length}
            />
          ))}
        </Reveal>
      </section>

      <Section className="grid grid-cols-1 items-center gap-10 pb-24 sm:pb-32 md:grid-cols-[3fr_2fr] md:gap-16">
        <Reveal className="relative -mx-6 aspect-[4/5] overflow-hidden bg-cloud/5 sm:-mx-10 md:mx-0">
          {aboutPhoto ? (
            <Image
              src={aboutPhoto.src}
              alt=""
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          ) : null}
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-heading text-4xl font-medium text-balance text-paper sm:text-5xl">
            <span className="mr-3 font-sans text-base italic text-paper/40">03</span>
            Every moment, held a little longer.
          </h2>
          <p className="mt-6 max-w-md font-display italic text-lg leading-relaxed text-paper/70 sm:text-xl">
            I photograph portraits, birthdays, and the personal moments in between —
            chasing warmth, nostalgia, and the small unscripted seconds that are easy
            to miss and impossible to forget.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block text-sm uppercase tracking-[0.12em] text-paper underline underline-offset-4 hover:text-paper/70"
          >
            More about me
          </Link>
        </Reveal>
      </Section>

      <Section className="pb-24 sm:pb-32">
        <Reveal>
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-heading text-4xl font-medium text-paper sm:text-5xl">
              <span className="mr-3 font-sans text-base italic text-paper/40">04</span>
              Investment
            </h2>
            <Link
              href="/pricing"
              className="text-sm uppercase tracking-[0.12em] text-paper/70 hover:text-paper"
            >
              Full Pricing
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_3fr] md:gap-16">
          {pricingPhoto ? (
            <Reveal className="relative aspect-[4/5] overflow-hidden bg-cloud/5">
              <Image
                src={pricingPhoto.src}
                alt=""
                fill
                sizes="(min-width: 768px) 35vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          ) : null}

          <Reveal delay={100} className="flex flex-col justify-center divide-y divide-line">
            {pricingPackages.map((pkg, i) => (
              <Link
                key={pkg.id}
                href="/pricing"
                className="group flex items-baseline justify-between gap-6 py-6 first:pt-0 last:pb-0"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-sm italic text-paper/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl text-paper transition-colors group-hover:text-accent sm:text-2xl">
                    {pkg.name}
                  </span>
                </span>
                <span className="whitespace-nowrap text-sm text-accent sm:text-base">
                  {pkg.priceLabel}
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section className="pb-24 sm:pb-32">
        <Reveal>
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-heading text-4xl font-medium text-paper sm:text-5xl">
              <span className="mr-3 font-sans text-base italic text-paper/40">05</span>
              Instagram
            </h2>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm uppercase tracking-[0.12em] text-paper/70 hover:text-paper"
            >
              {site.instagram.handle}
            </a>
          </div>
        </Reveal>
        <Reveal className="grid grid-cols-3 gap-2 sm:gap-4">
          {featured.map((photo) => (
            <a
              key={photo.id}
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden bg-cloud/5"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 640px) 16vw, 33vw"
                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
              />
            </a>
          ))}
        </Reveal>
      </Section>

      <Section className="border-t border-line py-24 text-center sm:py-32">
        <Reveal>
          <h2 className="font-heading text-4xl font-medium text-balance text-paper sm:text-6xl">
            Let&rsquo;s make something worth keeping.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 border border-paper/40 px-8 py-4 text-sm uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            Get in Touch
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
