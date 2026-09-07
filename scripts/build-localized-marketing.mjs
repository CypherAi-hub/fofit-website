import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN, locales, markets, releasePath, releaseAlternates, accountDestination, message } from '../localization/policy.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(process.argv[2]);
const root = path.join(output, 'static');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const bundles = Object.fromEntries(Object.keys(locales).map(locale => [locale,
  JSON.parse(fs.readFileSync(path.join(repo, 'localization/locales', `${locale}.json`), 'utf8'))]));
const english = bundles.en;
const requiredKeys = Object.keys(english);
const coverage = Object.fromEntries(Object.entries(locales).map(([locale, policy]) => {
  const missing = requiredKeys.filter(key => typeof bundles[locale]?.[key] !== 'string' || !bundles[locale][key].trim());
  if (policy.publication === 'published' && missing.length) throw new Error(`Cannot publish incomplete ${locale} release page: ${missing.join(', ')}`);
  if (locale !== 'en' && policy.publication === 'published' && policy.review !== 'approved') throw new Error(`Native-speaker review required before publishing ${locale}`);
  if (locale !== 'en' && requiredKeys.every(key => bundles[locale]?.[key] === english[key])) throw new Error(`Refusing duplicate English locale page: ${locale}`);
  return [locale, { scope: 'release-information', publication: policy.publication,
    nativeSpeakerReview: policy.review, totalKeys: requiredKeys.length, missingKeys: missing }];
}));

function metadata(locale, title, description, pathname, publication, alternates = []) {
  const canonical = `${SITE_ORIGIN}${pathname}`;
  const hreflang = publication === 'published' && alternates.length > 1
    ? alternates.map(item => `<link rel="alternate" hreflang="${escape(item.lang)}" href="${escape(item.href)}">`).join('\n')
      + `\n<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/beta">` : '';
  return `<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<meta name="robots" content="${publication === 'published' ? 'index,follow' : 'noindex,follow'}">
<link rel="canonical" href="${escape(canonical)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="FoFit">
<meta property="og:locale" content="${escape(locales[locale].formatLocale.replaceAll('-', '_'))}">
<meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${escape(canonical)}"><meta property="og:image" content="${SITE_ORIGIN}/og-image.png">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${SITE_ORIGIN}/og-image.png">
${hreflang}`;
}

const indexPath = path.join(root, 'index.html');
const original = fs.readFileSync(indexPath, 'utf8');
const css = original.match(/<link rel="stylesheet"[^>]*href="\/assets\/[^\"]+"[^>]*>/)?.[0];
if (!css) throw new Error('Approved stylesheet missing; localization must reuse the current design');
const fonts = original.match(/<link\s+rel="stylesheet"\s+href="https:\/\/fonts.googleapis.com[\s\S]*?\/>/)?.[0] ?? '';
const sharedHead = `<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#06070A"><link rel="icon" href="/favicon.svg">
${fonts}${css}<link rel="stylesheet" href="/website-fixes.css"><link rel="stylesheet" href="/globalization/site.css">`;
const languageBar = '<nav class="locale-bar" aria-label="Website language"><a href="/languages">Language: English · More languages</a></nav>';
const browserScript = '<script type="module" src="/globalization/browser.mjs"></script>';

function write(relative, content) {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}
write('globalization/policy.mjs', fs.readFileSync(path.join(repo, 'localization/policy.mjs')));
write('globalization/browser.mjs', fs.readFileSync(path.join(repo, 'localization/browser.mjs')));
write('globalization/site.css', `
.locale-bar{padding:1.25rem 1.5rem;text-align:center;border-top:1px solid #72b85b40;font-size:.9rem}
.locale-bar a,.localized-header a,.localized-footer a,.language-list a{color:var(--text);text-decoration:underline;text-underline-offset:.2em}
.localized-header,.localized-footer{max-width:1000px;margin-inline:auto;padding:1.5rem;display:flex;gap:1rem;flex-wrap:wrap;justify-content:space-between}
.localized-footer p{flex-basis:100%;font-size:.85rem;opacity:.8}.localized-release{padding-block-start:3rem;min-height:65vh;overflow-wrap:anywhere}
.localized-release .button{height:auto;min-height:3rem;white-space:normal;text-align:center;max-width:100%}
.translation-preview{border:1px solid #72b85b60;background:#72b85b0c;border-radius:1rem;padding:1rem 1.25rem;margin-block-end:2rem}
.translation-preview p{margin-block:.5rem;font-size:.95rem}.translation-preview strong{color:var(--text)}
.language-list{list-style:none;padding:0;display:grid;gap:1rem}.language-list li{padding:1.2rem;border:1px solid #72b85b40;border-radius:1rem}
.language-list small{display:block;margin-block-start:.4rem;line-height:1.6}.localized-release:lang(ja),.localized-release:lang(ko){word-break:normal;line-break:strict}.localized-release:lang(ko){word-break:keep-all}
`);
const enhancedIndex = original.replace('</head>', '<link rel="stylesheet" href="/globalization/site.css"></head>')
  .replace('</body>', `${languageBar}${browserScript}</body>`);
write('index.html', enhancedIndex);

// English retains the approved React release surface, with correct deep-link metadata.
const betaShell = enhancedIndex.replace(/<title>[\s\S]*?<\/title>/g, '')
  .replace(/<meta\s+(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[\s\S]*?>/g, '')
  .replace('</head>', `${metadata('en', english['meta.title'], english['meta.description'], '/beta', 'published', releaseAlternates())}</head>`);
write('beta/index.html', betaShell);

for (const [locale, policy] of Object.entries(locales)) {
  if (locale === 'en') continue;
  const bundle = bundles[locale];
  const text = key => escape(message(bundle, english, key));
  const content = key => bundle[key]?.trim() ? text(key) : `<span lang="en">${text(key)}</span>`;
  const preview = policy.publication === 'preview' ? `<aside class="translation-preview"><strong>${content('preview.title')}</strong><p>${content('preview.description')}</p></aside>` : '';
  const links = markets.GLOBAL.supportLinks;
  write(`${policy.prefix.slice(1)}/beta/index.html`, `<!doctype html>
<html lang="${policy.tag}" dir="${policy.dir}" data-fofit-locale="${locale}"><head>${sharedHead}
${metadata(locale, message(bundle, english, 'meta.title'), message(bundle, english, 'meta.description'), releasePath(locale), policy.publication, releaseAlternates())}
</head><body><header class="localized-header"><a href="/">${content('nav.home')}</a><a href="/languages">${content('nav.languages')}</a></header>
<main id="main" class="release-page localized-release">${preview}<span class="lp-kicker">${content('release.kicker')}</span>
<h1>${content('release.title')}</h1><p class="release-lede">${content('release.lede')}</p><p>${content('release.account')}</p>
<div class="release-actions"><a class="button button--primary button--lg" href="${escape(accountDestination({ locale }))}">${content('release.accountCta')}</a><a class="button button--ghost" href="${links.support}">${content('release.supportCta')}</a></div>
<p class="release-note">${content('release.availability')}</p><p>${content('release.coverage')}</p></main>
<footer class="localized-footer"><a href="${links.privacy}" hreflang="en">${content('footer.privacy')}</a><a href="${links.terms}" hreflang="en">${content('footer.terms')}</a><p>${content('footer.policyLanguage')}</p></footer>${browserScript}</body></html>`);
  // Static-only previews and production hosting share the same locale-root destination.
  write(`${policy.prefix.slice(1)}/index.html`, `<!doctype html><html lang="${policy.tag}" dir="${policy.dir}"><head><meta charset="UTF-8"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=${releasePath(locale)}"><title>${text('meta.title')}</title></head><body><a href="${releasePath(locale)}">${content('release.title')}</a></body></html>`);
}

write('languages/index.html', `<!doctype html><html lang="en" dir="ltr"><head>${sharedHead}
${metadata('en', 'FoFit — Languages and translation coverage', 'See which FoFit website pages are translated and which are still in preview.', '/languages', 'preview')}
</head><body><header class="localized-header"><a href="/">FoFit home</a></header><main id="main" class="release-page localized-release">
<span class="lp-kicker">LANGUAGES</span><h1>FoFit, in your language.</h1><p>The main website is currently in English. These translations cover release information only and await native-speaker review. They do not announce a market launch or a fully translated app.</p>
<ul class="language-list">${Object.entries(locales).map(([locale, policy]) => `<li><a lang="${policy.tag}" href="${releasePath(locale)}">${escape(policy.name)}</a><small>${locale === 'en' ? 'Current English release information.' : 'Release information · Translation preview.'}</small></li>`).join('')}</ul>
<p>Website language is separate from your account settings. Language and market parameters on an account link are request metadata; they do not confirm that an account preference was saved.</p>
<p>International availability, store links, prices, and local policy requirements must be confirmed before a market launches.</p></main></body></html>`);
write('globalization/coverage.json', JSON.stringify({ schemaVersion: 1, pages: { release: coverage },
  mainWebsite: 'English', accountPreferenceSync: false, attribution: 'session-only link metadata; no conversion events or payouts' }, null, 2));

// Keep recovered Vercel output parity with the repository's ordinary vercel.json.
const configPath = path.join(output, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const routes = [{ src: '^/languages/?$', dest: '/languages/index.html' }, { src: '^/beta/?$', dest: '/beta/index.html' }];
for (const policy of Object.values(locales).filter(item => item.prefix)) {
  routes.push({ src: `^${policy.prefix}/?$`, status: 307, headers: { Location: `${policy.prefix}/beta` } },
    { src: `^${policy.prefix}/beta/?$`, dest: `${policy.prefix}/beta/index.html` });
}
config.routes = [...routes, ...config.routes];
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('Built seven locale policies, six noindex translation previews, language directory, and release metadata.');
