# Specification Quality Checklist: How I Build — agentic SDLC methodology section

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-08-13
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Validation notes

Three issues were found on the first pass and corrected before this checklist was marked complete:

1. **Implementation leakage.** An early draft named the specific tools (Spec Kit, Claude Code, Cursor, Opus, the individual CI checks) in the functional requirements. Those are *how*, not *what* — and naming them in the spec would also have contradicted the feature's own premise that the toolchain will change. FR-002 now describes each stage by the problem it addresses, leaving tool choice to the plan.

2. **An untestable success criterion.** "The section is credible to engineers" was unmeasurable. It became SC-003: an engineer can identify a specific practice they could adopt, and its cost.

3. **An unexamined assumption.** The spec assumed the repository stays public without saying what happens otherwise. That is now an explicit assumption, with FR-011 covering individual broken links and the assumption flagging that wholesale re-privatisation would require revisiting the feature.

Two decisions were resolved as documented assumptions rather than raised as clarifications, since reasonable defaults existed:

- **"Last revised" is author-maintained, not derived.** An automatic date would change on trivial edits and overstate freshness.
- **The section lives on the existing single page**, consistent with every other section, rather than on a new route.

No [NEEDS CLARIFICATION] markers were needed: the feature description supplied audience, framing, and scope boundaries explicitly.
