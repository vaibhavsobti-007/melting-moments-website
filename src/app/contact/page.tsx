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
          <a href={`tel:${site.phone}`} className="block hover:text-paper">
            {site.phone}
          </a>
          <p>{site.location}</p>
        </div>
      </div>

      <ContactForm />
    </Section>
  );
}
