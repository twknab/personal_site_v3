import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

function PrimaryFooter() {

  return (
    <div>
      <Container fluid className="pl-0 pr-0 footer">
        <Row>
          <Col lg>Footer</Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrimaryFooter;
