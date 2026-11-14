import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { appSchema } from "./types/app";

/**
 * Apps collection: one JSON file per app in src/content/apps.
 * Adding an app = adding one file; the schema rejects missing or malformed fields at build time.
 */
const apps = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/apps" }),
  schema: appSchema,
});

export const collections = { apps };
