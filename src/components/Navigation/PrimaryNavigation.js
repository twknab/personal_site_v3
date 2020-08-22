import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { primaryNavItems, primaryRightSideNavItems} from './navItems.js';

console.log(primaryNavItems, primaryRightSideNavItems);
// TODO: Refactor menu items into the above export (primaryNavItems etc) then loop the stuff below so this component is cleaner


function PrimaryNavigation() {
  
  const [activeItem, setActiveItem] = useState('home');
  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
    // TODO: Navigate to item.
  };

  return (
    <div>
      <Container fluid className="pl-0 pr-0">
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
              <Nav.Link onClick={() => handleNavClick('home')} active={activeItem === 'home'}>Home</Nav.Link>
              <NavDropdown title="About" id="collasible-nav-dropdown-about">
                <NavDropdown.Item onClick={() => handleNavClick('skills')} active={activeItem === 'skills'}>Skills</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick('projects')} active={activeItem === 'projects'}>Projects</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick('education')} active={activeItem === 'education'}>Education</NavDropdown.Item>
                <NavDropdown.Divider />
                <Container fluid>
                  <Row center>
                    <Col>
                      <NavDropdown.Item onClick={() => handleNavClick('downloadResume')} active={activeItem === 'downloadResume'}>Download Resume</NavDropdown.Item>
                    </Col>
                  </Row>
                </Container>
              </NavDropdown>
              <NavDropdown title="Interests" id="collasible-nav-dropdown-interests">
                <NavDropdown.Item onClick={() => handleNavClick('nature')} active={activeItem === 'nature'}>Nature</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick('drawing')} active={activeItem === 'drawing'}>Drawing</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => handleNavClick('blog')} active={activeItem === 'blog'}>Blog</Nav.Link>
              <Nav.Link eventKey={2} onClick={() => handleNavClick('contact')} active={activeItem === 'contact'}>
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
