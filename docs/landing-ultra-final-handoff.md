# FoFit Landing Ultra Final Handoff

Date: 2026-05-05
Branch: `feat/cypher-web-visual-match`

## Summary

The homepage has been transformed from a mixed `v3-*` marketing page into a focused premium launch page with a new `lp-*` landing system.

Final homepage order:

1. Hero: Train honestly.
2. Context Memory: What FoFit remembers.
3. Three Paths: Lifter / Athlete / Coach.
4. Cypher Transcript: Not a chatbot.
5. Daily Loop: Morning -> Lift -> During -> After.
6. Product Surfaces: Workout, Fuel, Progress, Teams.
7. Fuel System: Food photo, macros, Fuel Library.
8. FoFit Score: identity and progress.
9. Teams: coach/team expansion.
10. Pricing: Founding 250 offer.
11. Final CTA.

## Files Changed

Created:

- `src/components/marketing/ContextMemorySection.tsx`
- `src/components/marketing/DailyLoopSection.tsx`
- `src/components/marketing/FoFitScoreLandingSection.tsx`
- `src/components/marketing/FuelSystemSection.tsx`
- `src/components/marketing/LandingFinalCTA.tsx`
- `src/components/marketing/LandingHeroSystem.tsx`
- `src/components/marketing/LandingPricingSection.tsx`
- `src/components/marketing/LandingTeamsSection.tsx`
- `src/components/marketing/ProductSurfacesSection.tsx`
- `src/components/motion/Revealer.tsx`
- `src/data/homepage.ts`
- `src/lib/useInView.ts`
- `src/lib/usePointerGlow.ts`
- Wave 0 docs and this final handoff doc.

Modified:

- `src/pages/HomePage.tsx`
- `src/components/marketing/HomeVideoHero.tsx`
- `src/components/marketing/ThreePathsSection.tsx`
- `src/components/marketing/CypherTranscript.tsx`
- `src/components/marketing/FoFitScoreLandingSection.tsx`
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/utilities.css`

Not modified by this implementation:

- Dangerous routing/waitlist shell files.
- `src/components/marketing/WaitlistModal.tsx`.
- `src/components/marketing/ProductVideo.tsx`; it was already dirty before this work and remains uncommitted because `SubmissionPreviewPage` still imports it.

## Section Changes

- Hero now uses the requested "Train honestly" thesis, waitlist CTA, product-system cockpit, and video-independent visual fallback.
- Context Memory explains the product difference through concrete memory signals.
- Three Paths is rebuilt around lifter, athlete, and coach paths while preserving `initialRole`.
- Cypher Transcript shows a specific memory-to-adjustment approval flow.
- Daily Loop shows the product operating rhythm.
- Product Surfaces ties workout, fuel, progress, and teams into one system.
- FoFit Fuel uses existing nutrition assets and training-linked food context.
- FoFit Score turns consistency/training/activity into a product identity surface.
- Teams provides coach/team context without modifying other routes.
- Pricing is a restrained founding offer with `EarlyAccessButton`.
- Final CTA closes on the real-week thesis.

## Font Changes

`src/styles/tokens.css` now imports Geist, Instrument Serif, and IBM Plex Mono.

The landing H1 uses Geist display with Instrument Serif italic for only `honestly.`

## Animation System Added

- `useInView` one-shot IntersectionObserver hook.
- `Revealer` component.
- `lp-reveal` utilities and delay classes.
- CSS-only hero/product motion, card hover glow, ticker, and reduced-motion fallbacks.
- No Framer Motion, no GSAP, no new animation dependency.

## Commands Run

- `npm run build` -> passed.
- `npm run validate:copy` -> passed after changing the score heading to avoid the banned `should feel` copy pattern.
- `./node_modules/.bin/tsc --noEmit` -> passed with no output.
- `npm run preview -- --host 127.0.0.1 --port 4173` -> used for browser QA.

Build note:

- Vite still reports the existing large chunk advisory after minification.

## Browser QA Proof

Desktop home:

- Verified page title and 11 landing sections in order through Playwright snapshot/eval.
- Verified hero H1, product system, and no horizontal overflow at 1200px and 1440px.
- Verified hero video fallback by removing `.lp-hero__video`; product system stayed visible and no overflow appeared.
- Verified console errors: 0.

Mobile home:

- Verified at 390x844.
- `documentElement.scrollWidth` and `body.scrollWidth` both equal 390.
- Hero title rect fits within viewport after mobile type adjustment.

Waitlist:

- Hero CTA opens waitlist modal.
- Pricing CTA opens waitlist modal.
- Final CTA opens waitlist modal.
- Modal remains globally owned by `SiteShell` and `WaitlistModal`.

Routes:

- `/product` loads and has no horizontal overflow.
- `/pricing` loads and has no horizontal overflow.
- `/coaches` loads and has no horizontal overflow.
- `/teams` loads and has no horizontal overflow.

Screenshots to capture manually before launch:

- Desktop first viewport at 1440px.
- Mobile first viewport at 390px.
- Cypher transcript section.
- Product Surfaces + Fuel sections.
- Pricing + Final CTA.

Playwright CLI screenshot command timed out waiting for viewport capture in this environment, so QA relied on snapshots, DOM metrics, route checks, and console checks.

## Risks

- `ProductVideo.tsx` remains a pre-existing uncommitted modification outside the new homepage path.
- Several imported app screenshots are large; Vite emits the existing chunk-size advisory.
- Google Fonts require network at runtime; fallbacks are configured.
- Reduced-motion behavior is implemented in source for `lp-reveal`, hero/video, phone/card motion, ticker, and hover transitions; manual OS-level reduced-motion inspection is still recommended before launch.

## Manual QA Checklist

- [x] Desktop home top-to-bottom
- [x] Mobile home top-to-bottom
- [x] Hero video fallback
- [x] Waitlist modal opens from hero
- [x] Waitlist modal opens from pricing/final CTA
- [x] Navbar routes load
- [x] Product/pricing/coaches/teams routes still load
- [x] No horizontal scroll
- [x] Text readable on mobile
- [x] Build passes
- [x] `validate:copy` passes
- [ ] Manual OS-level reduced-motion check
- [ ] Visual screenshot review in an unobstructed browser window

## Deferred Ideas

- Add route-level code splitting for asset-heavy marketing pages if bundle size becomes a launch blocker.
- Add a dedicated screenshot QA script that does not depend on the current Playwright CLI screenshot timeout path.
- Consider a future, route-safe cleanup of `ProductVideo.tsx` and `SubmissionPreviewPage`.
- Add real launch proof once waitlist/member data is final.
