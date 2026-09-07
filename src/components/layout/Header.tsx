"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@content/site";
import { navLinks } from "./nav-links";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (!menuOpen) {
        setHidden(y > lastY.current && y > 120);
      }
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      // `inert` removes the header from the tab order and a11y tree while it's
      // translated off-screen — otherwise a keyboard user can tab into invisible links.
      inert={hidden}
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-editorial ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled || menuOpen ? "bg-ink/90 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex shrink-0 flex-col leading-tight">
          <span className="whitespace-nowrap font-heading text-3xl font-semibold text-paper sm:text-4xl lg:text-5xl">
            {site.wordmark}
          </span>
          <span className="mt-0.5 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.28em] text-accent sm:text-[10px] lg:text-xs">
            Photography by {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.12em] text-paper/80 transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-paper transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-paper transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-editorial lg:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <ul className="flex flex-col gap-1 px-6 pb-10 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 font-display text-3xl text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
