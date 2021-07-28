import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FitnessTracker from "./projects/FitnessTracker";
import GearList from "./projects/GearList";
import HikingTool from "./projects/HikingTool";
import SockIt from "./projects/SockIt";
import Scroll from "react-scroll";
const Element = Scroll.Element;

function Projects() {
  return (
    <div>
      <Element name="projects"></Element>
      <Row className="projects">
        <Col lg>
          <h1>
            <span role="img" aria-label="about">
              👨‍🎨
            </span>{" "}
            Projects
          </h1>
          <GearList />
          <HikingTool />
          <FitnessTracker />
          <SockIt />
        </Col>
      </Row>
    </div>
  );
}

export default Projects;
