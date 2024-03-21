import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import bioPhoto from "../../assets/images/twksmall-966x966.jpeg";
import { FaLinkedin, FaGithubSquare, FaStackOverflow } from "react-icons/fa";

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
          lg={9}
        >
          <h1>
            <span role="img" aria-label="welcome">
              👋
            </span>{" "}
            Welcome!
          </h1>
          <p className="light-text-shadow">
            My name is Tim. I'm a{" "}
            <b className="highlighter">Full Stack Software Engineer</b>,
            specializing in: <b className="highlighter">Node.js/Express.js</b>,{" "}
            <b className="highlighter">React.js</b>,{" "}
            <b className="highlighter">Vue.js</b>,{" "}
            <b className="highlighter">JavaScript</b>,{" "}
            <b className="highlighter">Ruby on Rails</b>,{" "}
            <b className="highlighter">MongoDB</b> /{" "}
            <b className="highlighter">MySQL</b> /{" "}
            <b className="highlighter">Postgres</b> databases. I'm a{" "}
            <b className="highlighter">motivated</b>{" "}
            <b className="highlighter">team-player</b>, comfortable with all
            aspects of the{" "}
            <b className="highlighter">Software Development Life Cycle</b>. I
            continually seek to expand my technical expertise and stay on top of
            current trends and the latest technologies. I care deeply about my
            <b className="highlighter">users</b> and bringing{" "}
            <b className="highlighter">strong value to my team</b>.
          </p>
          <Row className="socials">
            <Col
              xs={4}
              s={4}
              md={4}
              lg={4}
              className="justify-content-end tilt"
            >
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
