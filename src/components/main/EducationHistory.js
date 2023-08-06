import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Scroll from "react-scroll";
const Element = Scroll.Element;

function EducationHistory() {
  return (
    <div>
      <Element name="education"></Element>
      <Row className="education-history link-light-bg">
        <Col lg className="light-text-shadow">
          <h1>
            <span role="img" aria-label="about">
              🎓
            </span>{" "}
            Education History
          </h1>
          <h4>Full Stack Web Application Development: Software Engineering</h4>
          <h5>
            <a
              href="https://codingdojo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Coding Dojo
            </a>
          </h5>
          <p>
            Full stack web development, from wireframes to deployment at the{" "}
            <a
              href="https://codingdojo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Coding Dojo
            </a>
            .
          </p>
          <h4>Bachelors of Science: Environmental Science</h4>
          <h5>
            <a
              href="https://uiowa.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              The University of Iowa
            </a>
          </h5>
          <p>
            Student involvement and study of natural sciences at{" "}
            <a
              href="https://uiowa.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              The University of Iowa
            </a>
            .
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default EducationHistory;
