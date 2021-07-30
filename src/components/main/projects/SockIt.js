import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithubSquare } from "react-icons/fa";
import sockitIco from "../../../assets/images/apps/sockit-ico.png";

function SockIt() {
  return (
    <div>
      <Row className="project-row">
        <Col md="3" className="project-col">
          <a href="https://github.com/twknab/sockets_chat" target="_blank" rel="noopener noreferrer">
            <Image src={sockitIco} className="project-icon" rounded fluid />
          </a>
        </Col>
        <Col md="9">
          <h3>Sock It!</h3>
          <p>
            <a href="https://github.com/twknab/sockets_chat" target="_blank" rel="noopener noreferrer">
              <FaGithubSquare size="1.5em" />
            </a>{" "}
            Lightweight chat application, powered by{" "}
            <a href="https://socket.io/" target="_blank" rel="noopener noreferrer">
              Socket.io
            </a>{" "}
            and{" "}
            <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">
              ExpressJS
            </a>
            . Allows real-time chatting with timestamp conversion for user
            timezones.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default SockIt;
