import type { Metadata } from "next";
import { site } from "@content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name} to book a photography session.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section className="grid grid-cols-1 gap-16 py-32 sm:py-40 md:grid-cols-[1fr_1.3fr]">
      <div>
        <h1 className="font-heading text-5xl font-medium text-paper sm:text-6xl">
          Book a Session
        </h1>
        <p className="mt-4 max-w-sm text-base text-paper/70 sm:text-lg">
          Tell me a bit about what you have in mind and I&rsquo;ll follow up within a
          couple of days.
        </p>

        <div className="mt-10 space-y-2 text-paper/70">
          <a href={`mailto:${site.email}`} className="block hover:text-paper">
            {site.email}
          </a>
          <p>{site.location}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={site.whatsapp.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Message on WhatsApp
          </a>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <InstagramIcon className="h-4 w-4" />
            DM on Instagram
          </a>
        </div>
      </div>

      <ContactForm />
    </Section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.35 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm0 18c-1.6 0-3.13-.43-4.45-1.2l-.32-.19-3.01.79.8-2.94-.2-.31A7.94 7.94 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8Zm4.36-5.86c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.4.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.35 1.05.4 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.4 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.35-2.22.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.4a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.35-1.05-.4-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.4-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.35 2.22-.4C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.73.07-1.02.05-1.58.21-1.95.35-.49.19-.84.42-1.2.78-.36.36-.59.71-.78 1.2-.14.37-.3.93-.35 1.95-.06 1.23-.07 1.58-.07 4.73s.01 3.5.07 4.73c.05 1.02.21 1.58.35 1.95.19.49.42.84.78 1.2.36.36.71.59 1.2.78.37.14.93.3 1.95.35 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c1.02-.05 1.58-.21 1.95-.35.49-.19.84-.42 1.2-.78.36-.36.59-.71.78-1.2.14-.37.3-.93.35-1.95.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.05-1.02-.21-1.58-.35-1.95a3.24 3.24 0 0 0-.78-1.2 3.24 3.24 0 0 0-1.2-.78c-.37-.14-.93-.3-1.95-.35-1.23-.06-1.58-.07-4.73-.07Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.7-2a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z" />
    </svg>
  );
}
