import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import hikingToolIco from "../../../assets/images/apps/hikingtool-ico.png";

function HikingTool() {
  return (
    <div>
      <Row className="project-row">
        <Col
          md="3"
          className="project-col tilt"
          onClick={() =>
            window.open("https://github.com/twknab/mean_hike", "_blank")
          }
        >
          <Image src={hikingToolIco} className="project-icon" rounded fluid />
        </Col>
        <Col md="9">
          <h3>HikingTool</h3>
          <p>
            Hiking risk management tool to help increase trip safety, awareness
            and preparation. Allows creation of hikes along with estimated
            travel times, which was adopted into an algorithm from a backpacking
            book. Includes creation/edit and deltion of pre and post-trip
            experience reports. Powered by{" "}
            <a
              href="https://angularjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              AngularJS
            </a>{" "}
            on the front-end, and{" "}
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
            </a>{" "}
            on the back-end. Developed concept, wireframes and built and
            deployed application.
          </p>
          <Button
            variant="primary"
            size="lg"
            href="https://github.com/twknab/mean_hike"
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

export default HikingTool;
