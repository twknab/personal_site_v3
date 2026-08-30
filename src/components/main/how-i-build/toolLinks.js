// *********************************************************************
// TOOL LINKS
// *********************************************************************
// Maps a tool name used anywhere in `methodology.js` to its brand mark and
// its home on the web. A tool listed here renders as a branded link; a tool
// missing from here still renders, just as a plain tag.
//
// That fallback is deliberate: the methodology should never be blocked on
// finding an icon for something. Add the entry when there is one to add.
//
// Every URL here was checked before being committed. A dead link on a page
// arguing for rigor is worse than no link.
// *********************************************************************

import {
  SiClaude,
  SiConfluence,
  SiCursor,
  SiFigma,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGooglecloud,
  SiJira,
  SiMarkdown,
  SiNetlify,
  SiTerraform,
} from "react-icons/si";
import { FaBookOpen, FaMobileAlt, FaPlug, FaRobot, FaSlack } from "react-icons/fa";

export const toolLinks = {
  "Spec Kit": { Icon: SiGithub, href: "https://github.com/github/spec-kit" },
  Claude: { Icon: SiClaude, href: "https://claude.com/claude-code" },
  Cursor: { Icon: SiCursor, href: "https://cursor.com" },
  "Claude mobile": { Icon: SiClaude, href: "https://claude.com/claude-code" },
  "Cursor mobile": { Icon: SiCursor, href: "https://cursor.com" },
  MCP: { Icon: FaPlug, href: "https://modelcontextprotocol.io" },
  GitLab: { Icon: SiGitlab, href: "https://about.gitlab.com" },
  Atlassian: { Icon: SiJira, href: "https://www.atlassian.com/software/jira" },
  Confluence: {
    Icon: SiConfluence,
    href: "https://www.atlassian.com/software/confluence",
  },
  Figma: { Icon: SiFigma, href: "https://www.figma.com" },
  Slack: { Icon: FaSlack, href: "https://slack.com" },
  Terraform: {
    Icon: SiTerraform,
    href: "https://developer.hashicorp.com/terraform",
  },
  "Google Cloud": { Icon: SiGooglecloud, href: "https://cloud.google.com" },
  "Cloud Run": { Icon: SiGooglecloud, href: "https://cloud.google.com/run" },
  Netlify: { Icon: SiNetlify, href: "https://www.netlify.com" },
  Git: { Icon: SiGit, href: "https://git-scm.com" },
  Markdown: { Icon: SiMarkdown, href: "https://commonmark.org" },
  "Cloud agents": { Icon: FaRobot, href: "https://claude.com/claude-code" },
  "Screens Connect": {
    Icon: FaMobileAlt,
    href: "https://edovia.com/en/screens-connect/",
  },
};

// A single further-reading link, shown under the stages.
export const furtherReading = {
  Icon: FaBookOpen,
  label: "Google Research — Industrial Agentic Engineering",
  href: "https://research.google/pubs/industrial-agentic-engineering/",
  note:
    "Google's write-up of the same idea, where the harness is what turns a model into an agent.",
};
