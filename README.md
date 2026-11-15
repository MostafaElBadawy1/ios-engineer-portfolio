# mostafaelbadawy.com

Personal portfolio of Mostafa El-Badawy, iOS Engineer. A static Astro site with scroll-driven storytelling:
intro, about, a sticky iPhone that opens each app as you scroll, and a contact finale.

**Stack:** Astro 7 · TypeScript (strict) · Tailwind CSS v4 · GSAP + ScrollTrigger + SplitText · Cloudflare Workers (static assets)

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
```

| Script            | What it does                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                                                                   |
| `npm run build`   | Type-check (`astro check`) then build to `dist/`                                             |
| `npm run preview` | Serve the built `dist/`                                                                      |
| `npm test`        | Unit tests (Vitest)                                                                          |
| `npm run lint`    | ESLint (zero violations required)                                                            |
| `npm run format`  | Prettier                                                                                     |
| `npm run assets`  | Re-render `public/cv.pdf` and `public/og.png` (needs `npx playwright install chromium` once) |
| `npm run deploy`  | Build and deploy with Wrangler                                                               |

## Project structure

```
src/
  content/apps/*.json      one file per app (validated by src/types/app.ts)
  content/profile.ts       bio, links, experience, skills, education
  components/ui/           design-system primitives: AppIcon, AppButton, AppLink, AppIconGlyph
  features/
    background/            canvas grid that bends around the cursor + section lighting
    hero/  about/  work/  contact/  site/
      components/          Astro components for that section
      utils/               motion and pure helpers
      __tests__/           Vitest tests
  lib/motion.ts            GSAP facade: plugin registration, reduced motion, idle scheduling
  styles/global.css        design tokens (@theme) — the only place colours, fonts and sizes are defined
cv/cv.html                 source of the ATS-friendly CV
scripts/                   renders cv.pdf and og.png
previews/                  Phase A design explorations (not part of the build)
```

## Add a project

1. Create `src/content/apps/<slug>.json`. Copy an existing file and edit it:

   ```json
   {
     "name": "My App",
     "summary": "One line on what it does.",
     "role": "iOS Engineer",
     "organization": "Company or Freelance",
     "market": "Egypt",
     "status": "live",
     "storeUrl": "https://apps.apple.com/...",
     "metrics": [{ "value": "50k+", "label": "downloads" }],
     "contributions": ["What you built, in one sentence each."],
     "stack": ["SwiftUI", "MVVM"],
     "icon": { "monogram": "Ma", "tint": "#071722", "ink": "#FDF0D5" },
     "order": 7
   }
   ```

2. `order` sets its position in Selected Work. Only include metrics you can back up.
3. Run `npm run build`. The schema rejects missing or malformed fields with a clear error.

The project automatically gets a chapter, a phone screen, a home-screen icon, and a rail entry.

## Add an app page (`/fakker`, `/fakker/privacy`, `/fakker/support`)

App Store listings need a landing, privacy, and support URL. For an app you own, add these fields to its JSON file:

```json
"ownApp": true,
"privacyPolicy": ["Paragraph one of your policy.", "Paragraph two."],
"supportEmail": "support@mostafaelbadawy.com"
```

The file name becomes the URL: `src/content/apps/fakker.json` builds `/fakker`, `/fakker/privacy`, and `/fakker/support`.

## App icons

Real artwork lives in `src/assets/icons/` and is referenced by file name from each app's JSON
(`"icon": { "image": "visitors.png", ... }`). It is served as AVIF/WebP and masked to the iOS squircle.
Apps without an image show a clearly marked placeholder (monogram, dashed keyline, "PH").

Every app currently has real artwork. Use square exports, ideally 1024×1024 PNG.

## Deploy to Cloudflare

Live at **https://mostafaelbadawy.com** and **https://www.mostafaelbadawy.com**.

The site is fully static. `wrangler.jsonc` serves `./dist` as Workers static assets on both custom domains,
with `public/_headers` for security headers and long-lived caching of hashed assets. To ship a change:

```bash
npm run deploy
```

This runs the type-check and build, then `wrangler deploy`. Wrangler needs a one-time `npx wrangler login`.

## Motion and accessibility notes

- Native scrolling only: no scroll hijacking or smooth-scroll libraries. Only transforms, opacity, clip-path, and colour animate.
- `prefers-reduced-motion`: intros, scrubs, and the cursor lens are off; the phone switches apps instantly; all content stays visible.
- Below-the-fold animation setup runs when the main thread is idle, so the hero paints first.
- Last audit: Lighthouse desktop 100/100/100/100, mobile 99/100/100/100; axe: 0 violations; no layout shift.
