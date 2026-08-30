import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import SectionHeading from "../common/SectionHeading";
import bioPhoto from "../../assets/images/twksmall-966x966.jpeg";
import { FaLinkedin, FaGithubSquare, FaStackOverflow } from "react-icons/fa";
import LottieFigure from "../fun/LottieFigure";
import { heroAnimation } from "../../assets/lottie";

function ProfessionalSummary() {
  return (
    <div>
      <Row className="professional-summary light-text-shadow">
        <Col xs={12} s={12} md={12} lg={4} className="tilt bio-photo-col">
          <div className="bio-photo-ring">
            <Image src={bioPhoto.src} roundedCircle fluid className="bio-photo" />
          </div>
          <LottieFigure
            animationData={heroAnimation}
            className="lottie-hero"
            ariaLabel="Animated welcome illustration"
          />
        </Col>
        <Col
          className="professional-summary-description"
          xs={12}
          s={12}
          md={12}
          lg={8}
        >
          <SectionHeading id="welcome" label="Welcome">
            Welcome!
          </SectionHeading>
          <p className="light-text-shadow">
            My name is Tim. I'm a{" "}
            <b className="highlighter">Senior Full Stack Software Engineer</b>{" "}
            specializing in <b className="highlighter">AI applications</b>,{" "}
            <b className="highlighter">Python</b>,{" "}
            <b className="highlighter">Node.js</b> /{" "}
            <b className="highlighter">Express.js</b>,{" "}
            <b className="highlighter">TypeScript</b> /{" "}
            <b className="highlighter">JavaScript</b>,{" "}
            <b className="highlighter">React.js</b>,{" "}
            <b className="highlighter">Ruby on Rails</b>, and{" "}
            <b className="highlighter">MongoDB</b> /{" "}
            <b className="highlighter">MySQL</b> /{" "}
            <b className="highlighter">PostgreSQL</b> databases, with cloud
            infrastructure on{" "}
            <b className="highlighter">Google Cloud Services</b>.{" "}
            <br />
            <br />
            I've implemented{" "}
            <b className="highlighter">cost-saving self-service solutions</b> for{" "}
            <b className="highlighter">FAANG</b> and fast-paced{" "}
            <b className="highlighter">startups</b>, and I'm skillful across all
            stages of the{" "}
            <b className="highlighter">Software Development Life Cycle</b> (
            <b className="highlighter">SDLC</b> /{" "}
            <b className="highlighter">AI-SDLC</b>) and{" "}
            <b className="highlighter">scrum/agile</b> methodologies.{" "}
            <br />
            <br />
            I'm a <b className="highlighter">proactive communicator</b> and{" "}
            <b className="highlighter">strong team-player</b> who continually
            expands my technical expertise. I care deeply about my{" "}
            <b className="highlighter">users</b>, polished{" "}
            <b className="highlighter">digital experiences</b> and bringing{" "}
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
