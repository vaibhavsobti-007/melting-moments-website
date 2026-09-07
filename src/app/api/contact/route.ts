import { NextResponse } from "next/server";
import { site } from "@content/site";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = contactFormSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { name, email, phone, photographyType, preferredDate, location, message } = result.data;

  const text = [
    `New inquiry from ${name} (${email})`,
    phone ? `Phone: ${phone}` : null,
    `Photography type: ${photographyType}`,
    preferredDate ? `Preferred date: ${preferredDate}` : null,
    location ? `Location: ${location}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey && process.env.CONTACT_TO_EMAIL) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? `${site.brand} <onboarding@resend.dev>`,
        to: process.env.CONTACT_TO_EMAIL,
        reply_to: email,
        subject: `New booking inquiry — ${photographyType}`,
        text,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Could not send message." }, { status: 502 });
    }
  } else {
    // No email service configured yet — log so the inquiry isn't silently lost in dev.
    // See README.md "Change my contact information" for how to wire up real delivery.
    console.log("Contact form submission (no email service configured):\n", text);
  }

  return NextResponse.json({ ok: true });
}
