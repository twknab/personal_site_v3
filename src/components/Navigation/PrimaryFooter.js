import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import washingtonStateOutline from '../../assets/images/washington-state-outline.png';

function PrimaryFooter() {

  return (
    <div>
      <Container
        fluid="true"
        className="pl-0 pr-0 h-100 container-fluid footer"
      >
        <Row>
          <Col lg>
            <p className="handcrafted-tag">
              <Image src={washingtonStateOutline} className="wa-state" />
              Crafted with care in Washington State{" "}
              <span role="img" aria-label="Washington State">
                🌲
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrimaryFooter;
