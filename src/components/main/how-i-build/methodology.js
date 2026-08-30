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
  "sets and skills decide what the agents are allowed to do. They write and deliver, " +
  "several at once, and the gates decide whether any of it ships. My work's moved " +
  "toward architecture and review: shaping the constraints, reading what comes back, " +
  "and tightening the harness when something slips past it.";

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
    "The job changes shape. Most of my time goes to architecture, constraints and review — deciding what should exist and what should never happen — while several agents write and deliver the work under those rules.",
};

export const stages = [
  {
    id: "specify-first",
    Icon: FaClipboardList,
    name: "Specify, then plan, then build",
    summary:
      "Work starts as a written spec and a planning pass — never straight into code.",
    detail: [
      "Anything sizeable starts as a written spec: who it's for, what has to be true when it's done, what's out of scope. A planning pass turns that into ordered tasks.",
      "It's also where the technical decisions get made. Stack, patterns, libraries, architecture. Settle them here and an agent has no room to invent its own.",
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
      "The leverage isn't in the prompt. It's in the constraints: rule sets saying what a project won't accept, and skills that hold a whole procedure so it runs the same way every time.",
      "So I keep iterating on the rules. Each pass tightens what the agents can do, until the output comes back in the shape I wanted in the first place.",
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
      "The rules are a growing record of how a codebase wants to be written. Its architecture, its technical decisions, its house style, all committed where the agents read them.",
      "The better that record gets, the more often the first attempt is right. Less prompting, less correcting, fewer tokens.",
    ],
    tools: ["Rule sets", "Constitution", "Git"],
  },
  {
    id: "two-tools",
    Icon: FaLayerGroup,
    name: "Two tools, one process",
    summary:
      "Several agentic tools running at once, kept interchangeable by mirrored rules.",
    detail: [
      "I run several agentic tools at once: Claude, Cursor, and parallel local and cloud agents.",
      "A rule keeps both rule sets in parity, so I can switch tools mid-workflow. Handy when a quota runs out, or when one of them just does a job better.",
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
      "Agents connect to GitLab, Figma, JIRA and Confluence and act there themselves. Moving ticket status, posting updates, writing the end-of-day rollup.",
      "They run code review too, raise Slack alerts, and clear feedback before anyone stamps it. Once it's approved, merge trains handle the merge and the rebase.",
    ],
    tools: ["MCP", "GitLab", "Atlassian", "Figma", "Slack"],
  },
  {
    id: "parallel-sessions",
    Icon: FaCodeBranch,
    name: "Several agents, working at once",
    summary:
      "Several sessions working in isolated checkouts so they can't collide.",
    detail: [
      "Parallel and cloud agents, always. Each one gets its own branch and its own checkout, so they can't touch each other's history.",
      "Branches and diffs stack where the work allows it, so agents build on each other instead of waiting in line.",
    ],
    tools: ["git worktree", "Cloud agents", "Stacked branches"],
  },
  {
    id: "away-from-desk",
    Icon: FaMobileAlt,
    name: "Start work without being at a desk",
    summary: "Work I kick off from a phone, usually from somewhere outside.",
    detail: [
      "Claude and Cursor mobile dispatch the tasks. Screen control gets me into a local terminal from my phone.",
      "So planning, a feature, or a grooming pass can start while I'm out walking, which is usually where the better ideas show up anyway.",
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
      "Along with the harness, it's what keeps the code sound. Nothing reaches an environment without getting through it first.",
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
      "Infrastructure is Terraform. Written as code, an app stays portable between clouds instead of welded to whatever somebody clicked into one console.",
      "Click-ops is out. Nobody remembers what they clicked, least of all across dev, staging and prod.",
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
      "Add routines. Add connections. Build the connectors that don't exist yet. The job is spotting gaps in the flow and joining up the parts that still need carrying by hand.",
    ],
    tools: ["Rule sets", "Custom skills", "Scheduled routines", "MCP"],
  },
];
