import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import hack from "../../assets/images/stacks/hack-md.png";
import lamp from "../../assets/images/stacks/lamp-stack-sm.png";
import mean from "../../assets/images/stacks/meanstack.png";
import mevn from "../../assets/images/stacks/mevnstack.png";
import python from "../../assets/images/stacks/python-stack.png";

function Stacks() {
  return (
    <div>
      <Row className="stacks">
        <Col lg className="stack-image stack-image-adjust hack-image">
          <Image src={hack} fluid />
        </Col>
        <Col lg className="stack-image stack-image-adjust">
          <Image src={lamp} fluid />
        </Col>
        <Col lg className="stack-image">
          <Image src={mean} fluid />
        </Col>
        <Col lg className="stack-image">
          <Image src={mevn} fluid />
        </Col>
        <Col lg className="stack-image">
          <Image src={python} fluid />
        </Col>
      </Row>
    </div>
  );
}

export default Stacks;
