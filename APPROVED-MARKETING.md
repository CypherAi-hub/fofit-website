# Approved FoFit marketing build

The normal website build reproduces the existing approved production design: the dark green gym hero with **“Stop using four fitness apps. Use FoFit.”**, its navigation, and the current app captures. This prevents the older React checkout from silently replacing the approved site.

## Build and preview

- `npm run build` verifies the baseline hashes, applies the existing recovery patch and reviewed copy, validates the result, then writes `dist/`.
- `npm run dev` builds and serves that output at `http://127.0.0.1:4173`.
- `npm run preview` serves the most recent `dist/`.
- `npm run validate:approved` checks an existing build.
- Vercel is explicitly configured to run `npm run build` and use `dist/`.

The build uses Python 3, Node, and the already installed project dependencies. It makes no network requests, reads no environment files, and does not deploy. It validates in a temporary directory before replacing the last successful output. Temporary files are removed on success or failure.

## Provenance and retained source

`approved-marketing/manifest.json` pins all 86 recovered baseline files by SHA-256. The baseline is the already recovered, repaired deployment `dpl_H8aCN3qJhLQjTgVGycF5TKGdv6qM`, documented in `RECOVERY-2026-09-06.md`. Its predecessor was `dpl_H2JNEWGybV3eTf4ChzXUigikXWE7`. The original baseline was read from the existing local recovery artifact; no new remote recovery or download was needed.

The snapshot reuses 27 byte-identical files already in `public/` instead of copying them. Snapshot files total 21,732,305 bytes. The original hero video, poster, and core stylesheet remain byte-identical to that approved baseline. Current Discover/Market captures come from the already tracked `public/images/current-app/` folder. Synthetic UI video files remain preserved in existing source/baseline storage but are excluded from deployment output; the leftover product-page video reference is also removed.

The recovered JavaScript includes the same public Supabase client configuration as that production baseline. Its bundled JWT was decoded locally and verified to have the `anon` role; no private key or environment file was added. Login, signup, and onboarding use the existing `https://app.fofit.app` application, including client-side navigation and static preview. The preview handoff only carries approved acquisition parameters and a relative `next` path. Legacy `/welcome` and `/dashboard` callback/account behavior remains preserved; this change does not redesign authentication.

`src/`, the root Vite source entry, and its supporting files are **legacy source retained for reconstruction**, not the current production build. Use `npm run dev:legacy` only to work on that older design. `npm run build:legacy` writes `legacy-dist/`, which is excluded from deployment and Git. Neither command should be used to replace the approved site. `WEBSITE-FIXES-2026-09-06.md` is prior unrelated local work and was left untouched.

This is a reproducible artifact build, not a claim that the original React source has been recovered. Keep the baseline immutable; a source reconstruction should replace it only after render, navigation, and media parity are checked against this approved output.

## Reviewed launch copy

`scripts/approved-marketing-copy.json` holds whole-string changes. Home, Pricing, FAQ, and Teams describe a free core and planned paid plans. Unconfirmed prices, student/SheerID verification, roster limits, white-label/SSO benefits, expired release timing, and token-pack purchase promises are removed. Existing illustrative images are labeled as illustrations rather than real FoFit members. No native catalog, billing feature, entitlement, price configuration, or offer was activated.

The waitlist collection modal and beta collection route are unmounted; “Get FoFit” opens `/beta`. The release page gives the existing web onboarding path and an honest iPhone release-preparation state. Historical waitlist identifiers and unused helpers remain inside the recovered bundle for compatibility; their presence is not a live collection form.

## Validation actually run on September 6, 2026

- Default `npm run build` passed on the final output. It checks the compiled entry and JavaScript syntax, exact hero, protected asset hashes, removed collection modal, release route/CTA, all three canonical account routes, referenced local media, and Pricing/FAQ availability. Negative controls reject a changed hero, restored modal, broken CTA, and stale price.
- The actual handoff helper executed in Node VM tests for direct and client-side route transitions. It preserves allowed source/relative-next parameters, drops auth material in the preview handoff, and refuses an external `next` URL.
- `npm run validate:legal`, `npm run validate:copy`, and `tsc --noEmit` passed. The older copy validator still inspects legacy source, so it does not establish approved-design parity by itself.
- Chrome visibly rendered the local production output at port 4187 with the approved green hero. Clicking “Get FoFit” opened the release page. Pricing, FAQ, and Teams rendered the revised unavailable/planned copy; the product route rendered without the retired video. Clicking the header “Sign in” reached `https://app.fofit.app/login`; direct local onboarding reached `https://app.fofit.app/onboarding` and its same-account setup introduction. No forms were submitted.

This verifies a local build and those browser paths. It does not establish deployment, subscription availability, completed onboarding persistence, provider functionality, mobile responsive coverage, or full-motion media quality. No production changes were made.

Final baseline manifest SHA-256: `990f05e1fc4d3c493b42f4e14b11e371085d7d735e6fd2d72ca7d8cc757afad0`.

Final compiled entry `index-31a7fefd44.js` SHA-256: `31a7fefd4400e14d0be89bd6c00636777c8ab5112095d9be11e5f8005b9f025c`. Build metadata is also written to `dist/approved-build.json`.
