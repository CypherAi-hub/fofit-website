import { SITE_ORIGIN, ACCOUNT_ORIGIN, accountDestination, localeForPath, parseAttribution, resolveMarket } from './policy.mjs';

// The approved React app updates its title on client-side navigation. Keep the
// canonical URL in step without replacing its router or preserving a /beta URL
// after the visitor has returned to the English homepage.
let metadataPath;
function synchronizeRouteMetadata() {
  if (!document.head) return;
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
  if (metadataPath === path || localeForPath(path) !== 'en') return;
  metadataPath = path;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = SITE_ORIGIN + path;
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = canonical.href;
  if (path !== '/beta') document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
}
synchronizeRouteMetadata();
if (document.head && typeof MutationObserver !== 'undefined') {
  new MutationObserver(synchronizeRouteMetadata).observe(document.head, { childList: true, subtree: true, attributes: true });
}
window.addEventListener('popstate', synchronizeRouteMetadata);

// A session-only handoff, not analytics or account preference persistence.
const storageKey = 'fofit:marketing-campaign:v1';
const incoming = parseAttribution(window.location.search);
let attribution = {};
try {
  const stored = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
  attribution = parseAttribution(new URLSearchParams(stored));
} catch { /* Storage can be unavailable; ordinary navigation still works. */ }
attribution = { ...attribution, ...incoming };
try {
  if (Object.keys(attribution).length) sessionStorage.setItem(storageKey, JSON.stringify(attribution));
} catch { /* No consent or storage dependency for account access. */ }

// Only the existing, canonical onboarding destination receives these code fields.
// The destination must separately implement capture; link metadata is not signup proof.
document.addEventListener('click', event => {
  const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!anchor) return;
  let url;
  try { url = new URL(anchor.href); } catch { return; }
  if (url.origin !== ACCOUNT_ORIGIN || url.pathname !== '/onboarding') return;
  const params = new URLSearchParams(window.location.search);
  anchor.href = accountDestination({
    locale: document.documentElement.dataset.fofitLocale || localeForPath(window.location.pathname),
    market: resolveMarket(params.get('market')), attribution,
  });
}, { capture: true });
