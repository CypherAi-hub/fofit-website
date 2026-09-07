# Marketing website fixes — September 6, 2026

Production: dpl_H1RVLzpXJ9JJkZm69nkdWfFBsN1t, https://www.fofit.app.
Rollback baseline: dpl_H8aCN3qJhLQjTgVGycF5TKGdv6qM.

Removed the early-access dialog and replaced the beta request page with a release-status page. Existing waitlist records were not modified. Primary calls to action route to /beta; there is no verified public download URL yet. Changed old founding-250 CTA text and FAQ/authorization copy describing the removed waitlist. Replaced 28 internal/editorial copy strings with visitor-facing descriptions. Replaced stale spring/summer launch statements. Collapsed navigation below 1100px to prevent crowding. Retained the approved green video hero, original media, legal documents, existing account sign-in, and prices.

The source checkout still differs from the approved production design. This deployment patches the previously recovered production artifact rather than deploying the stale React source. scripts/patch-recovered-marketing.py reproduces the patch with --base <recovered-output> --output <new-output>. Archive/recover the rollback baseline through Vercel before rerunning. Do not deploy this checkout's normal Vite build over the approved design until the source revisions are reconciled.

Validation: JS syntax check; baseline comparison confirmed original media unchanged; twelve public pages rendered at 390px without horizontal overflow or broken loaded images. Mobile menu opened and closed after navigation. Desktop and mobile release page visually reviewed. Live www.fofit.app loaded the new index-48f77fbc4c.js bundle; Get FoFit navigated to /beta, with zero forms. No signup/email was submitted. Account authentication and purchase flows were not exercised.

The waitlist endpoint was diagnosed as compiled out before the owner requested removal; the form repair was superseded by removal. No backend deployment or waitlist data deletion occurred. Pricing still requires alignment with app launch policy; prices were not changed in this task.
