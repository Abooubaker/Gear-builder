# GearDXF design directions

## Approach 1 — Drafting Room Blue

**Very Brief Intro:** A tactile engineering workspace that feels pulled from a shop notebook: cobalt paper, wax-pencil marks, loose annotations, and confident technical labels. It keeps the tool practical while making every control feel drawn by hand.

**Probability:** 0.03

## Approach 2 — Archive Cardboard

**Very Brief Intro:** A warm analog archive aesthetic built from cream paper, graphite, stamped labels, and filing-card layouts. It would make the app feel like a friendly workshop catalog rather than a CAD tool.

**Probability:** 0.07

## Approach 3 — Signal Grid

**Very Brief Intro:** A restrained dark instrument-panel direction with electric cyan traces and focused status readouts. It would prioritize a precise, modern operator feel with a little visual energy.

**Probability:** 0.01

# Chosen approach — Drafting Room Blue

## Design Movement

The interface follows **technical sketchbook modernism**: the clarity of a drafting table translated into a browser tool, with visible construction lines and imperfect ink texture instead of sterile software chrome.

## Core Principles

1. **One permanent visual mode.** The entire app is a blue-print sheet; there are no light/dark theme toggles to interrupt the identity.
2. **Hand-drawn, not sloppy.** Borders, underlines, arrows, and annotations have a slight wobble, but spacing and hierarchy remain disciplined.
3. **Tools stay close to the drawing.** Measurement feedback and drawing controls live in the same visual field as the geometry, minimizing context switching.
4. **Useful blue contrast.** The palette uses a deep blueprint blue for the field, ink-blue for drafting lines, and pale cyan paper marks for readable emphasis.

## Color Philosophy

The background is a saturated blueprint blue that creates the feeling of a working plan pinned under a lamp. Lines use a quieter, darker blue so the drawing reads as ink rather than neon. Paper-blue labels and small white-blue highlights provide hierarchy without breaking the monochrome drafting illusion. The signature color is **Blueprint Cobalt #0b4f9c**.

## Layout Paradigm

Use a wide drafting-table composition: a slim top rail for identity and mode, a left utility column for tools and hints, and a large open canvas on the right. On narrow screens the columns collapse into a top tool strip while the canvas keeps priority. Avoid a centered marketing-card stack; the main drawing surface should feel expansive and in-use.

## Signature Elements

The interface repeats a faint graph-paper field, doubled hand-ink borders around major panels, and small handwritten callouts with leader lines. Measurement results appear as a pinned annotation card instead of a generic toast.

## Interaction Philosophy

Every action should feel like marking the sheet: selecting a tool changes its ink weight, clicking the canvas places a visible point, and the measurement line remains until the user clears it. Buttons acknowledge input with a short ink-press motion rather than a glossy glow.

## Animation

Keep motion subtle and physical. Panels fade and slide by 180ms when entering. Tool buttons depress 100–140ms on activation. The measurement line draws from its first endpoint to the second with a short stroke animation, and the result card lifts in by 180ms. Respect reduced-motion settings by disabling stroke and entrance animation while preserving state changes.

## Typography System

Use **Caveat** for headings, labels, annotations, and tool names to provide the handwritten voice. Use **IBM Plex Mono** for dimensions, coordinates, and technical values so numbers remain unambiguous. Headings are bold Caveat with compact line-height; supporting copy is regular Caveat; measurements are medium IBM Plex Mono with generous tracking.

## Brand Essence

GearDXF is a practical browser drafting bench for makers and gear designers who want quick, visual DXF work without a heavy CAD setup. Personality: **observant, workshop-minded, direct**.

## Brand Voice

Headlines sound like notes written beside a drawing, not generic SaaS slogans. CTAs are specific and action-led; microcopy explains what the sheet is waiting for.

Example lines:

> Measure the part, not the menu.

> Pick two points. The sheet does the math.

## Wordmark & Logo

Use the user-provided `abobaker.webp` mark as the recognizable brand stamp in the header, placed inside a hand-inked square so it feels like a maker’s seal. Pair it with the custom text lockup “GearDXF / drafting bench” in Caveat rather than relying on a default wordmark treatment.

## Signature Brand Color

**Blueprint Cobalt — #0b4f9c.** It is dark enough to carry the interface, vivid enough to make the paper-blue lines legible, and distinctive without drifting into a neon or gradient aesthetic.
