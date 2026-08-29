// *********************************************************************
// HOW I BUILD — methodology content
// *********************************************************************
// The only editing surface for the "How I build" section. Everything the
// reader sees lives here; nothing here is presentational.
//
// HOW TO REVISE:
//   - Add, reorder, reword or delete entries in `flow` / `stages`. The
//     component renders them in array order and needs no changes.
//   - Keep `detail` prose free of tool names. Names belong in `tools`, so an
//     explanation stays true when the tool under it is replaced.
//   - Update `lastRevised` by hand when the methodology actually changes. It
//     is deliberately not derived from git: a computed date would move on
//     unrelated edits and overstate how current this is.
// *********************************************************************

import {
  FaBookOpen,
  FaClipboardList,
  FaCloudUploadAlt,
  FaCodeBranch,
  FaDraftingCompass,
  FaLayerGroup,
  FaMobileAlt,
  FaPlug,
  FaRobot,
  FaShieldAlt,
  FaSlidersH,
  FaSyncAlt,
} from "react-icons/fa";

export const lastRevised = "August 2026";

export const intro =
  "I spend less time writing code than designing the harness that produces it. " +
  "Specifications, planning passes, rule sets and custom skills all constrain what " +
  "the agents are allowed to do; the agents then write and deliver the work, in " +
  "parallel, while automated gates and pipelines decide whether it ships. My job has " +
  "shifted toward architecture and review — shaping the constraints, reading what " +
  "comes back, and sharpening the harness whenever it lets something through.";

// The pipeline diagram. `loop: true` marks where the feedback arc points back to.
export const flow = [
  {
    id: "flow-spec",
    Icon: FaClipboardList,
    label: "Specify",
    caption: "Spec and plan before code",
  },
  {
    id: "flow-harness",
    Icon: FaSlidersH,
    label: "Harness",
    caption: "Rules, skills, constraints",
    loop: true,
  },
  {
    id: "flow-agents",
    Icon: FaRobot,
    label: "Agents build",
    caption: "Several, in parallel",
  },
  {
    id: "flow-gates",
    Icon: FaShieldAlt,
    label: "Gates",
    caption: "Tests, review, security",
  },
  {
    id: "flow-ship",
    Icon: FaCloudUploadAlt,
    label: "Ship",
    caption: "Automated to the cloud",
  },
];

export const loopLabel = "What the gates catch sharpens the harness";

export const architectNote = {
  Icon: FaDraftingCompass,
  text:
    "The shape of the job changes. Most of my time goes on architecture, constraints and review — deciding what should exist and what must never happen — while the writing and delivery are carried out by several agents collaborating under those rules.",
};

export const stages = [
  {
    id: "specify-first",
    Icon: FaClipboardList,
    name: "Specify, then plan, then build",
    summary:
      "Work starts as a written spec and a planning pass — never straight into code.",
    detail: [
      "Anything non-trivial begins as a specification: who it is for, what must be true when it is done, what is deliberately excluded. That is followed by a separate planning pass that turns the specification into an ordered set of tasks before a line is written. Both are documents I can argue with cheaply.",
      "The cost is an hour of thinking before anything visible happens, which would be absurd for a one-line fix — so small changes skip it. What it buys on real work is that the disagreement happens on paper instead of three files deep.",
    ],
    tools: ["Spec Kit", "Plan mode"],
  },
  {
    id: "the-harness",
    Icon: FaSlidersH,
    name: "Build the harness, not just the feature",
    summary:
      "Rule sets and custom skills constrain the agents; correcting them is the real work.",
    detail: [
      "The leverage is not in any single prompt. It is in the standing constraints: rule sets encoding what a project will and will not tolerate, and custom skills that capture a whole procedure so it runs the same way every time instead of being re-improvised.",
      "When output comes back wrong, the fix is rarely to re-prompt. It is to work out which constraint was missing and add it, so that class of mistake cannot recur. The harness gets sharper every time something slips through — which is what makes the failures worth having.",
    ],
    tools: ["Rule sets", "Custom skills"],
  },
  {
    id: "rules-in-repo",
    Icon: FaBookOpen,
    name: "Keep the rules in the repository",
    summary:
      "Constraints are committed files — versioned, reviewed and diffed like code.",
    detail: [
      "The rules live next to the code rather than in my head or in a chat history. They are versioned, reviewed and diffed like anything else, and they bind me as much as they bind an agent.",
      "This exists because of a specific failure: a rule I had only ever said out loud got broken, shipped, and was invisible at the screen size I happened to be testing on. It is now a file carrying both the reason it exists and the exact measurement that catches it.",
    ],
    tools: ["Markdown", "Git"],
  },
  {
    id: "two-tools",
    Icon: FaLayerGroup,
    name: "Two tools, one process",
    summary:
      "I move between agents; mirrored instructions keep them interchangeable.",
    detail: [
      "I do not rely on a single assistant. I move between them depending on the work and where I am, which only holds together because each reads the same instructions from mirrored directories. Switching tools mid-feature changes the interface, not the output.",
      "Keeping that pair in step is deliberate maintenance with its own check — editing guidance in one place and forgetting the other is the obvious way it would rot.",
    ],
    tools: ["Claude Code", "Cursor"],
  },
  {
    id: "connected-tools",
    Icon: FaPlug,
    name: "Connect agents to the systems, not to me",
    summary:
      "Agents read boards, tickets and review feedback directly, rather than through me.",
    detail: [
      "An agent that cannot see the tracker works from whatever I remembered to tell it. Connected directly, it reads a ticket's acceptance criteria, sees the board's real state and picks up review comments without me acting as a copy-paste layer.",
      "The gain is less about speed than drift: the agent works from the same context the team has, rather than my summary of it, ageing by the minute.",
    ],
    tools: ["MCP", "GitHub"],
  },
  {
    id: "parallel-sessions",
    Icon: FaCodeBranch,
    name: "Several agents, working at once",
    summary:
      "Multiple sessions collaborate in isolated checkouts so they cannot collide.",
    detail: [
      "More than one piece of work is usually moving. Each session gets its own isolated copy of the repository, so two agents editing simultaneously cannot stage each other's half-finished files or pull a branch out from under one another.",
      "I learned that boundary the hard way: two sessions shared one folder, one swept the other's in-progress feature into an unrelated commit, then stashed the files while they were still being edited. Nothing errored — the work simply vanished mid-task.",
    ],
    tools: ["git worktree"],
  },
  {
    id: "away-from-desk",
    Icon: FaMobileAlt,
    name: "Start work without being at a desk",
    summary:
      "Some runs are scheduled; others I start from a phone, out in the field.",
    detail: [
      "Two forms of one idea: the work does not need me sitting in front of it. Routines run on a schedule to handle the coordination layer of a job — triaging inbound mail and messages, keeping tickets moving, pulling the current state of design boards — so the repetitive parts are already done rather than queued.",
      "The other half is mobile. I start sessions from a phone and let cloud agents build a feature while I am out on a trail, then review what came back later. It is genuinely useful, and it is also the part I would trust least without the gates — which is exactly why they are not optional.",
    ],
    tools: ["Scheduled routines", "Claude mobile", "Cursor mobile"],
  },
  {
    id: "review-gates",
    Icon: FaShieldAlt,
    name: "Make the gates real",
    summary:
      "Automated review and security scanning block a merge — no exemption for agent-written code.",
    detail: [
      "Linting, the full test suite, a production build, dependency vulnerability scanning and static security analysis all run on every proposed change, and any of them can stop a merge. Agent-written work faces exactly the gate mine does, which is the only reason I am comfortable letting agents write this much.",
      "The load-bearing word is blocking. These checks previously ran in a mode that reported success regardless of findings — indistinguishable from safety on a dashboard, and worth nothing. Turning that off was uncomfortable and immediately justified.",
    ],
    tools: ["Code review", "Security scanning", "Dependency scanning"],
  },
  {
    id: "automated-delivery",
    Icon: FaCloudUploadAlt,
    name: "Automate the delivery, not just the writing",
    summary:
      "Once it passes, pipelines build and deploy to the cloud without me.",
    detail: [
      "Getting an agent to write code is the easy half. The pipeline that takes a merged change, builds it, provisions what it needs and puts it in front of users is what actually closes the loop — otherwise a human is still the bottleneck at the last step.",
      "Infrastructure is described as code too, so environments are reproducible rather than hand-assembled, and a deployment is a reviewable change like any other.",
    ],
    tools: ["CI/CD", "Google Cloud", "Terraform"],
  },
  {
    id: "iterate",
    Icon: FaSyncAlt,
    name: "Then sharpen the harness",
    summary: "Every escape becomes a new rule, a new skill, or a new gate.",
    detail: [
      "The loop closes here. Anything that reaches production wrong is treated as a gap in the harness rather than a one-off mistake — the response is a new rule, a sharper skill, or a check that would have caught it, so that class of error cannot return.",
      "This is the part that compounds. The agents do not get better on their own; the constraints around them do, and that is increasingly where my time goes.",
    ],
    tools: ["Rule sets", "Custom skills"],
  },
];
