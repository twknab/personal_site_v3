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
      "Comprehensive specification and planning is also where the technical decisions get settled: the stack, the coding patterns, the preferred libraries, the approach and the architecture. Fixing those up front is what stops an agent quietly inventing its own.",
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
      "So the rule sets get iterated on, and iterated on again. Each pass tightens what the agents may do until the output comes back in the shape I actually wanted, rather than something I have to rewrite.",
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
      "The rules are an evolving body of the preferred practices, patterns and intentions for a given codebase. Its architecture, its technical decisions and its house style all go into the rules and the constitution the agents read before they touch anything.",
      "The better that body gets, the more the harness returns the right output first time — which means less prompting, less correction, fewer iterations, and materially fewer tokens.",
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
      "I leverage multiple agentic tools at once — Claude, Cursor, and parallel local and cloud agents spun up as the work demands.",
      "A rule links the two rule sets and holds them in parity, so I can move between agents and workflows freely: picking up in one when a quota wears out, or switching because I prefer what a particular tool produces for that kind of work.",
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
      "MCP connections wire the agents into GitLab, Figma and Atlassian — JIRA and Confluence — so they act on my behalf: moving ticket statuses, posting updates, and writing end-of-day rollups.",
      "They also run code review, raise Slack alerts and work through the feedback before any human stamps it. Once approvals land, merging and rebasing are automated through merge-train skills.",
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
      "Parallel and cloud agents, always. Each works on its own branch in its own checkout and never touches another's commit history.",
      "Branches and diffs are stacked wherever the work allows, so agents can build on top of each other instead of queueing — or colliding. I learned that boundary the hard way: two sessions once shared a folder and one swept the other's half-built feature into an unrelated commit.",
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
      "Claude mobile and Cursor mobile dispatch tasks; screen-control apps let me drive a local terminal from a phone.",
      "So planning, a feature, or a grooming pass can start while I am out in the world — which is often where the better ideas turn up.",
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
      "Gates and CI/CD are how quality is actually controlled: linting, security scanning, vulnerability and container scanning, automated test suites, automated code review, and author agents that work through blocking comments and nits before a human looks.",
      "Together with the harness, this is what holds code integrity, quality and maintainability in place — and it is what every automated deployment is gated on. Nothing reaches an environment that has not passed it.",
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
      "Infrastructure is Terraform. Writing it as code keeps an application portable between cloud environments instead of welded to whatever was clicked into one console.",
      "Click-ops is avoided on principle: no engineer remembers what they clicked, least of all across dev, staging and production. If it is not in code it does not survive the next person — or the next environment.",
    ],
    tools: ["Terraform", "CI/CD", "Google Cloud"],
  },
  {
    id: "iterate",
    Icon: FaSyncAlt,
    name: "Then sharpen the harness",
    summary: "Every escape becomes a new rule, a new skill, or a new gate.",
    detail: [
      "Sharpen the harness, sharpen the gates, go again. Fix the gap, write the new rule, automate the step — and never repeat yourself in a prompt.",
      "Add scheduled routines. Add MCP connections. Build the connectors that do not exist yet. The work is finding the gaps in the agentic flow and joining the islands that still need something carried over the fence by hand.",
    ],
    tools: ["Rule sets", "Custom skills", "Scheduled routines", "MCP"],
  },
];
