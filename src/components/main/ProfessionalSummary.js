import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import bioPhoto from "../../assets/images/twksmall-966x966.jpeg";
import {
  FaLinkedin,
  FaGithubSquare,
  FaStackOverflow,
} from "react-icons/fa";

function ProfessionalSummary() {
  return (
    <div>
      <Row className="professional-summary light-text-shadow">
        <Col xs={12} s={12} md={12} lg={4} className="tilt">
          <Image src={bioPhoto} roundedCircle fluid className="bio-photo" />
        </Col>
        <Col
          className="professional-summary-description"
          xs={12}
          s={12}
          md={12}
          lg={8}
        >
          <h1>
            <span role="img" aria-label="welcome">
              👋
            </span>{" "}
            Summary
          </h1>
          <p className="light-text-shadow">
            <b className="highlighter">
              Full stack web application developer/engineer
            </b>
            , experienced in a variety of languages and frameworks:{" "}
            <b className="highlighter">JavaScript</b> MEVN/MERN/MEAN (Node,
            Express, Mongo, Vue/React/Angular),{" "}
            <b className="highlighter">Ruby on Rails</b>,{" "}
            <b className="highlighter">LAMP</b> (PHP/Hacklang, XHP/React/Flow),
            <b className="highlighter">Python</b> (Django, Flask) stacks.
            Skillful knowledge of <b className="highlighter">MySQL/NoSQL</b>{" "}
            databases.{" "}
            <b className="highlighter">Goal-oriented & strong work ethic.</b>
          </p>
          <Row className="socials">
            <Col xs={4} s={4} md={4} lg={4} className="justify-content-end tilt">
              <a
                href="https://linkedin.com/in/twknab"
                target="_blank"
                rel="noopener noreferrer"
                className="social-linkedin"
              >
                <FaLinkedin size="6em" className="icon-shadow-light-bg" />
              </a>
            </Col>
            <Col xs={4} s={4} md={4} lg={4} className="tilt">
              <a
                href="https://github.com/twknab"
                target="_blank"
                rel="noopener noreferrer"
                className="social-github"
              >
                <FaGithubSquare size="6em" className="icon-shadow-light-bg" />
              </a>
            </Col>
            <Col xs={4} s={4} md={4} lg={4} className="tilt">
              <a
                href="https://stackoverflow.com/users/6685623/twknab?tab=profile"
                target="_blank"
                rel="noopener noreferrer"
                className="social-stackoverflow"
              >
                <FaStackOverflow size="6em" className="icon-shadow-light-bg" />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ProfessionalSummary;
