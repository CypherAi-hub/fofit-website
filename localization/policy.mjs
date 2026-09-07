/** Website editorial policy; these values do not enable app features or billing. */
export const SITE_ORIGIN = 'https://www.fofit.app';
export const ACCOUNT_ORIGIN = 'https://app.fofit.app';
/** @typedef {'en'|'es'|'pt-BR'|'fr'|'de'|'ja'|'ko'} Locale */
/** @typedef {'published'|'preview'} Publication */
export const locales = Object.freeze({
  en: { tag: 'en', formatLocale: 'en-US', name: 'English', prefix: '', dir: 'ltr', publication: 'published', review: 'canonical' },
  es: { tag: 'es', formatLocale: 'es-ES', name: 'Español', prefix: '/es', dir: 'ltr', publication: 'preview', review: 'required' },
  'pt-BR': { tag: 'pt-BR', formatLocale: 'pt-BR', name: 'Português (Brasil)', prefix: '/pt-br', dir: 'ltr', publication: 'preview', review: 'required' },
  fr: { tag: 'fr', formatLocale: 'fr-FR', name: 'Français', prefix: '/fr', dir: 'ltr', publication: 'preview', review: 'required' },
  de: { tag: 'de', formatLocale: 'de-DE', name: 'Deutsch', prefix: '/de', dir: 'ltr', publication: 'preview', review: 'required' },
  ja: { tag: 'ja', formatLocale: 'ja-JP', name: '日本語', prefix: '/ja', dir: 'ltr', publication: 'preview', review: 'required' },
  ko: { tag: 'ko', formatLocale: 'ko-KR', name: '한국어', prefix: '/ko', dir: 'ltr', publication: 'preview', review: 'required' },
});

export const releasePage = Object.freeze({
  id: 'release', englishPath: '/beta',
  // A locale is not published just because a translation file exists.
  translatedLocales: Object.freeze(Object.keys(locales)),
});

export function resolveLocale(value) {
  if (typeof value !== 'string' || value.length > 40) return 'en';
  let normalized;
  try { normalized = Intl.getCanonicalLocales(value.replaceAll('_', '-'))[0]; }
  catch { return 'en'; }
  if (!normalized) return 'en';
  if (/^pt-BR(?:-|$)/i.test(normalized)) return 'pt-BR';
  // Portuguese outside Brazil is not silently advertised as a translated locale.
  const language = normalized.split('-')[0];
  return Object.hasOwn(locales, language) ? language : 'en';
}

export function localeForPath(pathname) {
  const prefix = pathname.split('/')[1]?.toLowerCase();
  return Object.keys(locales).find(key => locales[key].prefix === `/${prefix}`) ?? 'en';
}

export function releasePath(locale) {
  return `${locales[resolveLocale(locale)].prefix}${releasePage.englishPath}`;
}

export function releaseAlternates(policy = locales, translated = releasePage.translatedLocales) {
  return translated.filter(key => policy[key]?.publication === 'published' &&
    (key === 'en' || policy[key].review === 'approved')).map(key => ({
    lang: policy[key].tag, href: `${SITE_ORIGIN}${policy[key].prefix}${releasePage.englishPath}`,
  }));
}

const existingLinks = Object.freeze({
  support: `${SITE_ORIGIN}/support`, privacy: `${SITE_ORIGIN}/privacy`,
  terms: `${SITE_ORIGIN}/terms`, deleteAccount: `${SITE_ORIGIN}/delete-account`,
});

function market(code, defaultLocale, units, stage = 'planned') {
  return Object.freeze({
    code, defaultLocale, units, stage,
    // Null means unconfigured, never a generated price or a promised entitlement.
    storeLinks: Object.freeze({ ios: null, android: null }), pricing: null,
    supportLinks: existingLinks, policyLanguage: 'en', legalReview: 'not-assessed',
    featuredSport: null, creator: null, testimonials: Object.freeze([]), campaign: null,
  });
}

export const markets = Object.freeze({
  GLOBAL: market('GLOBAL', 'en', 'metric', 'unconfirmed'),
  US: market('US', 'en', 'imperial', 'pre-release'),
  CA: market('CA', 'en', 'metric'), GB: market('GB', 'en', 'metric'),
  AU: market('AU', 'en', 'metric'), BR: market('BR', 'pt-BR', 'metric'),
  MX: market('MX', 'es', 'metric'), FR: market('FR', 'fr', 'metric'),
  DE: market('DE', 'de', 'metric'), JP: market('JP', 'ja', 'metric'),
  KR: market('KR', 'ko', 'metric'),
});

export function resolveMarket(value) {
  const code = typeof value === 'string' ? value.toUpperCase() : '';
  return Object.hasOwn(markets, code) ? code : 'GLOBAL';
}
export function getMarketConfig(value) { return markets[resolveMarket(value)]; }

/** Campaign codes only: no free-text, auth codes, email, URL or hash forwarding. */
export function parseAttribution(search) {
  const incoming = new URLSearchParams(search);
  const result = {};
  for (const key of ['ref', 'creator', 'campaign', 'utm_source', 'utm_medium', 'utm_campaign']) {
    const values = incoming.getAll(key);
    if (values.length === 1 && /^[a-z0-9][a-z0-9_-]{0,63}$/i.test(values[0])) result[key] = values[0];
  }
  return result;
}

export function accountDestination({ locale = 'en', market: marketValue, attribution = {} } = {}) {
  const url = new URL('/onboarding', ACCOUNT_ORIGIN);
  url.searchParams.set('locale', resolveLocale(locale));
  const code = resolveMarket(marketValue);
  if (code !== 'GLOBAL') url.searchParams.set('market', code);
  for (const [key, value] of Object.entries(parseAttribution(new URLSearchParams(attribution)))) {
    url.searchParams.set(key, value);
  }
  return url.href;
}

export function verifiedStoreDestination(platform, config) {
  const value = config?.storeLinks?.[platform];
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    const host = platform === 'ios' ? 'apps.apple.com' : platform === 'android' ? 'play.google.com' : null;
    return url.protocol === 'https:' && url.hostname === host && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

/** Missing/empty translations fall back to canonical English, never a blank CTA. */
export function message(bundle, english, key) {
  return typeof bundle?.[key] === 'string' && bundle[key].trim() ? bundle[key] : english[key] ?? key;
}
