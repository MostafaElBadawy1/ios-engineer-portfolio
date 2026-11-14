// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Static build; Cloudflare Workers serves ./dist as static assets (see wrangler.jsonc).
export default defineConfig({
  site: "https://mostafaelbadawy.com",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
