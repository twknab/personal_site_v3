# Tasks: How I Build — agentic SDLC methodology section

**Feature**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md) · **Branch**: `tk/agentic-showcase`

Dependency-ordered. T001 blocks everything (the component reads its shape); T002–T004 build the UI; T005–T007 wire and style it; T008–T010 verify.

---

## T001 — Author the content module

**File**: `src/components/main/how-i-build/methodology.js` (new)

Export `stages`, `caseStudies`, `lastRevised` per [contracts/content-module.md](./contracts/content-module.md).

Five stages, matching FR-002: specify before building; one shared instruction set across agents; choosing a model per task; automated review gates; parallel sessions without collision.

Write `detail` prose tool-free (FR-014) — names go in `tools`. Explain each term of art in place (FR-006). Give every process claim an `evidence` link or phrase it so it clearly cites nothing (FR-003).

At least two case studies, at least one describing a defect a manual review would plausibly have missed (FR-005). Candidates, all real and public: fonts silently falling back after the Turbopack migration (PR #95); the Codacy upload that failed green for months (PR #98); the 15 dependency PRs assessed against the lockfile rather than merged (PR #86).

**Done when**: module exports validate against the contract; no tool name appears in any `detail` string.

---

## T002 — Stage component with disclosure

**File**: `src/components/main/HowIBuild.js` (new)

Render `stages` in order. Each: name + summary always visible; `detail`, `tools` chips and `evidence` links inside a react-bootstrap `Collapse`, closed initially.

The control is a real `<button>` (not Reading's `role="button"` div), carrying `aria-expanded` and `aria-controls` pointing at the panel id.

**Done when**: all stages render; each toggles independently; `aria-expanded` tracks state.

**Depends on**: T001

---

## T003 — Optional-field handling

**File**: `src/components/main/HowIBuild.js`

A stage without `tools` renders no chip row. A stage without `evidence` renders no evidence label or list (FR-012).

**Done when**: removing either field from a stage leaves no empty container or orphaned label.

**Depends on**: T002

---

## T004 — Case studies and revision date

**File**: `src/components/main/HowIBuild.js`

Case studies render after the stages (FR-004), each with title, body and link. Section states `lastRevised` (FR-008).

**Depends on**: T002

---

## T005 — Mount in the page

**File**: `src/components/MainContent.js`

Insert `<HowIBuild />` between `<Projects />` and `<RecentlyShipped />`, and add `.how-i-build` to `REVEAL_SECTIONS` so it participates in scroll reveal like its neighbours.

**Depends on**: T002

---

## T006 — Nav anchor

**Files**: `src/components/main/HowIBuild.js`, `src/components/nav/PrimaryNavigation.js`

`<Element name="how-i-build">` in the section; "How I build" entry in the About dropdown calling `handleNavClick("how-i-build")`.

⚠️ Use `name=`, not `nameName=`. That exact typo shipped on the Experience anchor: the prop leaked to the DOM, react-scroll never registered the anchor, the nav item scrolled nowhere, and nothing failed. T009 covers it with a test.

**Depends on**: T005

---

## T007 — Styles

**File**: `src/twkTheme.scss`

Section shell consistent with neighbours; stage rows; chevron rotation on open; tools reusing the `.stack-chip` language; evidence links styled as links, never bare URLs.

**No wrapper div** — the section is `.row` elements, which inherit the 2000px cap. If a wrapper becomes unavoidable it must carry `max-width: 2000px` and auto margins explicitly (`full-bleed-layout` rule).

Controls at least 44px. Honour `prefers-reduced-motion` for the chevron and the collapse animation.

**Depends on**: T002

---

## T008 — Content-shape tests

**File**: `src/components/main/HowIBuild.test.js` (new)

- Every stage's name and summary renders without interaction (SC-008).
- Detail is hidden until its control is activated.
- Activating a control expands that stage and flips `aria-expanded`.
- A stage lacking `tools`/`evidence` renders no empty containers.
- Case studies and the revision date render.

**Depends on**: T004, T003

---

## T009 — Anchor regression test

**File**: `src/components/main/HowIBuild.test.js`

Assert the react-scroll anchor is registered under `how-i-build` — i.e. that no `nameName`-class typo can ship silently. Assert no unknown DOM attribute leaks (React logs a warning; fail on it).

**Depends on**: T006

---

## T010 — Verify and gate

Run `npm run lint`, `npx jest`, `npm run build`. Then drive the running app for the checks a build cannot make, per [quickstart.md](./quickstart.md):

- 375px: no horizontal overflow, 44px controls.
- **2400px: section left edge and width match a neighbouring section exactly** — the wrapper-cap bug is invisible at 1280px.
- Nav item actually scrolls (click it; do not infer from the diff).
- Console clean on load.

**Depends on**: T005, T006, T007, T008, T009
