import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

function MainContent() {

  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg>Col 1</Col>
          <Col lg>Col 2</Col>
        </Row>
        <Row>
          <Col lg>Col 3</Col>
          <Col lg>Col 4</Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainContent;
