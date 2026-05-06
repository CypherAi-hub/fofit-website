# FoFit Landing Ultra Motion System

## Motion Principles

Motion should make FoFit feel alive, not busy.

Use motion for:

- Revealing section hierarchy
- Making the product cockpit feel tangible
- Drawing attention to product state changes
- Quiet trust/proof rhythm

Do not use:

- Scroll-jacking
- Heavy animation libraries
- Framer Motion
- GSAP
- Motion-only meaning
- Distracting parallax

## Implementation Pieces

Add:

- `src/lib/useInView.ts`
- `src/components/motion/Revealer.tsx`
- `src/lib/usePointerGlow.ts` only if the card hover glow stays clean and type-safe
- `lp-reveal` classes in `utilities.css`
- Landing keyframes in `global.css`

## Reveal API

`useInView` observes once and disconnects after visibility. Default behavior:

- `threshold: 0.18`
- `rootMargin: "0px 0px -8% 0px"`

`Revealer` renders:

- `lp-reveal`
- delay class `lp-reveal--delay-0` through `lp-reveal--delay-3`
- `is-visible` once in view

## CSS Reveal Contract

Default state:

- `opacity: 0`
- `transform: translateY(24px)`
- transition: 720ms cubic-bezier(.16, 1, .3, 1)

Visible state:

- `opacity: 1`
- `transform: translateY(0)`

Reduced motion:

- no transform
- no transition
- always visible

## Hero Motion

Hero motion may include:

- Quiet ambient gradient drift
- Floating phone/cockpit motion
- Floating memory cards
- Subtle live state/pulse

Hero motion must not include:

- Rapid loops
- Flickering
- Scroll-tied transforms
- Dependence on the video being loaded

## Card Interaction

Landing cards can use:

- `transform: translateY(-4px)` on hover
- border/accent shift
- optional pointer glow via CSS variables `--mx` and `--my`

Cards must retain:

- focus-visible outline
- readable contrast
- stable dimensions
- reduced-motion fallback

## Ticker Motion

Use a subtle ticker only as proof/trust rhythm.

Rules:

- Slow linear motion, about 28s
- Stop/wrap in reduced motion
- Do not put key product meaning only in the moving ticker

## Verification

Check:

- `prefers-reduced-motion: reduce` shows all content and disables floating/ticker/reveal animation.
- No layout shifts when reveals occur.
- No horizontal scroll on mobile.
- Hero remains compelling with video hidden.
