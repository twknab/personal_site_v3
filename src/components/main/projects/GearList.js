import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithub } from "react-icons/fa";
import gearListIco from "../../../assets/images/apps/gearlist-ico.png";
import about from "../../../assets/images/projects/gearlist/about.png";
import addItem from "../../../assets/images/projects/gearlist/add-item.png";
import dashboard from "../../../assets/images/projects/gearlist/dashboard.png";
import gearListShot from "../../../assets/images/projects/gearlist/gear-list.png";
import login from "../../../assets/images/projects/gearlist/login.png";
import ProjectGallery from "./ProjectGallery";

const REPO = "https://github.com/twknab/gear_list_MEVN";

// Captured from the running app against a seeded database, so the weights
// and totals on screen are the app's own arithmetic rather than mock text.
const SHOTS = [
  { src: dashboard, alt: "Gear lists with their total weights" },
  { src: gearListShot, alt: "Inside a list, item by item" },
  { src: addItem, alt: "Adding a piece of gear" },
  { src: about, alt: "What the app is for" },
  { src: login, alt: "Signing in" },
];

function GearList() {
  return (
    <div className="project-block">
      <Row className="project-row">
        <Col
          md="3"
          className="project-col tilt"
          onClick={() => window.open(REPO, "_blank")}
        >
          <Image src={gearListIco.src} className="project-icon"
            alt="" rounded fluid />
        </Col>
        <Col md="9">
          <h3>GearList</h3>
          <p>
            Gear management tool to help increase trip safety by allowing one to
            better prepare for adventures. Create gear lists, create gear items,
            add items to lists or lists to items. See gross list weights, and
            real-time pack weight. This tool uses{" "}
            <a
              href="https://vuejs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              VueJS
            </a>{" "}
            and{" "}
            <a
              href="https://muse-ui.org/#/en-US"
              target="_blank"
              rel="noopener noreferrer"
            >
              MuseUI
            </a>{" "}
            for the front-end, and the backend is powered by{" "}
            <a
              href="https://nodejs.org/en/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Node
            </a>
            /
            <a
              href="https://expressjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Express
            </a>
            /
            <a
              href="https://www.mongodb.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mongo
            </a>
            .
          </p>
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
      <ProjectGallery images={SHOTS} projectName="GearList" />
    </div>
  );
}

export default GearList;
