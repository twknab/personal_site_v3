# Phase 1 Data Model: How I Build section

All content is static, authored, and imported at build time. No persistence, no runtime fetching.

## Stage

One step of the methodology. Rendered in array order.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | yes | Stable slug, unique. Used as React key and for the disclosure's `aria-controls`. |
| `name` | string | yes | Short title, always visible. |
| `summary` | string | yes | One line, always visible (FR-013). Must make sense alone. |
| `detail` | string[] | yes | Paragraphs revealed on demand. Explains what the stage is, the problem it solves, and its cost (FR-001). Must remain true if `tools` change (FR-014). |
| `tools` | string[] | no | Named tools for this stage. Rendered as chips. Absent is valid. |
| `evidence` | Link[] | no | Public artifacts. Absent is valid and must not imply evidence exists (FR-012). |

**Validation**: `id` unique across stages; `summary` one sentence; `detail` non-empty.

## CaseStudy

Real merged work supporting the methodology. Rendered after the stages (FR-004).

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | yes | Stable slug, unique. |
| `title` | string | yes | Short, problem-shaped rather than feature-shaped. |
| `body` | string | yes | What the problem was and what the process caught. At least one case study must describe a defect a manual review would plausibly have missed (FR-005). |
| `link` | Link | yes | Public artifact. |

## Link

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `label` | string | yes | Human-readable, e.g. "PR #98". Never a bare URL. |
| `href` | string | yes | Absolute public URL. |

## Module-level

| Export | Type | Notes |
|--------|------|-------|
| `stages` | Stage[] | Order is presentation order. |
| `caseStudies` | CaseStudy[] | Order is presentation order. |
| `lastRevised` | string | Human-readable date, author-maintained (FR-008). |

## Component state

Per-stage `open` boolean, all `false` initially. No global or persisted state.
