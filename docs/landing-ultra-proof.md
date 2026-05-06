# FoFit Landing Ultra Proof

## Wave 0 Proof

Completed before implementation:

- Confirmed current repo path.
- Confirmed branch: `feat/cypher-web-visual-match`.
- Confirmed dirty files before source edits:
  - `src/components/marketing/CypherTranscript.tsx`
  - `src/components/marketing/ProductVideo.tsx`
  - `src/styles/global.css`
  - `src/styles/tokens.css`
- Read routing/waitlist shell:
  - `src/main.tsx`
  - `src/app/App.tsx`
  - `src/app/routes.tsx`
  - `src/app/waitlist-context.tsx`
  - `src/components/layout/SiteShell.tsx`
  - `src/components/layout/Navbar.tsx`
  - `src/components/marketing/WaitlistModal.tsx`
  - `src/components/marketing/EarlyAccessButton.tsx`
- Read homepage and marketing components named in the mission.
- Confirmed `src/components/marketing/FoFitTeamsSection.tsx` is absent.
- Listed public and source assets.
- Read current font tokens and animation utilities.

## Current Waitlist Proof

The waitlist modal is rendered globally through:

`App` -> `WaitlistProvider` -> `SiteShell` -> `WaitlistModal`

Buttons open it through:

`EarlyAccessButton` -> `useEarlyAccess().open({ initialRole })`

No Wave 0 finding requires editing waitlist context or modal internals.

## Public Asset Proof

Hero/product media exists:

- `/hero.mp4`
- `/hero.av1.mp4`
- `/hero-poster.jpg`
- `/product-devices.mp4`
- `/product-devices-poster.jpg`
- `/cypher-loop.mp4`
- `/cypher-poster.jpg`

App/product screenshots exist:

- `src/assets/app-screens/workout-home.png`
- `src/assets/app-screens/cypher-brief.png`
- `src/assets/app-screens/discover-plan.png`
- `src/assets/app-screens/discover-pick.png`
- `src/assets/app-screens/nutrition-scanning.png`
- `src/assets/app-screens/nutrition-tracking.png`
- `src/assets/brand/app-screens/device/01-splash.png` through `05-journey.png`
- `src/assets/brand/app-screens/flat/01-splash.png` through `05-journey.png`

## Commands Run So Far

- `git status --short --branch`
- `git diff -- src/components/marketing/CypherTranscript.tsx src/components/marketing/ProductVideo.tsx src/styles/global.css src/styles/tokens.css`
- `sed -n ...` on all required Wave 0 files
- `rg --files src/components/marketing src/components/layout src/pages src/styles public src/assets`
- `rg -n ... src/styles/global.css src/styles/utilities.css src/styles/tokens.css`
- `mkdir -p docs`

## Pending Proof

To complete after implementation:

- `npm run build`
- `npm run validate:copy`
- Preview browser QA
- Desktop homepage top-to-bottom screenshot/check
- Mobile homepage top-to-bottom screenshot/check
- Hero video fallback check
- Waitlist modal opens from hero
- Waitlist modal opens from pricing/final CTA
- Navbar works
- Product/pricing/coaches/teams routes still load
- No horizontal scroll
- Text readable on mobile
- Reduced motion layout check

## Known Risk Register

- Dirty worktree includes files the redesign must also touch. Stage explicitly and avoid accidental reverts.
- `global.css` is large and contains old `v3-*` plus newer dirty appended blocks. New landing CSS should use `lp-*` to avoid collisions.
- `FoFitTeamsSection.tsx` does not exist, so Teams must be implemented new.
- Google Font import depends on network at runtime. Fallbacks must remain strong.
- Prior memory says `npm run dev` may hang in this environment. Prefer build + preview for verification.
