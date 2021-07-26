import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FitnessTracker from "./projects/FitnessTracker";
import GearList from "./projects/GearList";
import HikingTool from "./projects/HikingTool";
import SockIt from "./projects/SockIt";

function Projects() {
  return (
    <div>
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
