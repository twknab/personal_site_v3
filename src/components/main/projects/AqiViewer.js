import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithub } from "react-icons/fa";
import aqiViewerIco from "../../../assets/images/apps/aqiviewer-ico.svg";
import dashboard from "../../../assets/images/projects/aqiviewer/dashboard.png";
import overThreshold from "../../../assets/images/projects/aqiviewer/over-threshold.png";
import login from "../../../assets/images/projects/aqiviewer/login.png";
import register from "../../../assets/images/projects/aqiviewer/register.png";
import ProjectGallery from "./ProjectGallery";

const REPO = "https://github.com/twknab/aqi-viewer";

// The dashboard leads: it is the whole point of the app, and a gallery that
// opened on a login form would say nothing about what this thing does.
const SHOTS = [
  {
    src: dashboard,
    alt: "Dashboard showing Seattle at AQI 10, under a threshold of 50",
  },
  {
    src: overThreshold,
    alt: "The same reading over a threshold of 5, flagged red",
  },
  { src: login, alt: "Signing in" },
  { src: register, alt: "Creating an account" },
];

function AqiViewer() {
  return (
    <div className="project-block">
      <Row className="project-row">
        <Col
          md="3"
          className="project-col tilt"
          onClick={() => window.open(REPO, "_blank")}
        >
          <Image
            src={aqiViewerIco.src}
            className="project-icon"
            alt=""
            rounded
            fluid
          />
        </Col>
        <Col md="9">
          <h3>AQI Viewer</h3>
          <p>
            A small app built during a wildfire smoke season: you save your city
            and the air quality number you personally care about, and the
            dashboard tells you whether today is over that line. Built with{" "}
            <a
              href="https://vuejs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vue
            </a>
            ,{" "}
            <a
              href="https://expressjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Express
            </a>
            ,{" "}
            <a
              href="https://www.mongodb.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MongoDB
            </a>
            , and{" "}
            <a
              href="https://getbootstrap.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bootstrap
            </a>
            . Took 2 days to build by hand with custom stylings.
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
      <ProjectGallery images={SHOTS} projectName="AQI Viewer" />
    </div>
  );
}

export default AqiViewer;
