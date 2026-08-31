# Phase 0 Research: How I Build section

Decisions taken where the repository's existing conventions gave a clear answer. Genuine alternatives are in [plan.md](./plan.md#design-decisions).

## Content lives in a sibling data module

**Decision**: `src/components/main/how-i-build/methodology.js`, exporting `stages`, `caseStudies`, and `lastRevised`.

**Rationale**: FR-007 requires content editable without touching presentation. The repo already does exactly this three times — `skills/skillsList.js`, `experience/experienceList.js`, `reading/readingList.js` — so this is the established shape, not a new idea.

**Alternatives**: MDX or a CMS. Both add dependencies and a build step for content that one person edits, and the site has no backend by design.

## Disclosure reuses react-bootstrap Collapse

**Decision**: `Collapse` from react-bootstrap, driven by per-stage `useState`.

**Rationale**: The Reading section already uses it for the same job. Reusing it means both disclosures on the page animate identically and no new dependency appears.

**Alternatives**: native `<details>` (simpler, works without JS) — see plan.md, this was a real trade decided on consistency.

## Tools render as chips

**Decision**: Reuse the `.stack-chip` visual language from the Stacks section for each stage's tool list.

**Rationale**: FR-014 puts tool names in their own field; chips are already the site's vocabulary for "a named technology". Visual consistency for free, and it visually reinforces that the names are data, separable from the prose.

## Anchor wiring gets a test

**Decision**: `<Element name="how-i-build">` plus a nav dropdown entry, with a test asserting the anchor is registered.

**Rationale**: A `nameName=` typo silently broke the Experience nav item and shipped — the prop leaked to the DOM, react-scroll never registered the anchor, and nothing failed. The class of bug is invisible to review and to the build, so it needs a test.

## Revision date is authored, not derived

**Decision**: `lastRevised` is a hand-maintained string in the content module.

**Rationale**: Recorded as an assumption in the spec. A derived date (git mtime, build time) changes on unrelated edits and would overstate freshness — the opposite of the honesty the section is for.

## No new dependencies

**Decision**: Build entirely from react-bootstrap, react-icons and react-scroll, all already installed.

**Rationale**: Three CI gates (npm audit, Dependency Review, Codacy) are blocking. A new package is supply-chain risk and review burden for a static content section that needs none.
