import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Token NAMES are legacy from the original dark theme — kept as-is
        // deliberately so every existing `bg-ink` / `text-paper` usage across
        // the codebase repaints correctly without touching component code.
        // Semantically: `ink` = page background, `paper` = foreground text.
        ink: "#f7f1e7", // warm ivory — page background
        paper: "#241c14", // warm espresso — primary text
        cloud: "#e9dcc3", // warm sand — subtle fills/placeholders
        accent: "#9c5a34", // warm terracotta — deliberately darker than a
        // decorative gold so it clears 4.5:1 against the ivory background
        line: "rgba(36, 28, 20, 0.14)",
        // Note: the lightbox backdrop deliberately stays dark (photos read
        // best against black, independent of site theme) — see Lightbox.tsx,
        // which uses an arbitrary-value class (bg-[#171310]) for that one
        // surface rather than a theme color extension.
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
      },
      maxWidth: {
        content: "1600px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
