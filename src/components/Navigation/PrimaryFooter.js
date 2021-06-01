import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

function PrimaryFooter() {

  return (
    <div>
      <Container fluid="true" className="pl-0 pr-0 h-100 container-fluid footer">
        <Row>
          <Col lg><p className="handcrafted-tag">Handcrafted with care in Washington State <span role="img" aria-label="Washington State">🌲</span></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrimaryFooter;
