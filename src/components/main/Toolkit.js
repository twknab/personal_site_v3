import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SectionHeading from "../common/SectionHeading";
import { Element } from "react-scroll";
import TripTimeCalculator from "./toolkit/TripTimeCalculator";

// The Toolkit is for the reusable pieces *behind* the projects — an algorithm,
// a diagram — shown working rather than described. Entry rule: it has to answer
// "what decision does this show?" Anything that is only a file to download
// belongs somewhere else.
function Toolkit() {
  return (
    <div>
      <Element name="toolkit"></Element>
      <Row className="toolkit">
        <Col lg>
          <SectionHeading id="toolkit" label="Toolkit">
            Toolkit
          </SectionHeading>
          <p className="toolkit-intro">
            Working pieces pulled out of the projects — an estimator you can
            actually run. Less polished than a product, more honest than a
            screenshot.
          </p>
          <TripTimeCalculator />
        </Col>
      </Row>
    </div>
  );
}

export default Toolkit;
