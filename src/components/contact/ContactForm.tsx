"use client";

import { useState } from "react";
import { getVisibleCategories } from "@content/categories";
import { contactFormSchema } from "@/lib/validations";

type Status = "idle" | "submitting" | "success" | "error";

const sessionTypes = [...getVisibleCategories().map((c) => c.title), "Other"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      setErrorMessage(null);
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending your message. Please email me directly instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line p-8 text-center" role="status">
        <p className="font-display text-2xl text-paper">Thank you.</p>
        <p className="mt-3 text-paper/70">
          Your message is on its way — I&rsquo;ll get back to you within a couple of days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot field — hidden from real users, catches basic bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" required error={errors.name} />
        <Field label="Email" name="email" type="email" required error={errors.email} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" error={errors.phone} />
        <div>
          <label htmlFor="photographyType" className="mb-2 block text-sm text-paper/70">
            Photography Type <span aria-hidden="true">*</span>
          </label>
          <select
            id="photographyType"
            name="photographyType"
            required
            defaultValue=""
            className="w-full border border-line bg-transparent px-4 py-3 text-paper focus:border-accent"
            aria-invalid={Boolean(errors.photographyType)}
          >
            <option value="" disabled>
              Select a type
            </option>
            {sessionTypes.map((type) => (
              <option key={type} value={type} className="bg-ink">
                {type}
              </option>
            ))}
          </select>
          {errors.photographyType ? (
            <p className="mt-2 text-sm text-accent">{errors.photographyType}</p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Preferred Date" name="preferredDate" type="date" error={errors.preferredDate} />
        <Field label="Location" name="location" error={errors.location} />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-paper/70">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full border border-line bg-transparent px-4 py-3 text-paper focus:border-accent"
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? <p className="mt-2 text-sm text-accent">{errors.message}</p> : null}
      </div>

      {errorMessage ? <p className="text-sm text-accent">{errorMessage}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-3 border border-paper/40 px-8 py-4 text-sm uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-paper/70">
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        className="w-full border border-line bg-transparent px-4 py-3 text-paper focus:border-accent"
      />
      {error ? <p className="mt-2 text-sm text-accent">{error}</p> : null}
    </div>
  );
}
