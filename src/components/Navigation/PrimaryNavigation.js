import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  FaFileDownload,
  // FaHammer,
  // FaFire,
  // FaGraduationCap,
} from "react-icons/fa";

function PrimaryNavigation() {
  
  const [activeItem, setActiveItem] = useState('home');
  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
    // TODO: Navigate to item.
  };
  const navAboutDropdownTitle = <span className="nav-dropdown-adjustment">About</span>;
  // const navInterestsDropdownTitle = <span><FcElectricity className="primary-nav-icon"/> Interests</span>;

  return (
    <div>
      <Container fluid className="pl-0 pr-0 h-100">
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="lg"
          bg="primary"
          variant="dark"
        >
          <Navbar.Brand href="#home">
            <img
              src="https://timknab.dev/wp-content/uploads/2021/01/timknabdev-logo-light-lg.png"
              className="d-inline-block align-top timknab-logo"
              alt="Full Stack Developer TimKnab.dev"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav fill className="mr-auto">
              <Nav.Link
                onClick={() => handleNavClick("home")}
                active={activeItem === "home"}
              >
                Home
              </Nav.Link>
              <NavDropdown
                title={navAboutDropdownTitle}
                id="collasible-nav-dropdown-about"
                className="theme-twk-custom-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => handleNavClick("skills")}
                  active={activeItem === "skills"}
                >
                  Skills
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handleNavClick("projects")}
                  active={activeItem === "projects"}
                >
                  Projects
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handleNavClick("education")}
                  active={activeItem === "education"}
                >
                  Experience
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handleNavClick("education")}
                  active={activeItem === "education"}
                >
                  Education History
                </NavDropdown.Item>
                <Container fluid>
                  <Row center className="resume-cta row-slim-padding">
                    <Col>
                      <NavDropdown.Item
                        fill
                        onClick={() => handleNavClick("downloadResume")}
                        active={activeItem === "downloadResume"}
                        className="download-resume"
                      >
                        <FaFileDownload
                          className="primary-nav-icon"
                          size="1em"
                        />
                        Download Resume
                      </NavDropdown.Item>
                    </Col>
                  </Row>
                </Container>
              </NavDropdown>
              {/* <NavDropdown title={navInterestsDropdownTitle} id="collasible-nav-dropdown-interests" className="theme-twk-custom-nav-dropdown">
                <NavDropdown.Item onClick={() => handleNavClick('nature')} active={activeItem === 'nature'}><FcLandscape className="primary-nav-icon"/>Nature</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick('drawing')} active={activeItem === 'drawing'}><FcImageFile className="primary-nav-icon"/>Drawing</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav fill>
              <Nav.Link
                onClick={() => handleNavClick("blog")}
                active={activeItem === "blog"}
              >
                Blog
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                onClick={() => handleNavClick("contact")}
                active={activeItem === "contact"}
              >
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
