# FoFit Landing Ultra Implementation Plan

## Active Homepage File

`src/pages/HomePage.tsx` is the active homepage composition file. It currently mixes component sections and inline `v3-*` sections. The implementation will replace the homepage composition with a clean landing sequence and keep routing untouched.

## Files To Create

- `src/data/homepage.ts`
- `src/lib/useInView.ts`
- `src/lib/usePointerGlow.ts` if used
- `src/components/motion/Revealer.tsx`
- `src/components/marketing/LandingHeroSystem.tsx`
- `src/components/marketing/ContextMemorySection.tsx`
- `src/components/marketing/DailyLoopSection.tsx`
- `src/components/marketing/FuelSystemSection.tsx`
- `src/components/marketing/FoFitScoreLandingSection.tsx`
- `src/components/marketing/LandingTeamsSection.tsx`
- `src/components/marketing/LandingFinalCTA.tsx`
- `docs/landing-ultra-final-handoff.md`

## Files To Modify

- `src/pages/HomePage.tsx`
- `src/components/marketing/HomeVideoHero.tsx`
- `src/components/marketing/ThreePathsSection.tsx`
- `src/components/marketing/CypherTranscript.tsx`
- `src/components/marketing/ProductVideo.tsx` if repurposed for Product Surfaces
- `src/components/marketing/PricingPreview.tsx` only for safe class/copy polish
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/utilities.css`

## Files To Avoid

No edits planned:

- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/routes.tsx`
- `src/app/waitlist-context.tsx`
- `src/components/marketing/WaitlistModal.tsx`
- `src/components/layout/SiteShell.tsx`
- `src/components/layout/Navbar.tsx`

## Final Section Order

1. Hero: Train honestly.
2. Context Memory: What FoFit remembers.
3. Three Paths: Lifter / Athlete / Coach.
4. Cypher Transcript: Not a chatbot.
5. Daily Loop: Morning -> Lift -> After -> Week.
6. Product Surfaces: Workout, Fuel, Progress, Teams.
7. Fuel System: Food photo, macros, Fuel Library.
8. FoFit Score: Identity and progress.
9. Teams: Coach/team expansion.
10. Pricing: Founding member offer.
11. Final CTA: Stop tracking perfect plans. Start training the real week.

## Commit Sequence

1. `docs(landing): add ultra audit doctrine and motion plan`
2. `feat(landing): add homepage data and motion primitives`
3. `style(theme): upgrade font system and landing tokens`
4. `feat(landing): rebuild hero as premium product system`
5. `feat(landing): add context memory and daily loop sections`
6. `feat(landing): upgrade paths cypher transcript and fuel story`
7. `feat(landing): upgrade score teams pricing and final CTA`
8. `style(landing): responsive polish and motion/accessibility pass`
9. `docs(landing): add final handoff and QA proof`

Because the worktree already has dirty files in the landing area, staging must be explicit and scoped for each commit.

## Detailed Build Sequence

1. Create Wave 0 docs and commit only docs.
2. Add data arrays in `src/data/homepage.ts`.
3. Add `useInView` and `Revealer`.
4. Add optional `usePointerGlow` only if it keeps card interactions cleaner.
5. Update font tokens.
6. Build hero cockpit component.
7. Replace `HomeVideoHero` internals with `lp-hero`, video fallback, H1, CTAs, trust row, and `LandingHeroSystem`.
8. Add Context Memory and Daily Loop sections.
9. Rework Three Paths to use landing data and `lp-card` style while preserving `EarlyAccessButton initialRole`.
10. Rework Cypher Transcript to show real training memory logic and approval flow.
11. Rework ProductVideo or add Product Surfaces section in homepage.
12. Add Fuel System section with nutrition scans/macros/Fuel Library.
13. Add FoFit Score section.
14. Add Teams section.
15. Wrap or polish PricingPreview with founding offer copy.
16. Add Final CTA with `EarlyAccessButton`.
17. Swap `HomePage.tsx` to the final order.
18. Add responsive and reduced-motion CSS pass.
19. Run validation.
20. Browser QA and final handoff docs.

## Validation Commands

Required:

- `npm run build`
- `npm run validate:copy`

Browser verification:

- Prefer `npm run preview` for this checkout because prior memory says `npm run dev` can hang during Vite transforms here.
- Verify desktop and mobile.
- Verify waitlist opens from hero, pricing, and final CTA.
- Verify reduced motion.

## Rollback Plan

- Font issue: revert `src/styles/tokens.css` only.
- Motion issue: remove `Revealer` usage and leave sections visible.
- Hero issue: revert hero commit only.
- Global CSS leak: move `lp-*` rules into tighter selectors.
- Waitlist issue: revert any touched waitlist-related file immediately.
- Build issue: remove new `HomePage` imports and restore previous section order.
