import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import aqiViewerIco from "../../../assets/images/apps/aqiviewer-ico.svg";

const REPO = "https://github.com/twknab/playing_with_devise";

function AqiViewer() {
  return (
    <div>
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
            A small{" "}
            <a
              href="https://rubyonrails.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rails
            </a>{" "}
            app built during a wildfire smoke season: you save your city and the
            air quality number you personally care about, and the dashboard
            tells you whether today is over that line. Authentication is
            hand-rolled rather than{" "}
            <a
              href="https://github.com/heartcombo/devise"
              target="_blank"
              rel="noopener noreferrer"
            >
              Devise
            </a>{" "}
            — the point of the exercise was to understand sessions and password
            digests instead of delegating them. Two days of work in 2023, never
            deployed, and included here because the idea was mine rather than an
            assignment&rsquo;s.
          </p>
          <Button
            variant="primary"
            size="lg"
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default AqiViewer;
