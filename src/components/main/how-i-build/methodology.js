// *********************************************************************
// HOW I BUILD — methodology content
// *********************************************************************
// This file is the only editing surface for the "How I build" section.
// Everything the reader sees lives here; nothing here is presentational.
//
// HOW TO REVISE:
//   - Add, reorder, reword or delete entries in `stages` / `caseStudies`.
//     The component renders them in array order and needs no changes.
//   - Keep `detail` prose free of tool names. Names belong in `tools`, so
//     an explanation stays true when the tool underneath it is replaced —
//     which is the whole point, given how fast this moves.
//   - Every claim about the process should carry `evidence`, or be phrased
//     so it plainly isn't citing anything.
//   - Update `lastRevised` by hand when the methodology actually changes.
//     It is deliberately not derived from git: a computed date would move
//     on unrelated edits and overstate how current this is.
// *********************************************************************

const REPO = "https://github.com/twknab/personal_site_v3";

export const lastRevised = "August 2026";

export const intro =
  "Most of this site is now built by AI agents working under my direction. " +
  "That sentence has become cheap — everyone's résumé says something like it — " +
  "so here is the actual process, stage by stage, with links to the work it produced. " +
  "It is changing quickly, and some of it will look naive in a year.";

export const stages = [
  {
    id: "specify-first",
    name: "Write the spec first",
    summary:
      "Anything non-trivial starts as a written specification, not a prompt.",
    detail: [
      "Before any code is written, the work is described in a document: who it is for, what has to be true when it is finished, and what is explicitly not being built. Ambiguity gets resolved there, in prose, where changing my mind costs a sentence instead of a rewrite.",
      "The cost is real. It front-loads an hour of thinking onto work that an agent could start guessing at immediately, and for a one-line fix that would be absurd — so small changes skip it entirely. What it buys on larger work is that the agent and I disagree on paper rather than discovering it three files deep.",
    ],
    tools: ["Spec Kit"],
    evidence: [
      {
        label: "the spec behind this very section",
        href: `${REPO}/tree/main/specs`,
      },
    ],
  },
  {
    id: "shared-instructions",
    name: "Give every agent the same brain",
    summary:
      "Standing rules live in the repo, mirrored so different tools behave identically.",
    detail: [
      "The conventions an agent needs — how this project lays out sections, what may never be full width, how to stage a commit safely — are committed to the repository rather than re-explained each session. Two different assistants read the same guidance from two mirrored directories, so switching between them does not change how the work comes out.",
      "This exists because of a real failure: a rule I had only ever said out loud got broken, shipped, and was invisible at the screen size I happened to be testing. Now that rule is a file, and it carries the reason it exists and the exact check that catches it.",
    ],
    tools: ["Claude Code", "Cursor"],
    evidence: [
      {
        label: "the mirrored skills and rules",
        href: `${REPO}/tree/main/.claude`,
      },
      { label: "PR #87", href: `${REPO}/pull/87` },
    ],
  },
  {
    id: "model-choice",
    name: "Pick the model like any other tradeoff",
    summary:
      "Heavier reasoning where the problem is genuinely hard; cheaper and faster everywhere else.",
    detail: [
      "Model choice is a cost decision, not a loyalty one. Work that involves holding a lot of context at once, or reasoning carefully about a subtle failure, gets the most capable model available. Mechanical work — renaming, wiring, applying a pattern that already exists in the codebase — does not, because paying for deep reasoning on a rename is waste.",
      "I have no clean measurements to offer here, which is why this stage links to nothing. It is judgement, applied per task, and it is the part of this process most likely to look different in six months.",
    ],
    tools: ["Opus", "Sonnet"],
  },
  {
    id: "review-gates",
    name: "Make the gates real",
    summary:
      "Every change clears the same automated checks before it can merge — no exceptions for work I wrote myself.",
    detail: [
      "Linting, the full test suite, a production build, a dependency vulnerability scan and static security analysis all run on every proposed change, and all of them can block a merge. An agent's work faces exactly the same gate mine does, which is the only reason I am comfortable letting one write this much of the site.",
      "The important word is blocking. These checks used to run in a mode where they reported success no matter what they found — which looks identical to safety on the dashboard and provides none. Turning that off was uncomfortable and immediately worthwhile.",
    ],
    tools: ["GitHub Actions", "CodeQL", "Codacy", "Dependabot"],
    evidence: [{ label: "PR #98", href: `${REPO}/pull/98` }],
  },
  {
    id: "parallel-sessions",
    name: "Run sessions in parallel, in separate rooms",
    summary:
      "Several agents work at once, each in its own checkout, so they cannot overwrite each other.",
    detail: [
      "More than one piece of work is usually in flight. Each session gets its own isolated copy of the repository, so two sessions editing at the same time cannot stage each other's half-finished files or pull the branch out from under one another.",
      "I learned this the direct way: two sessions shared one folder, one of them swept the other's in-progress feature into an unrelated commit, and then stashed the files while that work was still being edited. Nothing errored. The files simply vanished mid-task.",
    ],
    tools: ["git worktree"],
    evidence: [{ label: "PR #89", href: `${REPO}/pull/89` }],
  },
];

export const caseStudies = [
  {
    id: "silent-font-failure",
    title: "A green build with every font quietly broken",
    body:
      "Upgrading the framework changed how stylesheets are assembled, and the rule that loaded the site's fonts stopped being honoured. Nothing failed: the build passed, the tests passed, and the page rendered — in fallback typefaces, with the display font silently replaced by a script face. No diff review would have caught it, because no line of the diff was wrong. It was caught by opening the running site and looking at it, which is now a required step rather than an optional one.",
    link: { label: "PR #95", href: `${REPO}/pull/95` },
  },
  {
    id: "security-theatre",
    title: "A security check that passed for months without ever running",
    body:
      "Static analysis was configured to never fail the build. Turning it into a real gate revealed that its upload step had been broken since a platform change the previous year — every run had reported success while delivering nothing. The first genuinely working scan immediately flagged a supply-chain weakness in a workflow file I had added myself a few hours earlier.",
    link: { label: "PR #98", href: `${REPO}/pull/98` },
  },
  {
    id: "dependency-triage",
    title: "Fifteen dependency updates, none of them mergeable",
    body:
      "A backlog of automated dependency pull requests had built up. Rather than merging or closing them in bulk, each was checked against what the project actually installs today. Nine referenced packages that no longer exist in the project at all; five had already been superseded; one was a genuine upgrade that needed to be a planned migration rather than a bump. Each was closed with the specific reason, so the decision is auditable later.",
    link: { label: "PR #86", href: `${REPO}/pull/86` },
  },
];
