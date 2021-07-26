import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithubSquare } from "react-icons/fa";
import sockitIco from "../../../assets/images/apps/sockit-ico.png";

function SockIt() {
  return (
    <div>
      <Row>
        <Col md="3" className="project-col">
          <a href="https://github.com/twknab/sockets_chat" target="_new">
            <Image src={sockitIco} className="project-icon" rounded fluid />
          </a>
        </Col>
        <Col md="9">
          <h3>Sock It!</h3>
          <p>
            <a href="https://github.com/twknab/sockets_chat" target="_new">
              <FaGithubSquare size="1.5em" />
            </a>{" "}
            Lightweight chat application, powered by{" "}
            <a href="https://socket.io/" target="_new">
              Socket.io
            </a>{" "}
            and{" "}
            <a href="https://expressjs.com/" target="_new">
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
