import type { Metadata } from "next";
import { Dancing_Script, Fraunces, Inter } from "next/font/google";
import { site } from "@content/site";
import { getHeroPhotos } from "@/lib/photos";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { personJsonLd } from "@/lib/seo";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Heading-only script face — reserved for actual <h1>/<h2> content headings.
// Fraunces (`--font-display`) keeps serving everything else: body copy,
// pull-quotes, the nav wordmark, and decorative index numbers.
const heading = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Drawn from the hero pool at request time — never a hardcoded filename —
// so this keeps working as hero photos are added, renamed, or replaced.
const heroImage = getHeroPhotos()[0]?.src;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.brand,
    template: `%s — ${site.wordmark}`,
  },
  description: site.description,
  openGraph: {
    title: site.brand,
    description: site.description,
    siteName: site.brand,
    type: "website",
    images: heroImage ? [{ url: heroImage }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: site.brand,
    description: site.description,
    images: heroImage ? [heroImage] : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${heading.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
