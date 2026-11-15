import { z } from "astro/zod";

/** Validates one app content file. Facts only: every field comes from the CV or the owner. */
export const appSchema = z.object({
  name: z.string().min(1),
  alternateName: z.string().optional(),
  /** Language of the alternate name when it is not English, e.g. "ar", so it is read and shaped correctly. */
  alternateNameLang: z.enum(["ar"]).optional(),
  summary: z.string().min(1),
  role: z.string().min(1),
  organization: z.string().min(1),
  market: z.string().optional(),
  status: z.enum(["live", "retired", "in-development"]),
  statusNote: z.string().optional(),
  storeUrl: z.url().optional(),
  metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
  contributions: z.array(z.string()).min(1),
  stack: z.array(z.string()).default([]),
  icon: z.object({
    monogram: z.string().min(1).max(3),
    tint: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    ink: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    /** File name in src/assets/icons; omit to show the marked placeholder. */
    image: z
      .string()
      .regex(/^[\w-]+\.(png|jpg|webp)$/)
      .optional(),
  }),
  order: z.number().int(),
  /** Own apps get /[app], /[app]/privacy and /[app]/support pages. */
  ownApp: z.boolean().default(false),
  /** Own apps only: privacy policy paragraphs, written by the owner. */
  privacyPolicy: z.array(z.string()).default([]),
  /** Own apps only: where App Store users get help. */
  supportEmail: z.email().optional(),
});

/** Shape of an app as authored in its content file. */
export type AppData = z.infer<typeof appSchema>;

/** An app plus its content id (the file name). */
export interface AppEntry {
  id: string;
  data: AppData;
}
