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
      "Anything non-trivial begins as a specification — who it is for, what must be true when it is done, what is excluded — then a separate planning pass turns it into ordered tasks before a line is written.",
      "It costs an hour before anything visible happens, so small changes skip it. What it buys is that the disagreement happens on paper instead of three files deep.",
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
      "The leverage is not in any single prompt. It is in standing constraints: rule sets encoding what a project will not tolerate, and custom skills that capture a whole procedure so it runs the same way every time.",
      "When output comes back wrong, the fix is rarely to re-prompt — it is to find the missing constraint and add it, so that class of mistake cannot recur.",
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
      "Rules live next to the code, not in my head or a chat history — versioned, reviewed and diffed like anything else, binding me as much as any agent.",
      "A rule I had only ever said out loud once got broken, shipped, and was invisible at the width I happened to test. It is now a file carrying the reason it exists and the measurement that catches it.",
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
      "I move between assistants depending on the work and where I am. It holds together because each reads the same instructions from mirrored directories — switching mid-feature changes the interface, not the output.",
      "Keeping the pair in step is deliberate maintenance with its own check; editing one and forgetting the other is the obvious way it rots.",
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
      "An agent that cannot see the tracker works from whatever I remembered to tell it. Connected directly, it reads acceptance criteria, board state and review comments itself.",
      "The gain is less speed than drift: it works from the same context the team has, not my summary of it, ageing by the minute.",
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
      "Several pieces of work are usually moving, so each session gets its own isolated copy of the repository and cannot touch another's files.",
      "I learned that boundary the hard way: two sessions shared one folder, one swept the other's half-built feature into an unrelated commit and then stashed it mid-edit. Nothing errored — the work simply vanished.",
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
      "Routines run on a schedule to handle the coordination layer of a job — triaging mail and messages, keeping tickets moving, pulling design board state — so the repetitive parts are done rather than queued.",
      "The rest is mobile: I start sessions from a phone and let cloud agents build while I am out on a trail, then review what came back. It is the part I would trust least without the gates, which is why they are not optional.",
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
      "Linting, tests, a production build, dependency scanning and static security analysis run on every change, and any of them can stop a merge. Agent-written work faces exactly the gate mine does.",
      "The load-bearing word is blocking. These once ran in a mode that reported success regardless of findings — indistinguishable from safety on a dashboard, and worth nothing.",
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
      "Getting an agent to write code is the easy half. The pipeline that builds a merged change, provisions what it needs and puts it in front of users is what closes the loop — otherwise a human is still the last bottleneck.",
      "Infrastructure is described as code too, so environments are reproducible and a deployment is a reviewable change like any other.",
    ],
    tools: ["CI/CD", "Google Cloud", "Terraform"],
  },
  {
    id: "iterate",
    Icon: FaSyncAlt,
    name: "Then sharpen the harness",
    summary: "Every escape becomes a new rule, a new skill, or a new gate.",
    detail: [
      "Anything that reaches production wrong is treated as a gap in the harness, not a one-off — the response is a new rule, a sharper skill, or a check that would have caught it.",
      "This is the part that compounds. The agents do not improve on their own; the constraints around them do.",
    ],
    tools: ["Rule sets", "Custom skills"],
  },
];
