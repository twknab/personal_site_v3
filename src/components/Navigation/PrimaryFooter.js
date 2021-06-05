import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import washingtonStateOutline from "../../assets/images/washington-state-outline.png";

function PrimaryFooter() {
  return (
    <div>
      <Container
        fluid="true"
        className="pl-0 pr-0 h-100 container-fluid footer"
      >
        <Row>
          <Col lg className="footer-tagline">
            <p className="handcrafted-tag">
              <span class="crafted-with-care">Crafted with care in</span>
              <span className="wa-state">
                <Image src={washingtonStateOutline} />
                Washington State
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrimaryFooter;
