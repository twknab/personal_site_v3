import React from 'react';
import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function PrimaryNavigation() {

  return (
    <div>
      <Container fluid>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Navbar.Brand href="#home">
            <img
              src="http://sasquatchcreative.com/wp-content/uploads/2018/03/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="About" id="collasible-nav-dropdown-about">
                <NavDropdown.Item href="#skills">Skills</NavDropdown.Item>
                <NavDropdown.Item href="#projects">Projects</NavDropdown.Item>
                <NavDropdown.Item href="#education">Education</NavDropdown.Item>
                <NavDropdown.Divider />
                <Container fluid>
                  <Row center>
                    <Col>
                      <NavDropdown.Item href="#download-resume">Download Resume</NavDropdown.Item>
                    </Col>
                  </Row>
                </Container>
              </NavDropdown>
              <NavDropdown title="Interests" id="collasible-nav-dropdown-interests">
                <NavDropdown.Item href="#nature">Nature</NavDropdown.Item>
                <NavDropdown.Item href="#drawing">Drawing</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#blog">Blog</Nav.Link>
              <Nav.Link eventKey={2} href="#contact">
                Contact
        </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default PrimaryNavigation;
