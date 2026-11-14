# Build my personal portfolio — mostafaelbadawy.com

## Role
You are a senior product designer + frontend engineer. The bar is a hand-crafted,
premium software-engineer portfolio a design studio would ship — NOT a generic
AI or SaaS template.

## Skills & tools — use them in this order
1. `ui-ux-pro-max` → run `--design-system` for "iOS engineer portfolio, premium
   dark, minimal, content-first" with `--stack astro`,
   `--variance 4 --motion 3 --density 3`. Treat output as input, not the answer.
   My palette below overrides any palette it suggests.
2. `frontend-design` → use it to create the design directions (type, layout,
   principles, how the palette is applied), and critique each against the
   anti-slop list before showing it to me.
3. `ui-color-palette` → turn my palette into semantic tokens, audit contrast
   (WCAG AA + APCA), export as Tailwind v4 `@theme` tokens.
4. `frameworks-on-cloudflare` → Astro static build deployed on Cloudflare Workers.
5. After building: `design-critique`, `accessibility-review`, `web-perf`.
   Screenshot every page at 375px, 768px, 1440px (Playwright), review the
   screenshots yourself, fix, repeat until clean.

## Process rules — options first, then build
- Do NOT build the full site until I pick a direction.
- Phase A — Directions: create **3 distinct design directions** using my palette.
  Each must differ in layout, typography, and how the hero/home-screen concept is
  expressed — not just small tweaks. For each:
  - A name + 2-line rationale
  - Font choice (heading + body)
  - A **working HTML preview of the hero + one app detail view** (real content,
    real palette), at `/previews/a.html`, `/previews/b.html`, `/previews/c.html`
  - Screenshots at 375px and 1440px
- Phase B — Motion: for the direction I pick, build **3 animation options** for
  the icon → app-detail transition, each as a live demo page I can click:
  1. Subtle — quick fade + scale, almost native-feeling
  2. iOS-native — icon expands into the detail view (like opening an app on iPhone)
  3. Expressive — staged reveal (icon morphs, then content cascades in)
  Show the timing/easing for each, and respect `prefers-reduced-motion`.
  Record a short GIF of each if possible.
- Phase C — Build: only after I pick a direction AND an animation, build the full
  site.
- State assumptions. Don't invent facts about my work — ask.
- Small commits with clear messages.

## Stack
Astro + TypeScript (strict) + Tailwind v4 + Sanity (content) + Cloudflare.
- Phase 1: content in typed local files (`src/content/`), so the site ships now.
- Phase 2: move content to Sanity; Studio at `admin.mostafaelbadawy.com`.

## Site structure
- `/` portfolio (single page)
- `/[app]` landing per own app, e.g. `/fakker`, with `/fakker/privacy` and
  `/fakker/support` (App Store requirements). Adding an app = adding one
  content file.
- `/cv.pdf` downloadable CV

## Color palette — dark-only site
Direction: premium near-black navy, crimson red accents, warm ivory type,
subtle steel-blue details. Predominantly near-black.

| Token          | Hex       | Use                                              |
|----------------|-----------|--------------------------------------------------|
| bg             | `#030A10` | Page background                                  |
| surface        | `#071722` | Cards, secondary background                      |
| text           | `#FDF0D5` | Headings, primary text (warm ivory)              |
| text-muted     | `#8FA5B3` | Secondary text, captions                         |
| accent         | `#C1121F` | Primary button FILL, active nav indicator, key highlights |
| accent-text    | `#F0606A` | Red used AS TEXT/links (derived — #C1121F fails AA as text) |
| accent-deep    | `#780000` | Button hover/pressed fill, subtle borders/fills only |
| secondary      | `#669BBC` | Steel blue: small UI details, tags, focus rings  |

Contrast rules (verified — keep them):
- `#C1121F` as text = 3.2:1 on bg → FAILS. Never use it for text/icons;
  use `accent-text` instead. Ivory on `#C1121F` buttons = 5.5:1 ✓.
- `#780000` = 1.7:1 on bg → never for text, icons, or focus indicators.
- Focus ring: steel blue `#669BBC` (6.6:1) — visible on every interactive element.
- Borders: low-opacity ivory or steel blue (e.g. 8–12%), never pure gray.

Usage rules:
- Red is rare: primary buttons, active nav, 1–2 key highlights per screen.
- Cards: dark surface + subtle border; gradients only if very restrained
  (e.g. a faint top-edge tint), never as decoration or text fill.
- No pure black (#000) or pure white (#FFF) anywhere.

## Design direction
- Concept: **iOS home screen.** My shipped apps appear as real app icons
  (proper iOS squircle, not border-radius) in the hero; tapping one opens its
  detail with a meaningful transition. This is the ONE bold element —
  everything else is quiet and disciplined.
- Typography: one deliberate family (not Inter/Roboto/system default), clear
  type scale, line length < 75ch. Ivory on near-black needs slightly more
  line-height and letter-spacing on body text — tune it.
- Motion: one orchestrated moment (icon → detail transition). Respect
  `prefers-reduced-motion`.

## Anti-slop list — do NOT
- Purple/blue gradients, glassmorphism, glow, neon, gradient text
- Red everywhere — it must stay rare to feel premium
- Identical rounded cards with the same soft shadow for everything
- ALL-CAPS eyebrow labels, "01 / 02 / 03" numbering, "→" on every link
- Fade-up animation on every section, hover effects on every card
- Emoji as icons, stock illustrations, fake testimonials, skill % bars
- Buzzword copy ("passionate", "crafting digital experiences", "seamless")

## Content (from my CV — attached)
- Name: Mostafa Elbadawy · Title: iOS Engineer · Based in Egypt
- Bio: "iOS engineer with 3 years building public-service apps for Egypt, from
  national electricity services to professional syndicates. Native Swift and
  UIKit at the core, with production React Native experience and now working
  with Kotlin Multiplatform."
- Links: GitHub (github.com/MostafaElBadawy1), LinkedIn
  (linkedin.com/in/mostafa-elbadawy), email hi@mostafaelbadawy.com, CV download.
  NO phone number, NO military status.
- Apps (icon, one line, my role, stack, App Store link):
  1. Egyptian Electricity Services (EEHC) — citizen + employee + emergency apps.
     SwiftUI, modularization, MVVM, 100k+ downloads. Built auth, profile,
     dynamic forms, sort/filter; UIKit→SwiftUI refactor. Mark "retired version"
     (no store link — use screenshots).
  2. Act Plus — official app of the Egyptian Syndicate of Performing Arts
     Professions (Actors Syndicate): artist news, member directory, contacting
     members, syndicate projects and activities. Built at Fixed Solutions;
     I worked on it as an iOS engineer.
     https://apps.apple.com/eg/app/act-plus/id6447485378
  3. Visitors (Zaeroon), KSA — book visits to museums and religious sites.
     MVVM, UIKit + SwiftUI, 7 languages, 200k+ downloads.
     https://apps.apple.com/eg/app/id1543620330
  4. Alharamain — services for visitors to the Grand Mosque, Mecca.
     https://apps.apple.com/eg/app/id1115020295
  5. Bzaaarz (freelance) — Kuwaiti e-commerce. UIKit, MVVM, Combine.
     https://apps.apple.com/eg/app/bzaaarz/id6448076974
  6. Medjol (freelance) — doctor search and booking. UIKit, MVVM, RxSwift.
     https://apps.apple.com/eg/app/medjol/id6648327270
- Experience: Fixed Solutions, iOS Engineer (Aug 2023 – present); freelance iOS;
  ITI Intensive Code Camp, iOS track.
- Skills (grouped, no bars): iOS — Swift, SwiftUI, UIKit, Combine, RxSwift ·
  Cross-platform — React Native, Kotlin Multiplatform · Architecture — Clean
  Architecture, MVVM, modularization, SOLID, unit testing · Tools — Git/Gitflow,
  CI/CD, Firebase, Alamofire
- Education: B.Eng. Mechatronics, Mansoura University (2020)

## Quality floor (non-negotiable)
Lighthouse ≥ 95 in all categories · WCAG AA · keyboard + visible focus ·
semantic HTML · OG image + meta tags · sitemap · real app icons as optimized
images (AVIF/WebP) · no layout shift · responsive from 320px up.

## Out of scope for now
- Don't deploy — I'll connect Cloudflare myself; just make it deploy-ready.
- Don't set up Sanity yet (Phase 2).
- If an app icon is missing, use a clearly marked placeholder and list what's
  missing — don't invent or download icons.

## Deliverables
1. 3 design directions (live previews + screenshots) → wait for my pick
2. 3 animation demos for the chosen direction → wait for my pick
3. Built site + screenshots (3 sizes)
4. README: run locally, add a project, add an app page, deploy to Cloudflare
