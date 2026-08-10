import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import aqiViewerIco from "../../../assets/images/apps/aqiviewer-ico.svg";

const REPO = "https://github.com/twknab/aqi-viewer";

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
            tells you whether today is over that line. Stacked with{" "}
            <a
              href="https://turbo.hotwired.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hotwire
            </a>
            ,{" "}
            <a
              href="https://github.com/bcrypt-ruby/bcrypt-ruby"
              target="_blank"
              rel="noopener noreferrer"
            >
              bcrypt
            </a>
            , and{" "}
            <a
              href="https://www.postgresql.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PostgreSQL
            </a>
            . Took 2 days to build by hand with custom stylings.
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
