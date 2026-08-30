// *********************************************************************
// HOW I BUILD — methodology content
// *********************************************************************
// The only editing surface for the "How I build" section. Everything the
// reader sees lives here; nothing here is presentational.
//
// HOW TO REVISE:
//   - Add, reorder, reword or delete entries in `flow` / `stages`. The
//     component renders them in array order and needs no changes.
//   - Prefer keeping tool names in `tools` rather than in `detail`, so an
//     explanation stays true when the tool under it is replaced. Two stages
//     deliberately break this — naming the agents and the connected systems
//     in prose is the point of those stages — so it is a default, not a law.
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
  "I spend more time designing the harness than writing code. Specs, plans, rule " +
  "sets and skills set what the agents are allowed to do. The agents then write and " +
  "deliver, several at once, and the gates decide whether any of it ships. My work " +
  "has moved toward architecture and review: shaping the constraints, reading what " +
  "comes back, and tightening the harness when something gets through it.";

// The pipeline diagram. `loop: true` marks where the feedback arc points back to.
export const flow = [
  {
    id: "flow-spec",
    accent: "#00d4ff",
    Icon: FaClipboardList,
    label: "Specify",
    caption: "Spec and plan before code",
  },
  {
    id: "flow-harness",
    accent: "#d8e052",
    Icon: FaSlidersH,
    label: "Harness",
    caption: "Rules, skills, constraints",
    loop: true,
  },
  {
    id: "flow-agents",
    accent: "#b026ff",
    Icon: FaRobot,
    label: "Agents build",
    caption: "Several, in parallel",
  },
  {
    id: "flow-gates",
    accent: "#32efa6",
    Icon: FaShieldAlt,
    label: "Gates",
    caption: "Tests, review, security",
  },
  {
    id: "flow-ship",
    accent: "#ff2d95",
    Icon: FaCloudUploadAlt,
    label: "Ship",
    caption: "Automated to the cloud",
  },
];

export const loopLabel = "What the gates catch sharpens the harness";

export const architectNote = {
  Icon: FaDraftingCompass,
  text:
    "The job changes shape. Most of my time goes to architecture, constraints and review, deciding what should exist and what must never happen, while several agents write and deliver the work under those rules.",
};

export const stages = [
  {
    id: "specify-first",
    Icon: FaClipboardList,
    name: "Specify, then plan, then build",
    summary:
      "Work starts as a written spec and a planning pass — never straight into code.",
    detail: [
      "Anything sizeable starts as a written spec: who it is for, what has to be true when it is done, and what is out. A planning pass turns that into ordered tasks.",
      "This is also where the technical decisions get made. Stack, patterns, libraries, architecture. Settle them here and an agent has no room to invent its own.",
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
      "The leverage is not in the prompt. It sits in the constraints: rule sets saying what a project will not accept, and skills that hold a whole procedure so it runs the same way every time.",
      "So I keep iterating on the rules. Each pass tightens what the agents can do, until the output comes back in the shape I wanted.",
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
      "The rules are a growing record of how a codebase prefers to be written. Its architecture, its technical decisions, its house style, all committed where the agents read them.",
      "The better that record gets, the more often the first attempt is right. Less prompting, less correcting, fewer tokens.",
    ],
    tools: ["Rule sets", "Constitution", "Git"],
  },
  {
    id: "two-tools",
    Icon: FaLayerGroup,
    name: "Two tools, one process",
    summary:
      "I move between agents; mirrored instructions keep them interchangeable.",
    detail: [
      "I run several agentic tools at once: Claude, Cursor, and parallel local and cloud agents.",
      "A rule keeps both rule sets in parity, so I can switch tools mid-workflow. Useful when one quota runs out, or when one of them simply does a job better.",
    ],
    tools: ["Claude", "Cursor", "Cloud agents"],
  },
  {
    id: "connected-tools",
    Icon: FaPlug,
    name: "Connect agents to the systems, not to me",
    summary:
      "Agents read boards, tickets and review feedback directly, rather than through me.",
    detail: [
      "Agents connect to GitLab, Figma, JIRA and Confluence and act there themselves. Moving ticket status, posting updates, writing end-of-day rollups.",
      "They also run code review, raise Slack alerts and clear feedback before anyone stamps it. Once approved, merge trains handle the merge and rebase.",
    ],
    tools: ["MCP", "GitLab", "Atlassian", "Figma", "Slack"],
  },
  {
    id: "parallel-sessions",
    Icon: FaCodeBranch,
    name: "Several agents, working at once",
    summary:
      "Multiple sessions collaborate in isolated checkouts so they cannot collide.",
    detail: [
      "Parallel and cloud agents, always. Each gets its own branch and its own checkout, so none of them can touch another's history.",
      "Branches and diffs stack wherever the work allows, so agents build on each other instead of queueing.",
    ],
    tools: ["git worktree", "Cloud agents", "Stacked branches"],
  },
  {
    id: "away-from-desk",
    Icon: FaMobileAlt,
    name: "Start work without being at a desk",
    summary:
      "Some runs are scheduled; others I start from a phone, out in the field.",
    detail: [
      "Claude and Cursor mobile dispatch tasks. Screen control gets me into a local terminal from a phone.",
      "Planning, a feature, or a grooming pass can start while I am out walking, which is usually where the better ideas show up.",
    ],
    tools: ["Claude mobile", "Cursor mobile", "Screens Connect"],
  },
  {
    id: "review-gates",
    Icon: FaShieldAlt,
    name: "Make the gates real",
    summary:
      "Automated review and security scanning block a merge — no exemption for agent-written code.",
    detail: [
      "Gates are how quality holds. Linting, security and vulnerability scanning, container scanning, test suites, automated review, and agents that clear blocking comments and nits before a person looks.",
      "With the harness, this is what keeps the code sound. Nothing reaches an environment without passing it.",
    ],
    tools: ["Linting", "Security scanning", "Container scanning", "Test suites", "Automated review"],
  },
  {
    id: "automated-delivery",
    Icon: FaCloudUploadAlt,
    name: "Infrastructure as code, never click-ops",
    summary:
      "Terraform keeps environments reproducible and applications portable between clouds.",
    detail: [
      "Infrastructure is Terraform. Written as code, an application stays portable between clouds instead of welded to whatever was clicked into one console.",
      "Click-ops is out. Nobody remembers what they clicked, least of all across dev, staging and production.",
    ],
    tools: ["Terraform", "CI/CD", "Google Cloud"],
  },
  {
    id: "iterate",
    Icon: FaSyncAlt,
    name: "Then sharpen the harness",
    summary: "Every escape becomes a new rule, a new skill, or a new gate.",
    detail: [
      "Sharpen the harness, sharpen the gates, run it again. Fix the gap, write the rule, automate the step. Never repeat yourself in a prompt.",
      "Add routines. Add connections. Build the connectors that do not exist yet. The job is spotting gaps in the flow and joining the parts that still need carrying by hand.",
    ],
    tools: ["Rule sets", "Custom skills", "Scheduled routines", "MCP"],
  },
];
