# Add a website language

1. Add a locale policy in `localization/policy.mjs` with a real BCP 47 tag, native language name, unique route prefix, direction, `publication: 'preview'`, and `review: 'required'`. Do not infer a country from language.
2. Copy the semantic keys in `localization/locales/en.json` into the new locale file. Translate the release page's complete context, metadata, CTA, preview notice, and English-policy notice. The metaphor “fuel” refers to nutrition; use natural local wording. “Coming soon” does not supply a launch date. Keep FoFit, iPhone and Android product names.
3. Add exact locale-root redirects and release rewrites in `vercel.json` before the SPA fallback. The recovered-output builder generates equivalent routes. Keep existing URLs and auth destinations.
4. Run policy tests and the approved build. Inspect missing-key coverage and actual phone rendering. No translation may be published if it only duplicates English or lacks required strings.
5. Obtain native-speaker review and record the reviewer/date in the release's normal review record. Set `review: 'approved'` and only then `publication: 'published'` when this page is ready to ship. The builder then removes the preview banner/noindex and emits genuine release-page hreflang pairs. Update output expectations to the new reviewed state.

Adding a translated page beyond release information requires a separate page registry and complete page content. Do not route `/es/nutrition` to the English Nutrition page while labelling it Spanish. The current six previews need native-speaker review; no reviewer is claimed by the build.
