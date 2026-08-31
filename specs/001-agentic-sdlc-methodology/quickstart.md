# Quickstart: validating the How I Build section

```bash
cd /Users/twknab/Development/tkv3-worktrees/agentic-showcase
npm ci
npm run lint && npx jest && npm run build
npm run dev      # http://localhost:3000
```

## Scenarios

**1. Every stage visible without interacting (SC-008, FR-013)**
Load the page, scroll to the section, do not click. Every stage name and one-line summary is readable; no detail is expanded.

**2. Disclosure works by keyboard (accessibility)**
Tab to a stage control, press Enter, then Space. The panel toggles both times and `aria-expanded` follows it. Verify the control is a real `<button>`.

**3. Evidence resolves (FR-003, SC-002)**
Click each evidence and case-study link. Each opens a public artifact. No bare URLs as labels.

**4. Content-only revision (SC-004, SC-009)**
Edit `methodology.js` only: add a stage, reword a summary, change one tool name. The section reflects all three with no change to `HowIBuild.js` or `twkTheme.scss`.

**5. Optional fields (FR-012)**
Temporarily remove `tools` and `evidence` from one stage. It renders cleanly — no empty chip row, no orphaned "Evidence" label. Revert.

**6. Revision date (FR-008, SC-005)**
The section states when the methodology was last revised, without leaving the section.

**7. Layout at both extremes (FR-009, SC-006, `full-bleed-layout` rule)**
At 375px: no horizontal overflow, text legible, controls at least 44px.
At 2400px: **the section's left edge and width match a neighbouring section exactly.** This is the check that catches the wrapper-cap bug, and it is invisible at 1280px.

```js
const a = document.querySelector('.how-i-build').getBoundingClientRect();
const b = document.querySelector('.projects').getBoundingClientRect();
// a.left === b.left && a.width === b.width
```

**8. Nav anchor (FR-010)**
About → "How I build" scrolls to the section. This is the failure mode that shipped once already via a `nameName=` typo, so confirm it by clicking, not by reading the diff.

**9. Reduced motion**
With `prefers-reduced-motion: reduce`, the disclosure changes state without animating.
