import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN, locales, releasePath } from '../localization/policy.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(process.argv[2] ?? path.join(repo, 'dist'));
const config = JSON.parse(fs.readFileSync(path.join(repo, 'vercel.json')));
const coverage = JSON.parse(fs.readFileSync(path.join(root, 'globalization/coverage.json')));
const beta = fs.readFileSync(path.join(root, 'beta/index.html'), 'utf8');
assert.ok(beta.includes('<html lang="en"'));
assert.ok(beta.includes(`<link rel="canonical" href="${SITE_ORIGIN}/beta">`));
assert.equal((beta.match(/<title>/g) ?? []).length, 1, 'Release metadata must replace, not duplicate, old metadata');
assert.ok(!beta.includes('hreflang="es"'), 'Preview must not be advertised as published alternate');
for (const [locale, policy] of Object.entries(locales)) {
  assert.deepEqual(coverage.pages.release[locale].missingKeys, []);
  if (locale === 'en') continue;
  const route = releasePath(locale);
  const html = fs.readFileSync(path.join(root, route, 'index.html'), 'utf8');
  assert.ok(html.includes(`<html lang="${policy.tag}" dir="ltr"`));
  assert.ok(html.includes('<meta name="robots" content="noindex,follow">'));
  assert.ok(html.includes(`<link rel="canonical" href="${SITE_ORIGIN}${route}">`));
  assert.ok(!html.includes('rel="alternate"'), 'Unreviewed preview has search alternates');
  assert.ok(!html.includes('Your training. Your fuel. One app.'), 'Duplicate English preview');
  assert.ok(html.includes('class="translation-preview"'));
  assert.ok(html.includes('/globalization/browser.mjs'));
  assert.ok(!html.includes('/assets/index-') || !html.includes('<script type="module" crossorigin'), 'Localized static copy must not be overwritten by English SPA');
  assert.ok(config.rewrites.some(item => item.source === route && item.destination === `${route}/index.html`), `Missing exact production rewrite: ${route}`);
  assert.ok(config.redirects.some(item => item.source === policy.prefix && item.destination === route), `Missing locale-root redirect: ${policy.prefix}`);
}
const main = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(main.includes('href="/languages"'));
assert.ok(!main.includes('noindex'), 'English homepage indexing changed');
assert.equal(coverage.accountPreferenceSync, false);
console.log('PASS localized built HTML, reviewed-publication boundary, canonical metadata, routes, and honest coverage.');
