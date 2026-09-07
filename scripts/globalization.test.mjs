import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import { locales, markets, resolveLocale, resolveMarket, localeForPath, releasePath,
  releaseAlternates, getMarketConfig, message, parseAttribution, accountDestination,
  verifiedStoreDestination } from '../localization/policy.mjs';

test('locale normalization is deterministic, with English fallback and no invented Portuguese coverage', () => {
  for (const input of [undefined, '', '__', 'ar', 'pt-PT', 'x-private']) assert.equal(resolveLocale(input), 'en');
  assert.equal(resolveLocale('pt_BR'), 'pt-BR');
  assert.equal(resolveLocale('es-MX'), 'es');
  assert.equal(resolveLocale('de-DE'), 'de');
  assert.equal(resolveLocale('ja-JP'), 'ja');
  assert.equal(releasePath('ko-KR'), '/ko/beta');
  assert.equal(localeForPath('/pt-br/beta'), 'pt-BR');
  assert.equal(localeForPath('/pricing'), 'en');
});

test('a missing or empty string falls back; complete preview bundles share semantic keys', () => {
  const en = JSON.parse(fs.readFileSync(new URL('../localization/locales/en.json', import.meta.url)));
  assert.equal(message({ 'release.accountCta': '' }, en, 'release.accountCta'), en['release.accountCta']);
  assert.equal(message({}, en, 'release.accountCta'), en['release.accountCta']);
  for (const locale of Object.keys(locales)) {
    const bundle = JSON.parse(fs.readFileSync(new URL(`../localization/locales/${locale}.json`, import.meta.url)));
    assert.deepEqual(Object.keys(bundle).sort(), Object.keys(en).sort());
    assert.ok(Object.values(bundle).every(value => typeof value === 'string' && value.trim()));
    if (locale !== 'en') assert.notEqual(bundle['release.title'], en['release.title']);
  }
});

test('hreflang excludes previews and untranslated pages, including in a future publication change', () => {
  assert.deepEqual(releaseAlternates().map(item => item.lang), ['en']);
  const unreviewed = { ...locales, es: { ...locales.es, publication: 'published' } };
  assert.deepEqual(releaseAlternates(unreviewed).map(item => item.lang), ['en']);
  const policy = { ...locales, es: { ...locales.es, publication: 'published', review: 'approved' } };
  assert.deepEqual(releaseAlternates(policy, ['en', 'es']).map(item => item.lang), ['en', 'es']);
  assert.deepEqual(releaseAlternates(policy, ['en']).map(item => item.lang), ['en']);
});

test('market selection is explicit and never creates launch, price, policy or store claims', () => {
  assert.equal(resolveMarket('br'), 'BR');
  assert.equal(resolveMarket('pt-BR'), 'GLOBAL');
  assert.equal(resolveMarket('unknown'), 'GLOBAL');
  assert.equal(getMarketConfig('JP').stage, 'planned');
  assert.equal(getMarketConfig('BR').defaultLocale, 'pt-BR');
  for (const value of Object.values(markets)) {
    assert.equal(value.pricing, null);
    assert.equal(value.storeLinks.ios, null);
    assert.equal(value.storeLinks.android, null);
    assert.equal(value.legalReview, 'not-assessed');
    assert.deepEqual(value.testimonials, []);
    assert.equal(value.policyLanguage, 'en');
  }
});

test('attribution accepts bounded code fields and rejects auth, PII-shaped, free-text and duplicate fields', () => {
  assert.deepEqual(parseAttribution('?ref=br_crew&campaign=launch-1&utm_source=creator'),
    { ref: 'br_crew', campaign: 'launch-1', utm_source: 'creator' });
  assert.deepEqual(parseAttribution('?code=private&access_token=private&email=x%40example.com&ref=x%40example.com&utm_content=private+note&next=https://evil.example'), {});
  assert.deepEqual(parseAttribution('?ref=one&ref=two&campaign=' + 'x'.repeat(65)), {});
});

test('account links have a fixed origin and do not imply account preference synchronization', () => {
  const target = new URL(accountDestination({ locale: 'pt-BR', market: 'BR',
    attribution: { ref: 'crew-1', code: 'private', utm_source: 'https://evil.example' } }));
  assert.equal(target.origin, 'https://app.fofit.app');
  assert.equal(target.pathname, '/onboarding');
  assert.equal(target.searchParams.get('locale'), 'pt-BR');
  assert.equal(target.searchParams.get('market'), 'BR');
  assert.equal(target.searchParams.get('ref'), 'crew-1');
  assert.ok(!target.searchParams.has('code') && !target.searchParams.has('utm_source'));
  assert.ok(!new URL(accountDestination({ locale: 'ja', market: 'ja-JP' })).searchParams.has('market'));
});

test('missing or invalid store links remain unavailable; no unsafe fallback price or destination', () => {
  assert.equal(verifiedStoreDestination('ios', markets.BR), null);
  for (const value of ['https://apps.apple.com.evil.example/app/1', 'javascript:alert(1)', 'http://apps.apple.com/app/1', 'https://user@apps.apple.com/app/1']) {
    assert.equal(verifiedStoreDestination('ios', { storeLinks: { ios: value } }), null);
  }
  assert.equal(verifiedStoreDestination('ios', { storeLinks: { ios: 'https://apps.apple.com/br/app/id123' } }), 'https://apps.apple.com/br/app/id123');
});

test('blocked session storage does not block CTA handoff; links outside onboarding stay unchanged', () => {
  const script = fs.readFileSync(new URL('../localization/browser.mjs', import.meta.url), 'utf8').replace(/^import[^\n]+\n/, '');
  let listener;
  class Element { closest() { return this; } }
  const context = { URL, URLSearchParams, Element, ACCOUNT_ORIGIN: 'https://app.fofit.app',
    accountDestination, localeForPath, parseAttribution, resolveMarket,
    window: { location: { search: '?ref=crew-2&code=private&market=JP', pathname: '/ja/beta' }, addEventListener() {} },
    document: { documentElement: { dataset: { fofitLocale: 'ja' } }, addEventListener: (_type, callback) => { listener = callback; } },
    sessionStorage: { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } },
  };
  vm.runInNewContext(script, context);
  const anchor = new Element(); anchor.href = 'https://app.fofit.app/onboarding';
  listener({ target: anchor });
  assert.equal(new URL(anchor.href).searchParams.get('locale'), 'ja');
  assert.equal(new URL(anchor.href).searchParams.get('market'), 'JP');
  assert.equal(new URL(anchor.href).searchParams.get('ref'), 'crew-2');
  assert.ok(!anchor.href.includes('private'));
  anchor.href = 'https://example.com/onboarding'; listener({ target: anchor });
  assert.equal(anchor.href, 'https://example.com/onboarding');
});
