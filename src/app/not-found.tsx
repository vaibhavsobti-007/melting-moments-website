import Link from "next/link";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <h1 className="font-heading text-5xl font-medium text-paper sm:text-6xl">Page not found</h1>
      <p className="mt-4 text-base text-paper/70 sm:text-lg">The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm uppercase tracking-[0.12em] text-paper underline underline-offset-4 hover:text-paper/70"
      >
        Back to Home
      </Link>
    </Section>
  );
}
