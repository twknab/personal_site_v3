import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import hack from "../../assets/images/stacks/hack-md.png";
import lamp from "../../assets/images/stacks/lamp-stack-sm.png";
import mean from "../../assets/images/stacks/meanstack.png";
import mevn from "../../assets/images/stacks/mevnstack.png";
import python from "../../assets/images/stacks/python-stack.png";
import ror from "../../assets/images/stacks/ruby-on-rails-stack.png";

function Stacks() {
  return (
    <div>
      <Row className="stacks">
        <Col lg className="stack-image ror-image tilt">
          <a
            href="https://rubyonrails.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={ror} fluid />
          </a>
        </Col>
        <Col lg className="stack-image tilt">
          <a
            href="https://www.mongodb.com/mean-stack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={mean} fluid />
          </a>
        </Col>
        <Col lg className="stack-image tilt">
          <a
            href="https://www.geeksforgeeks.org/what-is-mevn-stack/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={mevn} fluid />
          </a>
        </Col>
        <Col lg className="stack-image tilt">
          <a
            href="https://www.python.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={python} fluid />
          </a>
        </Col>
        <Col lg className="stack-image tilt lamp-image">
          <a
            href="https://www.ibm.com/topics/lamp-stack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={lamp} fluid />
          </a>
        </Col>
        <Col lg className="stack-image tilt hack-adjust hack-image">
          <a
            href="https://hacklang.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={hack} fluid />
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default Stacks;
