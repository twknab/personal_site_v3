> Mirrors `.cursor/rules/full-bleed-layout.mdc` — keep both files in sync (see the `skills-sync` skill). Description: Only the header and footer run full width; every content section is capped and centered

# Full-bleed layout

**Only the top navigation and the footer are ever full width.** Every content section — hero, skills, stacks, projects, toolkit, experience, education, awards, reading, recently-shipped — is capped and centered, so the page reads as a stack of cards inset from the viewport edges.

## How the cap is applied

Sections are Bootstrap `.row` elements, and `src/twkTheme.scss` gives every `.row` the cap:

```scss
.row {
  max-width: 2000px; // prevent width from going full on large displays
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 50px 25px !important;
}
```

That means a section built from `.row` gets this for free — which is exactly why it's easy to break without noticing.

## The trap

**Introducing a wrapper element around one or more rows drops the cap.** A plain `<div>` has no `max-width`, so if you move a section's background, border, or radius onto that wrapper, the *painted surface* bleeds to the viewport edges while its neighbours stay inset.

This happened to the stacks section: a `.stacks-section` wrapper was added so the mesh gradient could span two rows without banding at the seam, and it shipped without a cap. At 1280px nothing looked wrong — the viewport was narrower than 2000px, so the cap was never engaged. At 2400px the section ran 2370px wide against its neighbours' 2000px: **185px of bleed on each side**.

Any wrapper that carries a visual surface must carry the cap too:

```scss
.some-section-wrapper {
  max-width: 2000px;
  margin-left: auto;
  margin-right: auto;
}
```

## How to verify

`max-width: 2000px` is invisible below 2000px, so a desktop check proves nothing. **Measure at a viewport wider than 2000px** and compare the new section against a known-good neighbour:

```js
const a = document.querySelector('.your-new-section').getBoundingClientRect();
const b = document.querySelector('.projects').getBoundingClientRect();
// left and width must match
```

Also confirm the nav and footer are still the only full-width elements.

## Exceptions

The nav (`#twk-nav`) and footer (`.footer`) are deliberately full-bleed and carry `pl-0 pr-0` for that reason. Nothing else should be. If a design genuinely needs an edge-to-edge band mid-page, raise it before building it — it breaks the card rhythm the whole page is built on.
