import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function AboutMe() {
  return (
    <div>
      <Row className="about-me">
        <Col lg>
          <h1>
            <span role="img" aria-label="about">
              🗣
            </span>{" "}
            About Me
          </h1>
          <p>
            My background is in software engineering{" "}
            <span role="img" aria-label="technology">
              🧑‍💻
            </span>{" "}
            and environmental science{" "}
            <span role="img" aria-label="nature">
              🌱
            </span>
            . I enjoy learning about complex systems and their connections. I
            believe our well-being depends on a healthy relationship with both
            technology and ecology -- working together -- for us and for the
            planet{" "}
            <span role="img" aria-label="earth">
              🌎
            </span>
            . I wish to be a part of meaningful projects with honest goals. In
            my free time, I like to explore my backyard in Washington, learn
            about new things, or be aimlessly creative.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default AboutMe;
