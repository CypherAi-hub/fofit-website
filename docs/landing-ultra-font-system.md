# FoFit Landing Ultra Font System

## Current State

`src/styles/tokens.css` currently imports:

```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap");
```

Current font tokens:

```css
--font-body: "Inter", sans-serif;
--font-display: "Space Grotesk", sans-serif;
--font-display-serif: "Instrument Serif", serif;
--font-label-mono: "IBM Plex Mono", monospace;
```

## Target State

Use:

- Body: Geist with Inter fallback
- Display: Geist with Inter fallback, 800/900 weight
- Editorial italic accent: Instrument Serif italic
- Labels/data: IBM Plex Mono

Target import:

```css
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&display=swap");
```

Target tokens:

```css
--font-body: "Geist", "Inter", ui-sans-serif, system-ui, sans-serif;
--font-display: "Geist", "Inter", ui-sans-serif, system-ui, sans-serif;
--font-display-serif: "Instrument Serif", serif;
--font-label-mono: "IBM Plex Mono", ui-monospace, monospace;
```

## Typography Rules

H1:

- Huge
- Tight
- Confident
- Left-aligned
- Max-width controlled
- One serif italic accent word only

Hero target:

```tsx
<h1 className="lp-hero__title">
  Train <em>honestly.</em>
  <span>Cypher remembers the week your plan forgot.</span>
</h1>
```

Hero type target:

- `font-size: clamp(4rem, 11vw, 9.6rem)`
- `line-height: 0.86`
- tight but not broken tracking
- mobile: `clamp(3.1rem, 17vw, 5.2rem)` with `line-height: 0.9`

Important implementation note:

The user supplied `letter-spacing: -0.085em`, but project design rules say not to use negative letter spacing. Use strong weight, tight line-height, and max-widths to get the premium density without negative tracking.

## Section Heading Rules

Section headings:

- Geist display
- `clamp(2.4rem, 5.6vw, 6rem)`
- line-height near `0.94`
- no center alignment by default
- max-width around 860px

Body copy:

- readable contrast
- `line-height: 1.65` to `1.75`
- no tiny gray copy on mobile

Labels:

- IBM Plex Mono
- uppercase
- letter spacing is allowed for labels
- minimum readable size around `0.68rem`

Serif usage:

- one emotional word in hero
- occasional accent word in section heading
- never whole paragraphs

## Fallback Plan

If Geist import causes a visible issue:

1. Revert only the `tokens.css` import and font token change.
2. Keep landing layout/components intact.
3. Fall back to Inter body/display and Instrument Serif accent.
