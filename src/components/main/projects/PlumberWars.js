import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGamepad, FaGithub } from "react-icons/fa";
import plumberWarsIco from "../../../assets/images/apps/plumberwars-ico.png";

const REPO = "https://github.com/twknab/plumber-wars";
const PLAY = "https://plumberwars.timknab.dev";

function PlumberWars() {
  return (
    <div>
      <Row className="project-row">
        <Col
          md="3"
          className="project-col tilt"
          onClick={() => window.open(PLAY, "_blank")}
        >
          <Image
            src={plumberWarsIco.src}
            alt="Plumber Wars G's Plumbing badge"
            className="project-icon"
            rounded
            fluid
          />
        </Col>
        <Col md="9">
          <h3>Plumber Wars</h3>
          <p>
            A 16-bit arcade game made for my friends at G&apos;s Plumbing, in
            which their crew races a foul-mouthed rival truck across Seattle and
            then fixes the job. The repairs are the real thing: sixteen of the
            most common calls in the Puget Sound area, each broken into the
            steps a plumber actually takes, with pro tips and a &ldquo;How pros
            do it&rdquo; card for every job that explains the standard behind
            the fix, from trap seals to the 80 psi limit on house pressure.
            Every pixel is drawn in code &mdash; a small painter with ordered
            dithering, lit volumes and auto-outlines builds the Space Needle,
            the houses, every face and a dispatch map traced from real
            coordinates at load time &mdash; and each neighborhood opens with
            pixel art converted from openly licensed{" "}
            <a
              href="https://commons.wikimedia.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikimedia Commons
            </a>{" "}
            photos. The EDM soundtrack is synthesized live with the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Audio API
            </a>
            , and the trash talk is voiced with{" "}
            <a
              href="https://cloud.google.com/text-to-speech"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Cloud Text-to-Speech
            </a>
            . Players post their totals to a global leaderboard in{" "}
            <a
              href="https://firebase.google.com/docs/firestore"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firestore
            </a>
            , served by a zero-dependency Node server on Cloud Run, and a test
            fails the build if a line ships unrecorded or the README drifts
            from the game. Built with{" "}
            <a
              href="https://phaser.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Phaser
            </a>{" "}
            and{" "}
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claude
            </a>
            , phone-first. Contains language.
          </p>
          <Button
            variant="primary"
            size="lg"
            href={PLAY}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn"
          >
            <FaGamepad aria-hidden="true" />
            Play it
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
    </div>
  );
}

export default PlumberWars;
