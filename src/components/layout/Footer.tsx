import Link from "next/link";
import { site } from "@content/site";
import { navLinks } from "./nav-links";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-6 py-14 sm:px-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-heading text-4xl font-semibold text-paper sm:text-5xl">{site.wordmark}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Photography by {site.name}
          </p>
          <p className="mt-3 max-w-sm text-base text-paper/70">{site.tagline}</p>
        </div>

        <div className="flex flex-col gap-6 text-sm sm:flex-row sm:gap-14">
          <nav aria-label="Footer" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-paper/70 transition-colors hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 text-paper/70">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-paper">
              {site.email}
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-paper"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* text-paper/70 — lower opacities fail WCAG AA against the warm ivory background at this text size */}
      <div className="mx-auto max-w-content px-6 pb-10 text-xs text-paper/70 sm:px-10">
        © {new Date().getFullYear()} {site.ownerName} · {site.brand}. All rights reserved.
      </div>
    </footer>
  );
}
