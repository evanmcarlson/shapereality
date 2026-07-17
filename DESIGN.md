# DESIGN.md — shapereality.com visual system

Extracted from https://www.karocrafts.com/ (evidence: `../.blueprint-extractor/karocrafts/`).
Inspired-by blueprint, not a clone: transfer the typographic confidence, mono-plus-one-accent
palette logic, and bracket/underline motifs onto Shape Reality's own domain — a body-tracked
webAR studio with chrome/refraction as its material language. Full-page visuals of the source
were only partially captured (loader state); layout notes beyond the loader are qualitative,
inferred from CSS.

## 1. Visual Theme & Atmosphere

Bold-minimal editorial: a white (or black) field, one typeface used with total conviction at
two extreme scales — enormous display headlines and small, tight utility labels — with a single
electric accent doing all the emotional work. The source gates entry behind a full-screen loader
(centered mark, bracketed captions, a thin cobalt progress bar): the page treats itself as a
performance that begins deliberately. Generous whitespace, near-zero chrome, no cards, no
shadows — hierarchy comes from scale contrast and placement, not surfaces. For Shape Reality:
keep this restraint as the _ground_ so the 3D/AR layer (chrome, glass, refraction) is the only
"rich" material on the page — UI disappears, the work is the color.

## 2. Color Palette & Roles

Extracted (CSS variables):

- `--color-black: #000` — primary ink / dark ground
- `--color-white: #fff` — primary ground / light ink
- `--color-grey: silver` + neutrals `#D5D5D5`, `#E8E8E8`, `#F4F6FA` — hairlines, muted labels, wash panels
- `--color-blue: #0012ff` — the single electric accent (observed live on the loader progress bar)
- `#0000004d` — 30% black scrim

Roles for Shape Reality: black + white are the brand; neutrals are structure; the accent is a
SLOT, not a color — one bold pop per context (cobalt `#0012ff`-class blue, or a neon
green/yellow), never two accents in the same view. The accent marks _live/interactive/AR_
moments only: progress, hover reveals, one hero word, a recording dot. Everything else stays
achromatic so video/3D content reads as the color.

## 3. Typography Rules

Extracted:

- Body/display: self-hosted **Helvetica** woff2, weights 400/700 (weight vars 300–700 defined).
- Secondary display face: **Nautica** (`--font-secondary`) — a single expressive face used sparingly.
- **Fluid viewport type** in `svw` units — the scale IS the layout:
  - display `--text-l: 15.38svw` (oversized, multi-line hero words)
  - CTA XL `1.85svw` landscape / `8.2svw` portrait
  - CTA M `1.15svw` / `5.12svw` · big paragraph `1.73svw` / `4.61svw` · details `.92svw` / `3.58svw`
- Letter-spacing `.01em`; display line-heights **0.65–0.9** (dramatically tight, stacked lines
  almost touching); body 1.2–1.5. Both `uppercase` and `lowercase` transforms used deliberately.

For Shape Reality: license/keep one neutral grotesk (Helvetica-class; current site uses Geist —
acceptable substitute) + optionally one display face for a single hero moment. Compose headlines
as stacked, tight (leading ~0.8), oversized (10–15svw) words; utility text small, uppercase,
tracked slightly. Never mid-size headlines — the system is extremes or nothing.

## 4. Component Stylings

- **Bracketed labels** (`.with-brackets`): `[ ` and ` ]` pseudo-elements around small caps
  labels, with a `--x-translate` var animating bracket spread. Use for meta labels: `[ REALITY
ENGINE ]`, `[ BODY-TRACKED ]`, `[ EST. SF ]`-class captions.
- **Growing underline** (`.pseudo-underline`): 1px bottom border animating `width: 0% → 100%`
  via `--border-width` — the hover language for nav/links. Quiet, no color change needed.
- **Radii**: mostly square (0); pills at `28px/50px/80px` for buttons/chips; `50%` for dots.
- **Loader as ritual**: full-screen ground, centered mark, bracket captions, bold uppercase
  status word, thin accent progress bar pinned to an edge (extracted from live loader). For SR:
  same ritual but the mark is chrome/glass (a refracting star or the Anomaly ribbon).
- Buttons: type-first — uppercase label + brackets or pill outline; accent fill only for the one
  primary CTA per page ("START A PROJECT").

## 5. Layout Principles

Extracted grid: `--grid-margin: 20px`, `--grid-gutter: 20px` (split 10px), content width
`100svw − 40px`. One column of full-bleed moments; type sits ON the media, not beside it.
Qualitative (CSS-inferred): sections are viewport-scaled slabs — hero words at 15svw span the
full width; media blocks run edge-to-edge inside the 20px frame. For SR: every filter/video
showcase is a full-width slab with a bracketed caption and one line of copy; the 20px frame is
constant on all viewports.

## 6. Depth & Elevation

No shadows or layered cards in the extracted CSS — flatness is the rule; the only "depth" is a
30% black scrim over media and z-stacked type-on-video. For Shape Reality this is the key
transfer: reserve ALL depth cues for the AR material itself (refraction, chrome reflections,
occlusion in the videos). The UI stays paper-flat so the 3D reads as the only real object.

## 7. Do's and Don'ts

- DO keep exactly one accent color per view; rotate the accent between contexts, never mix.
- DO use `svw`-fluid type + orientation (not width) breakpoints — genuinely mobile-first.
- DO stack display lines at ≤0.9 leading; let words collide with media edges.
- DON'T import the source's domain (artist portfolio, smiley monogram, product categories).
- DON'T add gradients, glassmorphism panels, or soft shadows to UI — refraction belongs to the
  3D content, not to divs. (This retires the old four-stop holographic gradient.)
- DON'T use mid-scale type or multi-color icon sets; utility text is small, mono-spaced feel, caps.
- DON'T gate the whole site behind a long loader — keep the ritual under ~1.5s or scroll-reveal it.

## 8. Responsive Behavior

Extracted strategy: **orientation media queries** (`@media(orientation:landscape)`) with a
portrait-first token set (portrait values are 3–4.5× larger in svw), plus `@media(pointer:fine)`
gating hover effects. Transfer as-is: portrait defines the design; landscape re-maps the same
tokens; hover (underline grow, bracket spread) only on fine pointers — touch gets tap states.
Videos: portrait 9:16 masters (the filters are shot portrait) shown full-bleed on mobile,
letterboxed into slabs on desktop.

## 9. Agent Prompt Guide

Quick reference: ground `#fff`/`#000`, neutrals `#E8E8E8/#D5D5D5/#F4F6FA`, accent slot
`#0012ff` (or per-context neon), type Helvetica-class 400/700, display 10–15svw @ 0.8 leading
uppercase, labels ~0.9–1.2svw caps in `[ brackets ]`, 20px outer frame, underline-grow hovers,
flat UI + refractive 3D content only.

Example prompts:

- "Hero: white ground, SHAPE REALITY stacked at 14svw, leading 0.8, uppercase; behind the
  wordmark a portrait video slab of the Crystal filter; caption `[ BODY-TRACKED WEBAR ]` top-left;
  one cobalt underline-grow link 'START A PROJECT' bottom-right; 20px frame throughout."
- "Filter carousel: full-bleed portrait video slabs, scroll-snapped; each slab gets a bracketed
  index `[ 03 / 08 ]`, filter name at 6svw, one-line description at 1.2svw caps; no cards, no
  shadows; accent only on the active-slab progress tick."
- Iterate by adjusting scale contrast first (bigger display / smaller labels), accent quantity
  second (less), and never by adding surfaces.
