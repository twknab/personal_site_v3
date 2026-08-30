import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import frogGardenIco from "../../../assets/images/apps/froggarden-ico.png";
import focusMode from "../../../assets/images/projects/froggarden/focus-mode.png";
import garden from "../../../assets/images/projects/froggarden/garden.png";
import options from "../../../assets/images/projects/froggarden/options.png";
import taskList from "../../../assets/images/projects/froggarden/task-list.png";
import tropicPunch from "../../../assets/images/projects/froggarden/tropic-punch.png";
import ProjectGallery from "./ProjectGallery";

const REPO = "https://github.com/twknab/zen-frog-todo";
const LIVE = "https://zenfrog.netlify.app";

// The app ships eighteen palettes, so three of the most distinct lead --
// the range is the feature. Captured from the running app with the same
// seeded tasks, so the only thing changing between them is the theme.
// Captured from a seeded garden: a full day's work grown into the tree, so
// the canopy is mature, the frogs have gathered, and the sand is actually
// raked -- the strokes are drawn with real pointer input, not faked.
const SHOTS = [
  { src: garden, alt: "A day's work grown: full canopy, frogs, raked sand" },
  { src: tropicPunch, alt: "The same garden in Tropic Punch" },
  { src: options, alt: "Palette, contrast and density, in Mirrorball" },
  { src: focusMode, alt: "A focus session" },
  { src: taskList, alt: "The day's tasks" },
];

function FrogGarden() {
  return (
    <div className="project-block">
      <Row className="project-row">
        <Col
          md="3"
          className="project-col tilt"
          onClick={() => window.open(REPO, "_blank")}
        >
          <Image src={frogGardenIco.src} className="project-icon"
            alt="" rounded fluid />
        </Col>
        <Col md="9">
          <h3>Frog Garden</h3>
          <p>
            A calm, Zen-influenced to-do app that turns getting things done into
            tending a small garden. Swallow your frog &mdash; the one task you
            most dread &mdash; before the rest of the list unlocks, then watch a
            bonsai grow through the day as frog friends gather at its base.
            Progress is rewarded organically rather than with scoreboards or
            streaks, alongside a focus timer, a raked-sand canvas to fidget
            with, and an end-of-day reflection. Everything stays on your device
            &mdash; no account, no backend, no tracking. Built with{" "}
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>
            ,{" "}
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            , and{" "}
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TypeScript
            </a>
            , with{" "}
            <a
              href="https://mui.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Material UI
            </a>{" "}
            re-themed into a muted, nature-inspired palette and{" "}
            <a
              href="https://www.framer.com/motion/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Framer Motion
            </a>{" "}
            for restrained, organic movement.
          </p>
          <Button
            variant="primary"
            size="lg"
            href={LIVE}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn"
          >
            <FaExternalLinkAlt aria-hidden="true" />
            See it Live
          </Button>
          <Button
            variant="primary"
            size="lg"
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn"
          >
            <FaGithub aria-hidden="true" />
            View on GitHub
          </Button>
        </Col>
      </Row>
      <ProjectGallery images={SHOTS} projectName="Frog Garden" />
    </div>
  );
}

export default FrogGarden;
