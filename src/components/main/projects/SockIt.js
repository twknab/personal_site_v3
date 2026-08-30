import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithub } from "react-icons/fa";
import sockitIco from "../../../assets/images/apps/sockit-ico.png";

const REPO = "https://github.com/twknab/sockets_chat";

function SockIt() {
  return (
    <div className="project-block">
      <Row className="project-row">
        <Col
          md="3"
          className="project-col tilt"
          onClick={() => window.open(REPO, "_blank")}
        >
          <Image src={sockitIco.src} className="project-icon"
            alt="" rounded fluid />
        </Col>
        <Col md="9">
          <h3>Sock It!</h3>
          <p>
            Lightweight chat application, powered by{" "}
            <a
              href="https://socket.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Socket.io
            </a>{" "}
            and{" "}
            <a
              href="https://expressjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ExpressJS
            </a>
            . Allows real-time chatting with timestamp conversion for user
            timezones.
          </p>
          <Button
            variant="primary"
            size="lg"
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn"
          >
            <FaGithub aria-hidden="true" />
            View on GitHub
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SockIt;
