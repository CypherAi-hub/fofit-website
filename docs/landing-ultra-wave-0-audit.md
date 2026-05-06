# FoFit Landing Ultra Wave 0 Audit

Date: 2026-05-05
Repo: `/Users/kenanlarry/Library/Mobile Documents/com~apple~CloudDocs/Desktop/Everything Fofit /website`
Branch: `feat/cypher-web-visual-match`

## Scope Confirmed

This checkout is a Vite + React + TypeScript website. `src/main.tsx` mounts `App` inside `BrowserRouter` and `AuthProvider`. `src/app/App.tsx` wraps all routes with `WaitlistProvider`, `SiteShell`, and `AppRoutes`. `SiteShell` owns `Navbar`, `Footer`, and `WaitlistModal`.

The worktree was already dirty before implementation:

- `src/components/marketing/CypherTranscript.tsx`
- `src/components/marketing/ProductVideo.tsx`
- `src/styles/global.css`
- `src/styles/tokens.css`

Those existing edits must be preserved and carried forward unless the redesign replaces the affected surface intentionally.

## Files Inspected

- `package.json`: scripts are `dev`, `build`, `preview`, `validate:copy`; no test script. Dependencies are React 19, React Router 6, Supabase client, Vite, TypeScript.
- `src/main.tsx`: dangerous. Imports `tokens.css`, `global.css`, `utilities.css`; no edit needed.
- `src/app/App.tsx`: dangerous. WaitlistProvider/SiteShell routing composition; no edit needed.
- `src/app/routes.tsx`: dangerous. Home route and fallback route point to `HomePage`; no edit needed.
- `src/app/waitlist-context.tsx`: dangerous. `useEarlyAccess().open({ initialRole })` controls modal state; no edit needed.
- `src/pages/HomePage.tsx`: active homepage composition file. Needs replacement of section order and imports.
- `src/components/layout/SiteShell.tsx`: dangerous. Owns `WaitlistModal`; no edit needed.
- `src/components/layout/Navbar.tsx`: dangerous. Uses `EarlyAccessButton`; no edit needed.
- `src/components/layout/Footer.tsx`: safe to preserve. Copy is compatible enough; no edit needed unless final polish demands it.
- `src/components/marketing/HomeVideoHero.tsx`: should be rebuilt into the new launch hero while keeping video/poster fallback.
- `src/components/marketing/EarlyAccessButton.tsx`: waitlist trigger wrapper. Preserve as-is.
- `src/components/marketing/WaitlistModal.tsx`: dangerous. Modal flow and form submit logic are working; do not edit.
- `src/components/marketing/CypherTranscript.tsx`: already modified in worktree; rebuild copy/structure into cinematic transcript while preserving useful existing green Cypher language where it fits.
- `src/components/marketing/FoundingStatsBand.tsx`: simple proof strip. Strong enough as a concept, but likely replaced by a more subtle ticker/proof band.
- `src/components/marketing/ThreePathsSection.tsx`: solid waitlist-role integration. Needs premium copy/layout upgrade, not routing changes.
- `src/components/marketing/ProductVideo.tsx`: already modified in worktree; can be repurposed as Product Surfaces or replaced in homepage sequence. Keep component available for other pages.
- `src/components/marketing/ExerciseLibraryPreview.tsx`: rich video library surface, but not currently used on homepage. It can inform Fuel/Product Surfaces but should not dominate this landing page.
- `src/components/marketing/FoFitTeamsSection.tsx`: not present in this checkout. Teams must be implemented as a new landing section or inline component.
- `src/components/marketing/PricingPreview.tsx`: functional and waitlist-aware for Premium. Needs landing-specific wrapper/copy or class upgrades.
- `src/styles/tokens.css`: currently imports Inter, Instrument Serif, IBM Plex Mono, Space Grotesk. Needs font direction change to Geist + Instrument Serif + IBM Plex Mono.
- `src/styles/global.css`: owns most current homepage CSS and has appended dirty Cypher/ProductVideo changes. Touch for `lp-*` landing styles.
- `src/styles/utilities.css`: owns simple `.reveal` animation. Extend or keep while adding `lp-reveal`.
- Public/assets: listed below.

## Current Homepage Section Order

1. `HomeVideoHero`
2. `FoundingStatsBand`
3. `ThreePathsSection`
4. `ProductVideo`
5. `CypherTranscript`
6. Inline `v3-system` operating system section
7. Inline `v3-week` real-week section
8. Inline `v3-contrast` positioning section
9. Inline `v3-teams` teams CTA section
10. Inline `v3-pricing` section with `PricingPreview`
11. Inline `v3-notes` field notes section with `ArticleGrid`
12. Inline `v3-final` CTA

## Keep, Upgrade, Rebuild

Strong enough to keep as infrastructure:

- `SiteShell`, `Navbar`, `Footer`, `WaitlistModal`, `EarlyAccessButton`
- `WaitlistProvider` and routing
- `Button` component classes and focus behavior
- Hero video/poster assets as background fallback material
- Existing app screenshots and brand device assets

Strong enough to keep as product ideas, but upgrade visually:

- Three paths for lifter/athlete/coach
- Cypher transcript/product logic
- PricingPreview waitlist path
- Founding member offer

Needs full landing rebuild:

- Hero composition and H1
- Context Memory section
- Daily Loop section
- Product Surfaces section
- Fuel System section
- FoFit Score section
- Teams landing section
- Final CTA
- Homepage composition in `HomePage.tsx`

## CSS Files To Touch

- `src/styles/tokens.css`: font import and font variables; optional landing tokens if needed.
- `src/styles/global.css`: new `lp-*` landing section styles, hero product cockpit, responsive polish, reduced-motion handling.
- `src/styles/utilities.css`: `lp-reveal` motion utilities and delays.

Existing `v3-*`, `home-video-hero-*`, and `product-proof-*` CSS can remain for routes/components that still use it, but the homepage should move to `lp-*` classes.

## Waitlist Integration Path

Waitlist opens through:

- `EarlyAccessButton` -> `useEarlyAccess()` -> `open({ initialRole })`
- `WaitlistProvider` in `App`
- `WaitlistModal` rendered once in `SiteShell`

Current waitlist-opening components:

- `Navbar` founding CTA
- `HomeVideoHero` primary CTA
- `ThreePathsSection` role CTAs
- `PricingPreview` Premium CTA
- `HomePage` final CTA

Implementation should keep using `EarlyAccessButton` everywhere. It may pass `initialRole` for role-specific CTAs.

## Hero And Product Assets

Public assets:

- `/hero.mp4`
- `/hero.av1.mp4`
- `/hero-poster.jpg`
- `/product-devices.mp4`
- `/product-devices-poster.jpg`
- `/cypher-loop.mp4`
- `/cypher-poster.jpg`
- `/og-image.png`, `/og-image.svg`
- favicons/app icons
- exercise videos under `/videos/exercises/*.MP4`

Source assets:

- `src/assets/app-screens/workout-home.png`
- `src/assets/app-screens/cypher-brief.png`
- `src/assets/app-screens/discover-plan.png`
- `src/assets/app-screens/discover-pick.png`
- `src/assets/app-screens/nutrition-scanning.png`
- `src/assets/app-screens/nutrition-tracking.png`
- `src/assets/editorial/cypher-nutrition-thread.png`
- `src/assets/editorial/nutrition-dashboard.jpg`
- `src/assets/brand/app-screens/device/01-splash.png` through `05-journey.png`
- `src/assets/brand/app-screens/flat/01-splash.png` through `05-journey.png`
- `src/assets/brand/video/hero-loop.mp4`
- `src/assets/brand/video/hero-loop-poster.jpg`

Assessment: real video and screenshot assets exist, but the new hero should not depend on them. Build a CSS product cockpit (`LandingHeroSystem`) so the first viewport still feels premium if video fails.

## Current Font Tokens

Current import:

```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap");
```

Current tokens:

- `--font-body: "Inter", sans-serif`
- `--font-display: "Space Grotesk", sans-serif`
- `--font-display-serif: "Instrument Serif", serif`
- `--font-label-mono: "IBM Plex Mono", monospace`

Needed:

- Body: Geist with Inter fallback
- Display: Geist 800/900
- Editorial italic accent: Instrument Serif italic
- Labels/eyebrows/data: IBM Plex Mono

## Current Animation Utilities

Existing utility:

- `.reveal` runs `reveal-up 0.7s ease both`
- `.reveal--delay-2` adds `0.18s`

Existing section animations:

- Hero live pulse and ring animations
- Cypher typing/message/radar sequencing in dirty `global.css`
- ProductVideo rest timer in React and ambient video
- Reduced-motion rules for hero video, Cypher, and ProductVideo ambient media

Needed:

- `useInView` hook
- Optional `Revealer` component
- `lp-reveal` classes with delay variants and reduced-motion fallback
- CSS-only hero/product ambient motion with no Framer Motion/GSAP

## Dangerous Files

Do not edit unless a source-level blocker appears:

- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/routes.tsx`
- `src/app/waitlist-context.tsx`
- `src/components/marketing/WaitlistModal.tsx`
- `src/components/layout/SiteShell.tsx`
- `src/components/layout/Navbar.tsx`

Additional caution:

- `src/styles/global.css` and `src/styles/tokens.css` are already dirty. Preserve existing worktree changes while adding landing styles.
- `src/components/marketing/CypherTranscript.tsx` and `src/components/marketing/ProductVideo.tsx` are already dirty. Rebuild only as part of the requested landing transformation.

## Exact Implementation Sequence

1. Commit Wave 0 docs only.
2. Add `src/data/homepage.ts`, `src/lib/useInView.ts`, optional `src/lib/usePointerGlow.ts`, and `src/components/motion/Revealer.tsx`.
3. Update `tokens.css` font import and font variables.
4. Add `LandingHeroSystem.tsx`.
5. Rebuild `HomeVideoHero.tsx` as `lp-hero` using video fallback, new H1, trust row, and hero product cockpit.
6. Add `ContextMemorySection.tsx` and `DailyLoopSection.tsx`.
7. Upgrade `ThreePathsSection.tsx` and `CypherTranscript.tsx` around the new data model and `lp-*` styles.
8. Add `FuelSystemSection.tsx`, `FoFitScoreLandingSection.tsx`, and a landing Teams section.
9. Upgrade `PricingPreview.tsx` or wrap it with landing-specific copy/classes while preserving Premium waitlist CTA.
10. Add `LandingFinalCTA.tsx`.
11. Rewrite `HomePage.tsx` composition into the target order.
12. Add/extend `lp-*` styles in `global.css` and motion utilities in `utilities.css`.
13. Run `npm run build` and `npm run validate:copy`.
14. Run `npm run preview` and browser QA on desktop/mobile/waitlist/no-overflow/reduced-motion.
15. Create `docs/landing-ultra-final-handoff.md` with files changed, commands, risks, QA checklist, and deferred ideas.
