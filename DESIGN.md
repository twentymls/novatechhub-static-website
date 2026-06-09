---
name: CatalisiLab
description: Dark, two-world identity for a Sicilian digital studio. Deep ink, one Signal Blue, a serif voice.
colors:
  signal-blue: "oklch(0.78 0.15 220)"
  signal-blue-deep: "oklch(0.68 0.17 220)"
  midnight-ink: "oklch(0.16 0.015 255)"
  raised-ink: "oklch(0.19 0.018 255)"
  elevated-ink: "oklch(0.22 0.02 255)"
  warm-white: "oklch(0.97 0.008 85)"
  muted-warm: "oklch(0.78 0.012 85)"
  faint-warm: "oklch(0.58 0.012 85)"
  paper: "oklch(0.965 0.008 85)"
  paper-ink: "oklch(0.18 0.015 255)"
  hairline: "oklch(0.30 0.015 255 / 0.5)"
  hairline-faint: "oklch(0.30 0.015 255 / 0.25)"
typography:
  display:
    fontFamily: "Instrument Serif, serif"
    fontSize: "clamp(3rem, 8vw, 7.25rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Instrument Serif, serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Instrument Serif, serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  pill: "999px"
  input: "12px"
  media: "14px"
  panel: "16px"
  block: "24px"
spacing:
  sm: "12px"
  md: "24px"
  lg: "48px"
  xl: "80px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.pill}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.midnight-ink}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.pill}"
    padding: "16px 24px"
  button-dark:
    backgroundColor: "{colors.paper-ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "18px 28px"
  input:
    backgroundColor: "{colors.raised-ink}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.input}"
    padding: "14px 16px"
  chip:
    textColor: "{colors.muted-warm}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
---

# Design System: CatalisiLab

## 1. Overview

**Creative North Star: "The Quiet Instrument"**

CatalisiLab is a Sicilian digital studio, and its surface behaves like a well-made instrument: precise, dark, and quietly confident, with one source of light. The body is a deep blue-black ink (`oklch(0.16 0.015 255)`); a single Signal Blue (`oklch(0.78 0.15 220)`) is the only chromatic voice, and an Instrument Serif headline carries the warmth. Nothing shouts. Expertise is communicated through restraint, exact geometry, and motion that answers the cursor rather than performing for it.

The system runs as **two worlds**. Most of the page lives in the dark: ink background, warm-white type, hairline borders. Two moments invert to a warm `--paper` (`oklch(0.965 0.008 85)`): the Method section and the closing CTA. That inversion is a deliberate pacing device, the page exhaling into light where the narrative turns from "what we do" to "how we work" and "let's talk." The depth between surfaces is tonal, not shadowed: ink steps up through `raised-ink` to `elevated-ink` on hover, and glow (a soft radial bloom of Signal Blue) is the only ambient light.

This system explicitly rejects the **generic SaaS template** (gradient-and-cards, hero-metric clichés, identical icon-heading-text grids), the **cheap web-agency** look (stock photo collages, clipart icons, loud CTAs, clutter), and **corporate sterility** (blue-suit stock imagery, jargon, no personality). It is precise, but it is a studio of people in Palermo, not an enterprise vendor.

**Key Characteristics:**
- Dark by default; two warm `--paper` sections as deliberate inversions.
- One accent (Signal Blue) and one accent only. Its rarity is the point.
- Serif headlines with italic, blue emphasis words; sans body; mono labels.
- Depth through tonal layering and glow, not drop shadows.
- Motion that responds to the cursor (hover lift, radial bloom, shimmer sweep).

## 2. Colors

A monochrome ink base with one luminous blue and a warm-white text ramp; warmth lives in the type color and the two paper inversions, never in a tinted background.

### Primary
- **Signal Blue** (`oklch(0.78 0.15 220)`): the single accent. Italic emphasis words in headings, the pulsing nav-CTA dot, hover glows on service cells, marquee hover, focus borders on form fields, link hovers, the scroll-progress bar. It marks where to look and where to act.
- **Signal Blue Deep** (`oklch(0.68 0.17 220)`): the accent shifted darker for use on the light `--paper` worlds, where the lighter Signal Blue would lose contrast. Method-section emphasis, CTA emphasis, `btn-dark` hover.

### Neutral (Dark world)
- **Midnight Ink** (`oklch(0.16 0.015 255)`): the body background. A deep blue-black, the room the instrument sits in.
- **Raised Ink** (`oklch(0.19 0.018 255)`): one step up. Services-section panel, form-field backgrounds.
- **Elevated Ink** (`oklch(0.22 0.02 255)`): two steps up. The surface a service cell rises to on hover.
- **Warm White** (`oklch(0.97 0.008 85)`): primary text. Carries a faint warm cast (hue 85) so it reads human, not clinical white.
- **Muted Warm** (`oklch(0.78 0.012 85)`): secondary text. Body copy in ledes, descriptions, nav links, footer links.
- **Faint Warm** (`oklch(0.58 0.012 85)`): tertiary text. Labels, metadata, stat captions, section numbers. The dimmest legible ink.
- **Hairline** (`oklch(0.30 0.015 255 / 0.5)`): structural borders, buttons, eyebrow, service-arrow rings.
- **Hairline Faint** (`oklch(0.30 0.015 255 / 0.25)`): the quietest dividers; grid cell borders, section separators.

### Neutral (Paper world)
- **Paper** (`oklch(0.965 0.008 85)`): the inverted background for Method and CTA. Warm off-white, not white.
- **Paper Ink** (`oklch(0.18 0.015 255)`): text and `btn-dark` background on the paper worlds.

### Named Rules
**The One Light Rule.** Signal Blue is the only chromatic color in the system. There is no secondary brand hue, no success-green, no warning-amber as decoration. Everything else is ink and warm-white. The blue earns its meaning by being the only thing that is colored, so never dilute it by introducing a second accent.

**The Warmth-Without-Tint Rule.** The brand reads warm through the warm-white type ramp (hue 85) and the two paper inversions, never through a tinted background. The dark background stays a cool blue-black. Do not warm the body background to chase "approachable"; warmth is carried by type, paper, and copy.

## 3. Typography

**Display Font:** Instrument Serif (with `serif` fallback)
**Body Font:** Inter (with `-apple-system, sans-serif` fallback)
**Label/Mono Font:** JetBrains Mono (with `monospace` fallback)

**Character:** A high-contrast serif with a literary, slightly old-world voice does the talking; a clean neutral sans handles the reading; a mono marks the technical asides. The pairing is the warmth-and-precision tension of the whole brand: the serif is the human hand, the sans is the clear explanation, the mono is the instrument's gauge. Emphasis words inside headings are set italic and colored Signal Blue, the system's single most recognizable typographic move.

### Hierarchy
- **Display** (Instrument Serif 400, `clamp(3rem, 8vw, 7.25rem)`, line-height 0.92, `-0.035em`): the hero headline only. Tight leading, words rise on load, an italic accent word draws a Signal Blue underline.
- **Headline** (Instrument Serif 400, `clamp(2.25rem, 5vw, 4rem)`, line-height 1, `-0.02em`): section titles (`h2`), the footer brand line, the CTA block.
- **Title** (Instrument Serif 400, `32px`, line-height 1.05, `-0.015em`): service-cell titles, method step names (scales to 36px), blog and article titles.
- **Body** (Inter 400, `16px`, line-height 1.55; prose 1.75): all reading copy. Ledes and descriptions step down to 14–15px in Muted Warm. Cap measure at 52–72ch (ledes 52ch, hero meta 72ch, article prose 720px column).
- **Label** (JetBrains Mono 500, `0.72rem`, `0.05em`, uppercase): section markers (`01 / Servizi`), the hero eyebrow, the marquee label, contact and footer-column labels.

### Named Rules
**The Italic-Accent Rule.** Emphasis inside a heading is expressed by setting the word italic AND coloring it Signal Blue (`h1 em`, `h2 em`, `.svc-title em`). This is the brand's signature. Use it for the one or two words that carry the meaning of a heading, never for a whole phrase, and never on body copy.

**The Mono-Is-a-Label Rule.** JetBrains Mono appears only as small uppercase labels and section markers. It is never used for body copy or headings. Mono is the gauge on the instrument, not the prose.

## 4. Elevation

This system is **flat by tonal layering**, not shadowed. Depth on the dark worlds is built by stepping the background lightness up (`midnight-ink` → `raised-ink` → `elevated-ink`) and by hairline borders, not by drop shadows. The only "shadow" tokens in the system are luminous, not dark: soft radial Signal Blue glows that act as ambient light.

### Glow Vocabulary
- **Hover bloom** (`radial-gradient(600px circle at var(--mx) var(--my), oklch(0.78 0.15 220 / 0.08), transparent)`): a cursor-tracked blue wash that fades in on service cells and the hero. The page's interactive light source.
- **Scroll-progress glow** (`box-shadow: 0 0 12px oklch(0.78 0.15 220 / 0.6)`): the only persistent glow; the 2px top progress bar.
- **Ambient orbs** (`filter: blur(80px)`, opacity ~0.35): two large, slow-drifting Signal Blue / indigo orbs behind content, fixed-position. Atmospheric depth, never interactive.

### Named Rules
**The No-Dark-Shadow Rule.** Surfaces never cast a grey/black drop shadow. If something needs to read as raised, step its background tone up and/or add a hairline border. Light in this system is blue and additive, never a dark box-shadow under a card.

## 5. Components

The component feel is **precise and responsive**: tight geometry, crisp hairline borders, and motion that answers every interaction (hover lift, radial bloom, shimmer sweep, arrow nudge). Confident, never flashy.

### Buttons
- **Shape:** fully rounded pills (`999px`). The only exception is `btn-dark` which is also a pill.
- **Primary:** Warm White background, Midnight Ink text, `16px 24px` padding. On hover the fill becomes Signal Blue and a diagonal light shimmer sweeps across it (`translateX(-120%)` → `120%`); the trailing arrow icon nudges up-right.
- **Secondary:** transparent fill, Warm White text, Hairline border, same padding. On hover the border brightens to full Warm White. Used as the lower-priority action next to Primary.
- **Dark:** Paper Ink background, Paper text, `18px 28px`. Lives only on the warm paper worlds (the CTA block). Hover fills Signal Blue Deep.
- **Nav CTA:** a compact Warm White pill with a pulsing Signal Blue dot and a soft blue glow that blooms behind it on hover. The persistent "Iniziamo" call to action.

### Chips / Tags
- **Style:** small pills, `4px 10px`, Hairline border, Muted Warm text, transparent fill. Service-capability tags and blog category tags.
- **State:** static by default; on a parent service-cell hover the border warms toward Signal Blue at low alpha. Blog filter chips invert to a solid Signal Blue fill when `.active`.

### Cards / Containers
The system deliberately avoids floating cards. The two card-like patterns are:
- **Service cells:** not floating cards but cells in a bordered grid (`repeat(3, 1fr)` with Hairline-Faint dividers, no per-cell radius). On hover the cell lifts (`translateY(-4px)`), its background rises to Elevated Ink, the border warms to Signal Blue at low alpha, and the cursor-tracked bloom fades in. A large serif title sits low; a circular arrow ring in the corner fills Signal Blue and translates up-right.
- **Blog cards:** image-led. A `14px`-radius media frame (`aspect-ratio: 4/3`) with a glassy category tag, then mono metadata, then a serif title. On hover the whole card lifts (`translateY(-6px)`), the image scales subtly, and the title warms to Signal Blue.

### Inputs / Fields
- **Style:** Raised Ink fill, Hairline border, `12px` radius, Warm White text, `14px 16px` padding.
- **Focus:** border shifts to Signal Blue (no glow, no ring beyond the border color change). Checkbox uses `accent-color: Signal Blue`.
- **Labels:** `13px` Muted Warm, above the field. Required fields marked with `*`.

### Navigation
- **Style:** fixed top bar, 72px tall, `backdrop-filter: blur(14px)` over a near-opaque Midnight Ink, Hairline-Faint bottom border.
- **Links:** `14px` Muted Warm, warming to Warm White on hover. The CTA is the pill described above.
- **Mobile:** below 980px the inline links hide behind a circular hamburger toggle that opens a right-side `320px` drawer (Instrument Serif `28px` links) with an overlay scrim sliding in on a `cubic-bezier(0.2, 0.7, 0.2, 1)` curve.

### Marquee (signature component)
A full-width band between the hero and the services, top-and-bottom Hairline-Faint borders, edges masked to transparent. Instrument Serif `28px` capability terms scroll left continuously (`20s linear`), separated by small Signal Blue dots, pausing on hover. A static mono "What we do" label anchors the left edge. It is the brand's most recognizable structural element; treat it as identity, not decoration.

## 6. Do's and Don'ts

### Do:
- **Do** keep Signal Blue (`oklch(0.78 0.15 220)`) as the single accent; switch to Signal Blue Deep (`oklch(0.68 0.17 220)`) only on the warm `--paper` worlds for contrast.
- **Do** express heading emphasis with the Italic-Accent move: italic + Signal Blue on one or two words, never a whole phrase.
- **Do** build depth by stepping background tone (`midnight-ink` → `raised-ink` → `elevated-ink`) and adding hairline borders.
- **Do** use the two `--paper` inversions (Method, CTA) as deliberate pacing beats; don't add a third without a narrative reason.
- **Do** keep body and placeholder text at Muted Warm or brighter on the dark background; reserve Faint Warm (`oklch(0.58 ...)`) for short labels and metadata, never long reading copy.
- **Do** ship every animation with the `prefers-reduced-motion` fallback already in the stylesheet.
- **Do** keep reading measures tight: ledes ~52ch, prose in a 720px column.

### Don't:
- **Don't** introduce a second accent hue, a success-green, or a gradient. One light only (The One Light Rule).
- **Don't** warm the dark background to feel "approachable"; warmth comes from the warm-white type ramp, the paper worlds, and the copy. A warm-tinted near-white body background is the generic-SaaS / cheap-agency move this brand rejects.
- **Don't** add grey or black drop shadows under cards or buttons; light in this system is additive blue glow (The No-Dark-Shadow Rule).
- **Don't** use floating, identical icon-heading-text card grids. The services are bordered grid cells; respect that structure.
- **Don't** set JetBrains Mono on body copy or headings; mono is for small uppercase labels only.
- **Don't** drift toward enterprise/corporate sterility: no blue-suit stock photography, no jargon, no buzzwords (streamline, leverage, seamless, world-class). Plain Italian, concrete outcomes.
- **Don't** set body copy in ALL CAPS; reserve uppercase for the mono labels and section markers.
