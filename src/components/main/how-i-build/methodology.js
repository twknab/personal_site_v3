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
  "I direct AI agents through most of my engineering work now — at my job, and on " +
  "personal projects. Everyone's résumé says something like that, so here is the " +
  "actual process, stage by stage. This site is one place it is visible, and a small " +
  "one: it is a nearly-static portfolio, so the parts of the practice that handle " +
  "coordination, scheduling and work I start from a trailhead do not show up in its " +
  "commit history. Where something is public I have linked it. Where it is work I " +
  "cannot publish, I have said so plainly rather than dressed it up. It is all " +
  "changing quickly, and some of it will look naive in a year.";

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
    id: "rules-in-repo",
    name: "Keep the rules in the repository",
    summary:
      "Standing conventions are committed as files, not re-explained each session.",
    detail: [
      "The conventions an agent needs — how this project lays out its sections, what may never run full width, how to stage a commit without trampling someone else's work — live in the repository next to the code. They are versioned, reviewed and diffed like anything else, and they apply to me as much as to an agent.",
      "This exists because of a specific failure. A rule I had only ever said out loud got broken, shipped, and was invisible at the screen size I happened to be testing on. It is now a file that carries the reason it exists and the exact measurement that catches it, so the next session cannot repeat the mistake by not having been told.",
    ],
    tools: ["Markdown"],
    evidence: [
      { label: "the rules, in this repo", href: `${REPO}/tree/main/.claude` },
    ],
  },
  {
    id: "two-tools",
    name: "Two tools, one process",
    summary:
      "I move between Claude Code and Cursor; mirrored instructions keep them interchangeable.",
    detail: [
      "I do not use one assistant. I move between two depending on what the work needs and where I am, which only functions because both read the same instructions from mirrored directories — one per tool, kept byte-identical in substance. Switching tools mid-feature changes the interface, not the output.",
      "The mirroring is deliberate maintenance, not a happy accident. Editing guidance in one place and not the other is the obvious failure mode, so keeping the pair in step is itself a documented step with a check that compares them.",
    ],
    tools: ["Claude Code", "Cursor"],
    evidence: [{ label: "PR #87", href: `${REPO}/pull/87` }],
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
    id: "connected-tools",
    name: "Connect agents to the systems, not to me",
    summary:
      "Agents read the board and the tickets directly instead of waiting for me to paste context in.",
    detail: [
      "An agent that cannot see the tracker is working from whatever I remembered to tell it. Connecting them directly to where work actually lives means an agent can read a ticket's acceptance criteria, see a board's current state, and pick up review comments on a merge request without me acting as a copy-paste layer between the two.",
      "The value is less about speed than about drift: the context an agent works from is the same context the team is working from, rather than my summary of it, aging by the minute.",
    ],
    tools: ["MCP", "GitHub"],
  },
  {
    id: "away-from-desk",
    name: "Start work without being at a desk",
    summary:
      "Some runs are scheduled; others I kick off from my phone, from a trailhead.",
    detail: [
      "Two different things, same underlying idea: the work does not need me sitting in front of it. Routines run on a schedule to handle the coordination layer of a job — triaging inbound mail and messages, keeping tickets moving, pulling the current state of design boards — so that the repetitive parts are already done rather than waiting.",
      "The other half is mobile. I start sessions from a phone and let cloud agents build a feature while I am out in the field, then review what came back when I am home. It is genuinely useful and it is also the part I trust least without gates, which is exactly why the gates below are not optional.",
      "None of this is visible here. It is work I cannot publish, so this stage cites nothing — take it as a description, not a demonstration.",
    ],
    tools: ["Scheduled routines", "Claude mobile", "Cursor mobile", "Cloud agents"],
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
