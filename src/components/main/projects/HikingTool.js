import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithubSquare, FaGlobe } from "react-icons/fa";
import hikingToolIco from "../../../assets/images/apps/hikingtool-ico.png";

function HikingTool() {
  return (
    <div>
      <Row>
        <Col md="3" className="project-col">
          <a href="https://hiking.tools" target="_new">
            <Image src={hikingToolIco} className="project-icon" rounded fluid />
          </a>
        </Col>
        <Col md="9">
          <h3>HikingTool</h3>
          <p>
            <a href="https://hiking.tools" target="_new">
              <FaGlobe size="1.5em" />
            </a>{" "}
            <a href="https://github.com/twknab/mean_hike" target="_new">
              <FaGithubSquare size="1.5em" />
            </a>{" "}
            Hiking risk management tool to help increase trip safety, awareness
            and preparation. Allows creation of hikes along with estimated
            travel times, which was adopted into an algorithm from a backpacking
            book. Includes creation/edit and deltion of pre and post-trip
            experience reports. Powered by{" "}
            <a href="https://angularjs.org/" target="_new">
              AngularJS
            </a>{" "}
            on the front-end, and{" "}
            <a href="https://nodejs.org/en/" target="_new">
              Node
            </a>
            /
            <a href="https://expressjs.com/" target="_new">
              Express
            </a>
            /
            <a href="https://www.mongodb.com/" target="_new">
              Mongo
            </a>{" "}
            on the back-end. Developed concept, wireframes and built and
            deployed application.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default HikingTool;