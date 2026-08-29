# Feature Specification: How I Build — agentic SDLC methodology section

**Feature Branch**: `tk/agentic-showcase`

**Created**: 2026-08-13

**Status**: Draft

**Input**: Issue #103 — a methodology section for timknab.dev documenting the author's agentic software development practice. **Scope revised 2026-08-29**: the section describes the practice as a whole, across professional and personal work, rather than only what was used to build this site.

## Overview

The site currently asserts "AI applications" and "AI-SDLC" in a skills grid. Those are claims, and every résumé now carries similar ones, so they carry no weight on their own. Meanwhile the evidence of how the site is genuinely built — written specifications, the reasoning recorded in commits, the review gates every change passes, the merged pull requests — sits unused in the repository's own history.

This feature adds a section that explains that methodology stage by stage, in plain language. The methodology is the subject; real pull requests appear beneath it as supporting evidence.

**Scope revision (2026-08-29).** The first draft described only how this site is built. That undersold the point: this portfolio is a nearly-static site, and the practice it demonstrates is much smaller than the practice the author actually runs. The section now documents the whole practice — scheduled routines that handle work coordination, sessions started from a phone in the field, agents reaching ticketing and review systems directly — with this repository as one visible instance rather than the whole subject. The purpose is career visibility.

This creates a two-tier evidence situation that the section must handle honestly: work done in this public repository can be linked; professional practice cannot. See FR-003.

The methodology is expected to change substantially over the coming months and years. The section is therefore specified as a **living document**: its content is data, editable without touching presentation, and it tells the reader when it was last revised.

## Clarifications

### Session 2026-08-13

- Q: How much of the methodology is visible at once? → A: Option B — every stage's title and one-line summary always visible, full detail expands per stage on demand.
- Q: Does reader-facing content name specific tools (agent, editor, model, spec framework), or stay tool-agnostic? → A: Name them, but confine names to a dedicated per-stage field rather than weaving them through the prose.
- Q: Where does the section sit in the page order? → A: After Projects and before the existing activity strip.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A hiring manager verifies a claim (Priority: P1)

A hiring manager or engineering leader is evaluating the author. They have read "AI-SDLC" on dozens of résumés and discount it by default. They reach this section, read it end to end in a few minutes without having used an AI coding agent themselves, and come away able to describe how the author actually works — and able to click through to real, public evidence for the parts that matter.

**Why this priority**: This is the audience the site exists to persuade, and the reason the section is worth building at all. If only this story ships, the feature already delivers its core value.

**Independent Test**: Give the section to someone who has never used an AI coding agent, ask them to summarize the workflow in their own words, and ask them to find evidence for one stage. Both must succeed without assistance.

**Acceptance Scenarios**:

1. **Given** a reader unfamiliar with AI coding agents, **When** they read the section top to bottom, **Then** they can describe the workflow's stages in their own words without needing to look up terminology.
2. **Given** a reader who is sceptical of a stated claim, **When** they look for support for it, **Then** every factual claim about the process links to a publicly viewable artifact.
3. **Given** a reader on a phone, **When** they read the section, **Then** the content is legible and no horizontal scrolling occurs.

---

### User Story 2 - A practising engineer evaluates the workflow (Priority: P2)

An engineer who already uses AI coding tools reads the section to understand what this workflow does differently and whether any of it is worth adopting. They need specifics — what is actually automated, what is enforced, what failed and had to be fixed — not a list of product names.

**Why this priority**: This audience is a stated target and is the harshest judge of credibility. Satisfying them is what stops the section reading as marketing, but the section still delivers value without this depth.

**Independent Test**: Ask a practising engineer whether they could reproduce any single stage of the workflow from the description alone. At least one stage must be concrete enough to answer yes.

**Acceptance Scenarios**:

1. **Given** an engineer reading a stage, **When** they finish it, **Then** they understand what problem that stage solves and what it costs, not just which tool performs it.
2. **Given** an engineer looking for substance, **When** they read the supporting evidence, **Then** at least one example describes a real problem the process caught that a manual review would plausibly have missed.

---

### User Story 3 - The author revises the methodology (Priority: P3)

Six months later the workflow has changed: a stage is obsolete, a new one matters, a tool has been replaced. The author updates the section by editing content alone, without touching layout or styling, and the page reflects the new revision date.

**Why this priority**: The methodology will change faster than most site content. If revising it is expensive, it will go stale, and a stale account of a fast-moving practice is worse than no account. This story protects the feature's value over time rather than at launch.

**Independent Test**: Add a stage, reword another, and remove a third by editing only content. The section must render correctly with no changes to presentation code.

**Acceptance Scenarios**:

1. **Given** a new stage to document, **When** the author adds it to the content source, **Then** it appears correctly styled with no presentation changes.
2. **Given** a revision, **When** the content is updated, **Then** the reader can see when the methodology was last revised.

---

### Edge Cases

- **A linked artifact disappears or is made private.** The repository is public today; if that changes, or a pull request is deleted, links break. The section must degrade to still-readable prose rather than dead-end the reader.
- **A stage has no public evidence yet.** Not every claim will have a linked artifact. The section must accommodate a stage that stands on description alone, without implying evidence exists.
- **The reader has no context for a term.** Terms like "specification-first" or "review gate" mean nothing to a non-practitioner. Each must be explained in place rather than assumed.
- **The methodology contradicts itself over time.** An older linked example may show a workflow that has since changed. The revision date and framing must make clear the section describes current practice, and examples are historical.
- **Content grows unbounded.** Stages and examples accumulate. Resolved by FR-013: because only a title and one-line summary show by default, each added stage costs one line rather than a screenful.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The section MUST present the methodology as an ordered sequence of stages, each explaining what it is, what problem it solves, and why it is worth its cost.
- **FR-002**: The section MUST cover, at minimum: writing a specification before implementation; standing rules committed alongside the code; two different agent tools kept behaviourally identical; selecting a model per task as a capability-versus-cost tradeoff; agents connected directly to the systems where work is tracked and reviewed; work initiated while away from a desk, both on a schedule and from a phone; running multiple agent sessions in parallel without collision; and automated review gates every change must pass before merge.
- **FR-015**: The section MUST make clear that the practice described spans work beyond this repository, so a reader does not mistake a nearly-static portfolio for the whole of it.
- **FR-003**: **Revised 2026-08-29.** Per-claim evidence links are removed. The section describes the practice; it does not litigate it. Prose MUST NOT imply artifacts exist where they do not, but no stage is required to cite one.
- **FR-016**: The section MUST establish that the author's role is architectural — designing constraints and reviewing output — while several collaborating agents write and deliver the work.
- **FR-017**: The methodology MUST be presented as a loop rather than a line: what the gates catch feeds back into the rules and skills.
- **FR-004**: The section MUST open with a visual diagram of the pipeline — specify, harness, agents, gates, ship — including the feedback path from the gates back to the harness. **Revised 2026-08-29**: replaces a requirement for merged-work case studies, which the author judged to be beside the point.
- **FR-005**: Each stage MUST carry an icon, and the section MUST read as a visual explanation rather than a wall of prose.
- **FR-006**: The section MUST be understandable by a reader who has never used an AI coding agent; any term of art MUST be explained where it is first used.
- **FR-007**: All reader-facing content MUST live in a content source separate from presentation, so stages and examples can be added, reworded, reordered, or removed without changing presentation code.
- **FR-008**: The section MUST display when the methodology was last revised.
- **FR-009**: The section MUST remain readable and free of horizontal overflow from small phones through to very wide displays.
- **FR-010**: The section MUST sit after the projects section and before the existing activity strip, and be reachable from the site's existing navigation consistent with how other sections are reached.
- **FR-011**: The section MUST degrade gracefully if a linked artifact becomes unavailable — the surrounding explanation MUST remain coherent without it.
- **FR-012**: The section MUST accommodate a stage that has no linked evidence without implying that evidence exists.
- **FR-013**: Every stage's name and a one-line summary MUST be visible without interaction, with the stage's full detail revealed on demand. Adding a stage MUST therefore cost one line in the default view rather than a further screenful.
- **FR-014**: Where a stage names specific tools, those names MUST live in a dedicated field of that stage's content, not embedded in its explanatory prose. The prose MUST remain meaningful if the named tools are replaced.

### Key Entities

- **Stage**: One step of the methodology. Has a name, a one-line summary shown without interaction, a plain-language explanation of what it is and the problem it solves, an optional note on its cost or tradeoff, an optional list of the tools currently used for it, and zero or more links to evidence.
- **Example**: A piece of real, merged work supporting the methodology. Has a short title, a description of the problem and what the process caught, and a link to the public artifact.
- **Revision marker**: The date the methodology content was last meaningfully revised, shown to the reader.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reader unfamiliar with AI coding agents can summarize the workflow's stages in their own words after a single read of under five minutes.
- **SC-002**: 100% of factual claims about the process either link to a publicly viewable artifact or visibly make no evidentiary claim.
- **SC-003**: A practising engineer can identify, from the section alone, at least one specific practice they could adopt and what it would cost them.
- **SC-004**: The author can add, reword, reorder, or remove a stage by editing content only, with zero changes to presentation code.
- **SC-005**: The reader can determine when the methodology was last revised without leaving the section.
- **SC-006**: The section renders without horizontal overflow, and with all text legible, at every viewport from the smallest supported phone to the widest supported desktop.
- **SC-008**: A reader can see every stage of the methodology, in order, without interacting with the page.
- **SC-009**: Replacing a named tool requires editing one field of one stage, leaving that stage's explanation unchanged.
- **SC-007**: At least two supporting examples link to real merged work, and at least one describes a defect the process caught.

## Assumptions

- The repository remains publicly viewable, so linked artifacts resolve for visitors. FR-011 covers the case where an individual link breaks; wholesale re-privatisation of the repository would undermine the feature's premise and require revisiting it.
- The section lives on the existing single-page site alongside the other sections, rather than on a separate page or route.
- "Last revised" is maintained deliberately by the author as part of editing content, rather than derived automatically — an automatically derived date would change on trivial edits and overstate freshness.
- Reader-facing content is authored in English only, consistent with the rest of the site.
- The examples cited will be drawn from work already merged and public in this repository, so no new evidence needs to be produced for the feature to ship.
- The methodology described is the author's current real practice; the section is descriptive, not aspirational. Documenting a stage not actually in use would defeat the feature's purpose.

## Out of Scope

- A blog, or any commitment to recurring published content.
- Executing agents live on the page, or any interactive demonstration of an agent working.
- Publishing raw agent transcripts or conversation logs.
- Any backend service, stored state, or authenticated behaviour.
- Automatically generating the methodology content from repository history — the content is deliberately authored.

## Traceability

Implements issue #103. Complements the existing "Recently Shipped" activity strip (#78), which surfaces raw repository activity; this section supplies the narrative that activity sits inside.
