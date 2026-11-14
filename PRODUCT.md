# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro + TypeScript (strict) + Tailwind v4, static build deployed to Cloudflare Workers (user connects deploy). Phase 1 content in typed local files under `src/content/`; Phase 2 moves content to Sanity (Studio at admin.mostafaelbadawy.com). Phase A design previews are standalone HTML under `/previews/`.

## Users

Two audiences, weighted equally (confirmed):

- Hiring managers and recruiters evaluating an iOS engineer for a role, often remote/international. Job: decide in under a minute whether he ships real, at-scale native iOS work, then grab the CV or email.
- Prospective freelance clients who need an iOS app built. Job: see shipped apps that resemble their need, then make contact.

## Product Purpose

Personal portfolio for Mostafa Elbadawy, iOS Engineer based in Egypt, at mostafaelbadawy.com. It presents his shipped App Store apps as the proof, and hosts per-app landing, privacy, and support pages (App Store requirements) for his own apps. Success: a visitor opens at least one app detail and leaves with the CV or an email started.

## Positioning

Three years building public-service apps used by hundreds of thousands of people in Egypt and Saudi Arabia (national electricity services, a professional syndicate, Grand Mosque and museum visitor services), native Swift/UIKit/SwiftUI at the core, with production React Native and current Kotlin Multiplatform work.

## Operating Context

Visitors arrive from LinkedIn, GitHub, a CV, or an App Store support link. Many view on a phone. They compare against other engineer portfolios and App Store listings.

## Capabilities and Constraints

- Routes: `/` single-page portfolio; `/[app]` per own app with `/[app]/privacy` and `/[app]/support`; `/cv.pdf`. Adding an app = adding one content file.
- Dark-only site (explicit user decision, overrides the global light+dark default for this project).
- No phone number, no military status anywhere.
- Out of scope now: deployment, Sanity setup.

## Brand Commitments

- Pinned palette (bg #030A10, surface #071722, text #FDF0D5, text-muted #8FA5B3, accent #C1121F, accent-text #F0606A, accent-deep #780000, secondary #669BBC) with its contrast and usage rules in `docs/brief.md`.
- Pinned concept: iOS home screen; shipped apps as real app icons (true squircle) that open a detail view with one meaningful transition. Everything else quiet.
- Voice: plain, specific, first-person facts. No buzzwords ("passionate", "seamless", "crafting digital experiences").

## Evidence on Hand

- Portrait photo: `previews/assets/mostafa-original.jpg` (user-supplied).
- CV: `/Users/mostafa/Downloads/1794665400285_Mostafa-Elbadawy-iOS-Engineer.pdf`.
- Six apps with roles, stacks, metrics, and App Store links as listed in `docs/brief.md` (EEHC 100k+ downloads, retired, no store link; Visitors 200k+ downloads, 7 languages).
- Absent: all six app icons (placeholders, clearly labeled, until supplied); EEHC screenshots; testimonials (must not be invented); any own app such as "Fakker" beyond its name used as a route example.

## Product Principles

1. The apps are the proof: lead with shipped work, not adjectives.
2. One bold element (the home screen), everything else disciplined.
3. Every claim traceable to the CV; ask rather than invent.
4. Fast and accessible enough to embarrass template portfolios.

## Accessibility & Inclusion

WCAG 2.1 AA, keyboard operable with visible steel-blue focus, prefers-reduced-motion respected, responsive from 320px, Lighthouse ≥ 95 in all categories.
