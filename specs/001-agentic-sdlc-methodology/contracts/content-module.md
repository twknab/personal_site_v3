# Contract: methodology content module

**Path**: `src/components/main/how-i-build/methodology.js`

This is the feature's only editing surface. Everything a future revision needs to change lives here; nothing here is presentational.

```js
export const lastRevised = "August 2026";

export const stages = [
  {
    id: "spec-first",
    name: "Specify before building",
    summary: "Non-trivial work starts as a written spec, not a prompt.",
    detail: [
      "Plain-language paragraph: what this is and the problem it solves.",
      "Plain-language paragraph: what it costs, honestly.",
    ],
    tools: ["Spec Kit"],
    evidence: [{ label: "spec for this section", href: "https://github.com/..." }],
  },
];

export const caseStudies = [
  {
    id: "silent-font-failure",
    title: "A build that passed while every font was broken",
    body: "What happened and what caught it.",
    link: { label: "PR #95", href: "https://github.com/..." },
  },
];
```

## Guarantees the component makes

- Renders `stages` and `caseStudies` in array order.
- `tools` and `evidence` are optional; omitting them renders nothing, with no empty containers or dangling labels (FR-012).
- `detail` accepts any number of paragraphs.
- Adding, reordering, rewording or removing an entry requires no change to `HowIBuild.js` or `twkTheme.scss` (FR-007, SC-004).
- Swapping a tool name touches only that stage's `tools` array (SC-009).

## Constraints on authored content

- `detail` prose must not name tools — those belong in `tools`, so the prose survives a tool change (FR-014).
- Every factual process claim carries an `evidence` link, or is phrased so it clearly cites nothing (FR-003).
- Terms of art are explained where first used (FR-006).
- `lastRevised` is updated by hand when the methodology meaningfully changes (FR-008).
