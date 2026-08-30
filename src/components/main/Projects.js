import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SectionHeading from "../common/SectionHeading";
import AqiViewer from "./projects/AqiViewer";
import FitnessTracker from "./projects/FitnessTracker";
import FrogGarden from "./projects/FrogGarden";
import GearList from "./projects/GearList";
import HikingTool from "./projects/HikingTool";
import RoamGuru from "./projects/RoamGuru";
import SockIt from "./projects/SockIt";
import SquirrelStudio from "./projects/SquirrelStudio";
import Scroll from "react-scroll";
const Element = Scroll.Element;

function Projects() {
  return (
    <div>
      <Element name="projects"></Element>
      <Row className="projects">
        <Col lg>
          <SectionHeading id="projects" label="Projects">
            <span role="img" aria-label="about">
              👨‍🎨
            </span>{" "}
            Projects
          </SectionHeading>
          {/* Newest work first; the older experiments bring up the rear. */}
          <SquirrelStudio />
          <FrogGarden />
          <RoamGuru />
          <GearList />
          <HikingTool />
          <FitnessTracker />
          <SockIt />
          <AqiViewer />
        </Col>
      </Row>
    </div>
  );
}

export default Projects;
