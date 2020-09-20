import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FcAutomatic, FcNightPortrait, FcElectricity, FcGraduationCap, FcImageFile, FcLandscape, FcLibrary, FcLightAtTheEndOfTunnel, FcMindMap, FcNook, FcReading } from "react-icons/fc";

function PrimaryNavigation() {
  
  const [activeItem, setActiveItem] = useState('home');
  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
    // TODO: Navigate to item.
  };
  const navAboutDropdownTitle = <span><FcMindMap className="primary-nav-icon" /> <span className="nav-dropdown-adjustment">About</span></span>;
  const navInterestsDropdownTitle = <span><FcElectricity className="primary-nav-icon"/> Interests</span>;

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
              <Nav.Link onClick={() => handleNavClick('home')} active={activeItem === 'home'}>
                <FcLibrary className="primary-nav-icon"/>
                Home
              </Nav.Link>
              <NavDropdown title={navAboutDropdownTitle} id="collasible-nav-dropdown-about" className="theme-twk-custom-nav-dropdown">
                <NavDropdown.Item onClick={() => handleNavClick('skills')} active={activeItem === 'skills'}><FcAutomatic className="primary-nav-icon" />Skills</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick('projects')} active={activeItem === 'projects'}><FcLightAtTheEndOfTunnel className="primary-nav-icon" />Projects</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick('education')} active={activeItem === 'education'}><FcGraduationCap className="primary-nav-icon" />Education</NavDropdown.Item>
                <NavDropdown.Divider />
                <Container fluid>
                  <Row center>
                    <Col>
                      <NavDropdown.Item onClick={() => handleNavClick('downloadResume')} active={activeItem === 'downloadResume'} className="download-resume"><FcNightPortrait className="primary-nav-icon"/>Download Resume</NavDropdown.Item>
                    </Col>
                  </Row>
                </Container>
              </NavDropdown>
              <NavDropdown title={navInterestsDropdownTitle} id="collasible-nav-dropdown-interests" className="theme-twk-custom-nav-dropdown">
                <NavDropdown.Item onClick={() => handleNavClick('nature')} active={activeItem === 'nature'}><FcLandscape className="primary-nav-icon"/>Nature</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick('drawing')} active={activeItem === 'drawing'}><FcImageFile className="primary-nav-icon"/>Drawing</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => handleNavClick('blog')} active={activeItem === 'blog'}><FcReading className="primary-nav-icon" />Blog</Nav.Link>
              <Nav.Link eventKey={2} onClick={() => handleNavClick('contact')} active={activeItem === 'contact'}>
                <FcNook className="primary-nav-icon" />Contact
        </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default PrimaryNavigation;
