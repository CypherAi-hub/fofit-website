import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(process.argv[2] ?? path.join(repo, 'dist'));
const html = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
const entry = html.match(/<script type="module"[^>]+src="([^"]+)"/u)?.[1];
assert.ok(entry?.startsWith('/assets/index-'), 'Approved compiled entry is missing');
assert.ok(!html.includes('/src/main.tsx'), 'Rejected legacy source became the entry');
const bundlePath = path.join(output, entry);
const bundle = fs.readFileSync(bundlePath, 'utf8');
const syntax = spawnSync(process.execPath, ['--check', bundlePath], { encoding: 'utf8' });
assert.equal(syntax.status, 0, syntax.stderr);

function validateBundle(source) {
  assert.ok(source.includes('Stop using four fitness apps.'), 'Approved hero missing');
  assert.ok(source.includes('Use FoFit.'), 'Approved hero conclusion missing');
  assert.ok(source.includes('function Ij(){return null}'), 'Waitlist collection UI returned');
  assert.ok(source.includes('window.location.assign("/beta")'), 'Get FoFit does not open release status');
  assert.ok(source.includes('path:"/beta"'), 'Release route missing');
  assert.ok(source.includes('function Z0(){return o.jsxs("section",{className:"release-page"'), 'Release page was replaced');
  assert.ok(source.includes('href:"https://app.fofit.app/onboarding"'), 'Canonical onboarding link missing');
  for (const route of ['login', 'signup', 'onboarding']) {
    assert.ok(source.includes(`path:"/${route}",element:o.jsx(FoFitCanonicalAccountHandoff,{})`),
      `Client account route bypasses canonical handoff: ${route}`);
  }
  assert.ok(source.includes('path:"/pricing"') && source.includes('path:"/faq"'), 'Pricing/FAQ routes missing');
  assert.ok(source.includes('Paid plans are planned.'), 'Paid availability must be explicit');
  assert.ok(source.includes('Student verification is not available yet.'), 'Student availability must be explicit');
  for (const stale of ['$7.99', '$14.99', '$49/mo', '$99/mo', '$199/mo', '$6.99', 'SheerID',
    'Up to 10 athletes', 'Up to 30 athletes', 'Unlimited athletes', 'Team access opens Spring',
    'Founding rates are locked', 'top up with a token pack']) {
    assert.ok(!source.includes(stale), `Stale offer remains in built routes: ${stale}`);
  }
}
validateBundle(bundle);
// Negative controls prove this check would catch a wrong hero, restored form,
// broken release CTA, or a stale offer, rather than merely printing a success.
assert.throws(() => validateBundle(bundle.replaceAll('Stop using four fitness apps.', 'Old hero')));
assert.throws(() => validateBundle(bundle.replace('function Ij(){return null}', 'function Ij(){return "form"}')));
assert.throws(() => validateBundle(bundle.replaceAll('window.location.assign("/beta")', 'window.location.assign("/signup")')));
assert.throws(() => validateBundle(bundle + '"Student $7.99/mo"'));

// An output check on actual assets: all referenced local pictures/video/posters
// must exist. A renderer is still required to assess their appearance/motion.
for (const match of bundle.matchAll(/(?:src|poster):"(\/[^"?]+\.(?:jpg|jpeg|png|webp|mp4|svg))"/gu)) {
  assert.ok(fs.existsSync(path.join(output, match[1])), `Missing media ${match[1]}`);
}
const manifest = JSON.parse(fs.readFileSync(path.join(repo, 'approved-marketing/manifest.json'), 'utf8'));
for (const name of ['hero.mp4', 'hero.av1.mp4', 'hero-poster.jpg', 'assets/index-C5eIdvXa.css']) {
  const expected = manifest.files.find(item => item.path === `static/${name}`)?.sha256;
  const actual = createHash('sha256').update(fs.readFileSync(path.join(output, name))).digest('hex');
  assert.equal(actual, expected, `Approved hero/design asset changed: ${name}`);
}
const handoff = fs.readFileSync(path.join(output, 'canonical-auth-handoff.js'), 'utf8');
assert.ok(html.indexOf('/canonical-auth-handoff.js') < html.indexOf(entry), 'Account handoff must run before the old bundle');
for (const route of ['/login', '/signup', '/onboarding']) {
  let redirected;
  vm.runInNewContext(handoff, { URL, URLSearchParams, window: { location: {
    pathname: route, search: '?utm_source=smoke&code=private&next=/onboarding',
    hash: '#access_token=private', replace: value => { redirected = value; },
  } } });
  const target = new URL(redirected);
  assert.equal(target.origin, 'https://app.fofit.app');
  assert.equal(target.pathname, route);
  assert.equal(target.searchParams.get('utm_source'), 'smoke');
  assert.equal(target.searchParams.get('next'), '/onboarding');
  assert.ok(!target.searchParams.has('code') && !target.hash, 'Auth material must not be forwarded');
  let spaRedirect;
  const mockWindow = { location: { pathname: '/', search: '', replace: value => { spaRedirect = value; } } };
  vm.runInNewContext(handoff, { URL, URLSearchParams, window: mockWindow });
  assert.equal(spaRedirect, undefined, 'Ordinary marketing routes must remain local');
  mockWindow.location.pathname = route;
  mockWindow.location.search = '?next=//untrusted.example';
  mockWindow.fofitCanonicalAccountHandoff();
  assert.equal(spaRedirect, `https://app.fofit.app${route}`, 'SPA account navigation must share the safe handoff');
}
const config = JSON.parse(fs.readFileSync(path.join(repo, 'vercel.json'), 'utf8'));
for (const route of ['/login', '/signup', '/onboarding']) {
  assert.ok(config.redirects.some(item => item.source === route && item.destination === `https://app.fofit.app${route}`),
    `Hosting canonical redirect missing: ${route}`);
}
console.log('PASS approved built hero, media hashes, no waitlist UI, release route, canonical handoff, Pricing/FAQ availability, and negative controls.');
