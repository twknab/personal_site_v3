# Implementation Plan: How I Build — agentic SDLC methodology section

**Branch**: `tk/agentic-showcase` | **Date**: 2026-08-13 | **Spec**: [spec.md](./spec.md)

## Summary

Add a `HowIBuild` section between Projects and the Recently Shipped strip. It renders an ordered list of methodology stages from a data module: each stage always shows its name and a one-line summary, with the full explanation, tool chips and evidence links revealed on demand. Supporting case studies follow the stages. All reader-facing copy — stages, examples, and the "last revised" date — lives in one content module so the methodology can be revised without touching presentation.

Everything reuses patterns already in the repo: the Reading section's `Collapse` disclosure, the Stacks section's chip language for tools, the sibling data-module convention, and the standard `.row` section shell.

## Technical Context

**Language/Version**: JavaScript (ES modules), React 19, Next.js 16 App Router
**Primary Dependencies**: react-bootstrap 2.x (Collapse, Row, Col), react-icons v5, react-scroll (anchors), Sass
**Storage**: None — static content module, prerendered at build
**Testing**: Jest + React Testing Library (`next/jest`)
**Target Platform**: Static site on Netlify; viewports from 320px to >2000px
**Project Type**: Single frontend project
**Performance Goals**: No measurable change to page weight beyond the content itself; no new runtime dependencies
**Constraints**: No backend, no stored state, no new npm packages; must pass lint/test/build plus blocking npm audit, Dependency Review and Codacy
**Scale/Scope**: One section component, one data module, one nav entry, one test file

## Constitution Check

This repo has no `.specify/memory/constitution.md` by deliberate choice. Its standing constraints live as mirrored rules in `.claude/rules/` ↔ `.cursor/rules/`, which this plan is checked against instead:

| Rule | Status | Notes |
|------|--------|-------|
| `full-bleed-layout` | **PASS** | The section is composed of `.row` elements, which inherit `max-width: 2000px` and auto margins. **No wrapper div is introduced.** If one ever becomes necessary it must carry the cap explicitly — this is precisely the trap that shipped a 185px bleed in the stacks section, invisible below 2000px. |
| `skills-sync` | **N/A** | No skills or rules change in this feature. |
| `parallel-sessions` | **PASS** | Work happens in the dedicated `tk/agentic-showcase` worktree; stage explicit paths, never `git add -A`. |

## Project Structure

### Documentation (this feature)

```
specs/001-agentic-sdlc-methodology/
├── spec.md
├── plan.md              # this file
├── research.md          # Phase 0 decisions
├── data-model.md        # Phase 1 entities
├── quickstart.md        # Phase 1 validation guide
├── contracts/
│   └── content-module.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```
src/
├── components/
│   ├── MainContent.js                       # MODIFIED: mount <HowIBuild />, extend REVEAL_SECTIONS
│   ├── main/
│   │   ├── HowIBuild.js                     # NEW: section component
│   │   ├── HowIBuild.test.js                # NEW: RTL tests
│   │   └── how-i-build/
│   │       └── methodology.js               # NEW: all reader-facing content
│   └── nav/
│       └── PrimaryNavigation.js             # MODIFIED: "How I build" dropdown entry
└── twkTheme.scss                            # MODIFIED: section + stage + chip styles
```

## Design decisions

Decisions where the repo's conventions gave an obvious answer are recorded in [research.md](./research.md). The three genuine alternatives, called out explicitly:

1. **Disclosure mechanism** — native `<details>`/`<summary>` vs react-bootstrap `Collapse`. Chose `Collapse`, matching the Reading section, so the two disclosures on the page behave and animate identically. `<details>` would be simpler and would work without JavaScript; the consistency argument won, but this is a real trade and would be a reasonable thing to revisit if the page ever needs to work JS-free.

2. **Default state** — all stages collapsed vs the first stage pre-opened. Chose **all collapsed**. FR-013 requires the whole methodology be visible as summaries; pre-opening one makes the default view uneven and pushes the later stages down for no gain.

3. **Disclosure control markup** — copy Reading's `role="button"` div, or use a real `<button>`. Chose a real `<button>`. Reading's version reimplements Enter/Space handling by hand, which a button gets for free along with correct semantics. This is a deliberate, small divergence from the existing pattern — an improvement, not an inconsistency, and worth folding back into Reading later.

## Complexity Tracking

No constitution gates are violated and no complexity justification is required. The feature adds no dependencies, no routes, no state beyond per-stage open/closed booleans, and no build steps.
