# Build 74 legal-page sync

Prepared October 1, 2026. This commit prepares the public pages; it does not publish them or submit an App Review response.

The four HTML pages were exported without changing their wording from FoFit mobile commit `b8e9fbc96123ad445ddc742ad21cf9b693b4ff4f`, using `scripts/export-public-legal-pages.ts`. The source disclosure date is September 29. Existing page design, support-link enhancement, marketing copy and localized pages remain intact.

The update describes affirmative AI sharing, named providers (including Tavily), withdrawal, the separate Future You photo flow, private storage, account export, storage cleanup before account deletion, and affiliate links. It removes obsolete claims that community media has permanent public raw URLs. No new owner, address, response-time promise, or compliance certification was added.

Live FoFit backend rollout on October 1 applied the AI-consent and private-media migrations and deployed ten functions. Independent deployment receipts are in the coordinating release workspace under `outputs/backend-rollout-2026-10-01/`. The native reviewer account displayed AI sharing off and no recorded permission. Provider dispatch was not exercised with that account.

Provider references checked October 1:

- [Anthropic commercial API retention](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)
- [OpenAI API data controls](https://developers.openai.com/api/docs/guides/your-data)
- [Tavily privacy policy](https://www.tavily.com/privacy)

Validation: `npm run validate:legal`, `npm run build`, and `git diff --check` pass. The build validates the complete output, localized pages, baseline hashes, current availability wording, and existing negative controls. The legal-route assertions now require the consent and deletion language instead of the superseded public-URL claims.

Production was last read as deployment `dpl_Rat9k6DBVwAL71NBFzPijxCrGMKJ` on October 1. Its privacy page still had the older disclosure. Before publishing, compare the built output with that live deployment and preserve unrelated marketing work. After publishing, fetch the exact public routes again and verify their final response content; a local build is not a live-policy receipt.
