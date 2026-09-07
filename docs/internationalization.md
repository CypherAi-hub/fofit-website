# FoFit website internationalization

This is the existing founder-approved marketing website. `scripts/build-approved-marketing.py` still verifies its recovered baseline, patches the approved bundle, and preserves the green gym hero. The new `build-localized-marketing.mjs` step adds small static release-information pages using the same approved stylesheet. It does not compile the legacy React design or replace the application.

## Current coverage

English remains the default. The main marketing pages and existing app links retain their URLs. `/beta` retains its existing React UI and receives route-specific HTML metadata. `/languages` lists the actual coverage. `/es/beta`, `/pt-br/beta`, `/fr/beta`, `/de/beta`, `/ja/beta`, and `/ko/beta` contain 17 translated release-information strings each; locale roots redirect to their release page. These are clearly labelled translation previews and await native-speaker review. They are `noindex,follow`, have self-canonical URLs, and are excluded from hreflang. They are not market-launch announcements or translations of the full homepage/app.

`localization/policy.mjs` owns locale resolution, paths, publication/review status, market editorial defaults, safe account/store destinations, and code-only attribution parsing. `localization/locales/*.json` owns semantic release copy. Missing preview strings fall back to English and are marked `lang="en"` in rendered content. Unsupported locales fall back to English; unsupported regions use GLOBAL. A language does not infer a country. Unsupported Portuguese variants do not claim Brazilian Portuguese coverage.

The builder refuses to publish a non-English page without approved review or complete strings, and refuses a locale bundle that merely duplicates English. Search alternates are emitted only for reviewed published translations of the same release page. No duplicate English language pages or speculative market SEO pages are created. The generated `globalization/coverage.json` is machine-readable evidence, not a claim of full-product completion. The browser helper follows the existing React metadata updates to keep English canonical/og:url values current during client navigation; it does not replace the router. Vite preview reuses exact local redirects and static-index rewrites from vercel.json so the canonical locale URLs can be tested locally.

## Account and attribution boundary

The existing account remains at `https://app.fofit.app/onboarding`. Localized CTA links carry a validated `locale` plus an explicitly supplied `market` and optional bounded campaign codes. These are link metadata only. This website does not save account language settings, establish signup attribution, report conversions, or synchronize native preferences. The account application must separately consume and validate those parameters without overwriting an existing explicit preference.

Allowed codes: `ref`, `creator`, `campaign`, `utm_source`, `utm_medium`, `utm_campaign`; each is 1–64 ASCII letters/numbers/underscore/hyphen. Duplicate fields, URLs, email-shaped values, free text, and auth fields are rejected. Do not put names, email, medical information, or other personal data into campaign codes. Codes stay in sessionStorage for same-tab handoff; there is no analytics request, fingerprinting, cookie, permanent storage, payout, or referral entitlement. Blocked storage does not prevent navigation. Policy/consent requirements still need review for each market.

## Layout and remaining work

Localized release pages use fluid widths, wrapping buttons, logical margins, UTF-8, HTML language/direction, and Japanese/Korean text. No RTL language is enabled. The existing English React site's physical left/right styles and broad hardcoded copy remain; this is not an RTL migration or complete string extraction. Preview support/privacy/terms links explicitly identify their English destination.

No dependencies, schema migrations, provider integrations, prices, production deployment, testimonials, or creator campaigns were added. Actual App Store availability and native/personal-web language coverage require separate verification.

Validation: `npm run test:globalization`; `npm run build` runs both approved-design and localized-output checks. After changes, inspect one long German CTA and Japanese/Korean page at phone width, plus the unchanged home hero. Native-speaker review is still required for all six translation previews.
