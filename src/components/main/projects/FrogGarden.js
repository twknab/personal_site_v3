import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import frogGardenIco from "../../../assets/images/apps/froggarden-ico.png";
import focusMode from "../../../assets/images/projects/froggarden/focus-mode.png";
import goldenHour from "../../../assets/images/projects/froggarden/golden-hour.png";
import quietGrove from "../../../assets/images/projects/froggarden/quiet-grove.png";
import sakuraDrift from "../../../assets/images/projects/froggarden/sakura-drift.png";
import taskList from "../../../assets/images/projects/froggarden/task-list.png";
import violetHour from "../../../assets/images/projects/froggarden/violet-hour.png";
import ProjectGallery from "./ProjectGallery";

const REPO = "https://github.com/twknab/zen-frog-todo";
const LIVE = "https://zenfrog.netlify.app";

// The app ships eighteen palettes, so four of them lead -- the range is the
// feature. Captured from the running app with the same seeded tasks each
// time, so the only thing changing between shots is the theme.
const SHOTS = [
  { src: quietGrove, alt: "Quiet Grove, the default" },
  { src: violetHour, alt: "Violet Hour" },
  { src: goldenHour, alt: "Golden Hour, in light mode" },
  { src: sakuraDrift, alt: "Sakura Drift" },
  { src: taskList, alt: "The day's tasks, largest one first" },
  { src: focusMode, alt: "A focus session" },
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
