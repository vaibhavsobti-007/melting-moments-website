import { z } from "zod";

export const categorySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  coverPhotoId: z.string().min(1),
  order: z.number(),
  visible: z.boolean(),
});

export const photoRecordSchema = z.object({
  id: z.string().min(1),
  filename: z.string().min(1),
  category: z.string().min(1),
  title: z.string().min(1, "Every photo needs a title."),
  alt: z.string().min(1, "Every photo needs alt text for accessibility and SEO."),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export const photoRecordListSchema = z.array(photoRecordSchema);

export const pricingPackageSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  priceLabel: z.string().min(1),
  description: z.string().min(1),
  inclusions: z.array(z.string()).min(1),
  featured: z.boolean().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Please share your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  photographyType: z
    .string({ required_error: "Please select a session type." })
    .min(1, "Please select a session type."),
  preferredDate: z.string().optional(),
  location: z.string().optional(),
  message: z.string().min(10, "Tell me a little more about what you have in mind."),
  /** Honeypot field — must stay empty. Bots tend to fill every field. */
  company: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
