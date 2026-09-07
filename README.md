# Melting Moments by Sakshi

A fast, editorial photography portfolio built with Next.js, TypeScript, and Tailwind CSS.
There's no database or CMS — all content lives in plain files in this repo, so publishing
a change means editing a file (or dropping in an image) and pushing to git.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build      # production build
npm run typecheck  # TypeScript check
npm run lint       # ESLint
npm run sync-photos # regenerate photo manifests from public/images
```

## Before you launch

Brand name, tagline, and Instagram are already set in **[content/site.ts](content/site.ts)** —
but email, phone, and location are still placeholders. At minimum:

- **[content/site.ts](content/site.ts)** — real email, phone, location, and site URL.
- **[content/pricing.ts](content/pricing.ts)** — your actual packages and prices (currency is
  still USD — change `priceLabel` values if you charge in a different currency).
- **Every photo currently on the site is a clearly-labeled placeholder** (see below) — replace
  them with your own work whenever you're ready.

---

## Photo architecture — how it works

Every photo on the site is described by a JSON record with exactly these fields:

```ts
{
  id: "portrait-01",   // derived from the filename, must be unique within its pool
  filename: "portrait-01.jpg",  // the actual file in public/images/...
  category: "portraits",
  title: "Portrait, low light",     // shown on hover and in the lightbox
  alt: "...",                        // accessibility description — required
  featured: true,                    // optional — surfaces it on the home page
  order: 0,                          // optional — controls sort position, tells the visual story
  originalFilename: "8S3A6124.jpg",  // optional — the source file's original name, for your own reference
  width: 1800, height: 3200,         // auto-filled by sync-photos, don't hand-edit
}
```

These records live in `content/photos/<pool>.json` — one file per **pool**. A pool is either
a portfolio category (`portraits`, `family`, etc.) or one of two special pools used outside
the portfolio: `hero` (homepage hero image) and `about` (About page photo). Nothing in the
React components ever hardcodes a filename or path — every image on the site is looked up
through this data, which is why replacing one is just a file swap.

### Replacing a placeholder with your real photo

1. Find the file — e.g. `public/images/portfolio/portraits/portrait-01-placeholder.jpg`.
2. Overwrite it with your real photo, **keeping the exact same filename**. (If you rename the
   file instead, `sync-photos` will treat it as a brand-new photo — see step 4.)
3. Run `npm run sync-photos` — it re-reads the new file's real width/height automatically.
4. Open the matching entry in `content/photos/<pool>.json` and update `title` and `alt` to
   actually describe your photo (the placeholder ones say "Placeholder photo — ..." on purpose,
   so a leftover one is easy to spot with a search for the word "Placeholder").
5. If you'd rather use a different filename going forward (e.g. drop the `-placeholder`
   suffix), rename the file, run `sync-photos` again, then delete the old placeholder's
   entry from the JSON by hand — the script warns about orphaned entries but won't remove
   them for you.

That's the whole workflow — no component or page file needs to change.

---

## How to make common changes

### 1. Add a photograph

1. Drop the image file into `public/images/portfolio/<category-slug>/` (e.g.
   `public/images/portfolio/family/`), named like the existing files
   (`family-03-placeholder.jpg`, or drop the placeholder suffix for real photos:
   `family-firstbirthday.jpg`). JPG, PNG, and WebP are supported. No strict size
   requirement, but ~2000px on the long edge loads fast and still looks sharp at full screen.
2. Run:
   ```bash
   npm run sync-photos
   ```
   This scans every pool folder and adds a new entry to `content/photos/<pool>.json`
   for any file it hasn't seen before — filling in width, height, and a rough
   `title`/`alt` guessed from the filename.
3. Open `content/photos/<pool>.json` and replace the guessed `title`/`alt` with real
   ones (the `alt` text matters for screen readers and Google Images). Optionally set
   `"featured": true` to surface it on the home page.
4. Commit and push (or redeploy) — see "Deploy a new version" below.

The sync script never overwrites an entry it already knows about, so your titles, alt
text, and featured flags are always safe to re-run it.

### 2. Create a new gallery (category)

1. Create a new folder: `public/images/portfolio/<new-slug>/` and add photos to it,
   named `<new-slug>-01...`.
2. Add an entry to the `categories` array in **[content/categories.ts](content/categories.ts)**:
   ```ts
   {
     slug: "engagements",
     title: "Engagements",
     description: "A short description shown on the category page.",
     coverPhotoId: "engagements-01", // must match a photo id in that folder
     order: 8,               // controls display order
     visible: true,
   },
   ```
3. Run `npm run sync-photos`.

That's it — `/portfolio/engagements` exists automatically, and it appears in the
portfolio index, the home page "Galleries" section, and the Contact form's
"Photography Type" dropdown. No component code changes needed.

To temporarily hide a category without deleting it, set `visible: false`.

### 3. Remove a photograph

1. Delete the image file from its pool folder.
2. Delete its corresponding entry from `content/photos/<pool>.json` (find it by
   filename/id).

Running `sync-photos` won't do this step for you — it only warns in the terminal
when a manifest entry's file is missing, so you don't lose a title or `featured`
flag by accident.

### 4. Change pricing

Edit **[content/pricing.ts](content/pricing.ts)**. Each package is a plain object:

```ts
{
  id: "portrait",
  name: "Portrait Session",
  priceLabel: "From $350",
  description: "A relaxed, one-hour session...",
  inclusions: ["60-minute session, one location", "..."],
  featured: true, // highlights this package on /pricing
}
```

Add, remove, or reorder entries in the array — the `/pricing` page and the home
page pricing teaser both render whatever is in this file.

### 5. Change my bio

Edit the copy directly in **[src/app/about/page.tsx](src/app/about/page.tsx)** (the paragraphs under
"Hello, I'm Sakshi" and the "Philosophy" section). To swap the photo, replace the file in
`public/images/about/` — see "Photo architecture" above; no code changes needed.

### 6. Change my contact information

- Email, phone, location, and Instagram handle: **[content/site.ts](content/site.ts)**.
- The contact form currently logs submissions to the server console — it isn't
  wired to send you an email yet. To receive real emails:
  1. Create a free account at [resend.com](https://resend.com) and get an API key.
  2. Copy `.env.example` to `.env.local` and fill in:
     ```
     RESEND_API_KEY=your-key
     CONTACT_TO_EMAIL=you@yourdomain.com
     CONTACT_FROM_EMAIL=Melting Moments by Sakshi <onboarding@resend.dev>
     ```
  3. Add the same three variables in your Vercel project settings for production.

  Until those are set, submissions are simply logged where the app is running — nothing
  is lost, but you won't get an email notification.

### 7. Change featured photographs

Open the relevant file in `content/photos/` and toggle `"featured": true` (or remove
it) on any photo. Featured photos appear in the "Selected Work" and Instagram
sections on the home page. There's no fixed limit, but 4–6 tends to look best. (The
`hero` pool is separate — see below — featuring a photo there doesn't affect the hero.)

### The hero photo

The homepage hero pulls from `public/images/hero/` / `content/photos/hero.json` — a pool
of its own, never a portfolio photo. Add a new hero candidate the same way as any other
photo (drop the file, run `sync-photos`); the widest-aspect photo in the pool is chosen
automatically so a portrait-oriented shot never gets cropped awkwardly full-bleed.

### 8. Add a testimonial

Testimonials live in **[content/testimonials.ts](content/testimonials.ts)** and show on
`/testimonials`. Each one is a plain object:

```ts
{
  id: "unique-id",
  quote: "The exact wording of the comment or DM.",
  author: "Client's name",
  source: "Instagram",       // or "Google Review", etc.
  featured: true,            // optional
  order: 0,                  // controls display order
}
```

The three entries currently in that file are placeholders — every quote says so
directly, on purpose, so nobody mistakes one for a real review before you've replaced
it. To add a real one: copy a genuine comment from a tagged Instagram post or a DM
(only with that person's permission to feature it publicly), and either edit a
placeholder in place or add a new object to the array. Delete any placeholder entries
you don't replace.

### 9. Deploy a new version

This project is set up to deploy on [Vercel](https://vercel.com):

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In Vercel, "Add New Project" → import the repo → it auto-detects Next.js → Deploy.
3. Add the `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` environment
   variables (see above) under Project Settings → Environment Variables, then redeploy.
4. Every future `git push` to your main branch redeploys automatically. Pushing to
   any other branch gets its own preview URL — handy for checking a new gallery
   before it goes live.
5. Update `url` in `content/site.ts` to your real domain once one is connected — it
   feeds the sitemap and social-share metadata.

---

## Project structure

```
content/                        Site content — the "database"
├── site.ts                      Brand name, tagline, contact info, social links
├── categories.ts                 Portfolio categories
├── pricing.ts                     Pricing packages
├── testimonials.ts                Client testimonials (/testimonials)
└── photos/
    ├── hero.json                   Homepage hero photo pool
    ├── about.json                   About page photo pool
    └── <category-slug>.json          One manifest per portfolio category

public/images/
├── hero/                          Homepage hero photos
├── about/                          About page photo
└── portfolio/<category-slug>/       Photos, organized by category

src/
├── app/                          Pages (Next.js App Router)
├── components/                    UI components, grouped by area
├── lib/                            Data access, validation, SEO helpers
└── types/                           Shared TypeScript types

scripts/sync-photos.mjs          Scans public/images/{hero,about,portfolio/*}
                                   and updates content/photos/*.json
```

### Current categories

Portraits · Graduation & Milestones · Maternity · Family · Couples ·
Birthday Milestones · Creative / Lifestyle

All seven are populated with real photography, curated from your Google Drive library
— see `originalFilename` on each record if you need to trace a photo back to its
source file. Maternity currently has 6 photos rather than the usual 8-12 — that's
every distinct maternity photo found so far, not a placeholder; add more via the
"Add a photograph" workflow above as new sessions come in. The **About page photo is
still a placeholder** — no suitable photo of you has turned up in either Drive folder
reviewed so far, so nothing was assumed; replace
`public/images/about/about-01-placeholder.jpg` whenever you have one. Weddings are
not offered and are not referenced anywhere in the site copy or pricing.

### A note on the hero photo's crop

`src/components/home/Hero.tsx` sets a custom `object-[70%_38%]` focal point on the
hero image — the current photo's subject sits right-of-center, and a default center
crop cut his face out of frame on narrow screens. If you swap the hero photo for one
with a different composition, check the crop on mobile width and adjust that value
(or remove it to fall back to a plain center crop) to match.
