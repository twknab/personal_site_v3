import React, { useState } from "react";
import { Container, Row, Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaBars, FaFileDownload } from "react-icons/fa";
import resumeFile from "../../assets/docs/timknab_resume_fullstack_engineer.docx";
import timknabLogo from "../../assets/images/timknabdev-logo-light-lg.png";
import Scroll from "react-scroll";
const scroller = Scroll.scroller;

function PrimaryNavigation() {
  // const [navigationOffset, setNavigationOffset] = useState(0);

  // Set active navigation item and offset if mobile
  const [activeItem, setActiveItem] = useState("home");
  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
    let offset = 0;
      if (window.innerWidth <= 991) {
        offset = 324;
        // setNavigationOffset(324);
      }
    scroller.scrollTo(itemName, {
      duration: 1300,
      smooth: "easeOutQuart",
      offset: -offset,
      // containerId: itemName
    });
  };
  const navAboutDropdownTitle = (
    <span className="nav-dropdown-adjustment">About</span>
  );
  // const navInterestsDropdownTitle = <span><FcElectricity /> Interests</span>;

  return (
    <div>
      <Container fluid className="pl-0 pr-0 h-100" id="twk-nav">
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="lg"
          bg="primary"
          variant="dark"
        >
          <Navbar.Brand href="/">
            <img
              src={timknabLogo}
              className="d-inline-block align-top timknab-logo"
              alt="Full Stack Developer TimKnab.dev"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <FaBars className="custom-nav-toggle" />
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav fill className="mr-auto">
              <Nav.Link
                href="/"
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
                  onClick={() => handleNavClick("experience")}
                  active={activeItem === "experience"}
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
                  <Row
                    center="true"
                    className="download-resume-row row-slim-padding"
                  >
                    <Col>
                      <NavDropdown.Item
                        fill="true"
                        href={resumeFile}
                        download="tim_knab_full_stack_developer.docx"
                        onClick={() => handleNavClick("downloadResume")}
                        active={activeItem === ""}
                        className="download-resume"
                      >
                        <FaFileDownload size="1em" />
                        <span>Download Resume</span>
                      </NavDropdown.Item>
                    </Col>
                  </Row>
                </Container>
              </NavDropdown>
              {/* TODO: Add in interests to show more about who you are
              <NavDropdown title={navInterestsDropdownTitle} id="collasible-nav-dropdown-interests" className="theme-twk-custom-nav-dropdown">
                <NavDropdown.Item onClick={() => handleNavClick('nature')} active={activeItem === 'nature'}><FcLandscape />Nature</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick('drawing')} active={activeItem === 'drawing'}><FcImageFile />Drawing</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav fill>
              {/*  TODO: Add blog link once complete
              <Nav.Link
                onClick={() => handleNavClick("blog")}
                active={activeItem === "blog"}
              >
                Blog
              </Nav.Link> */}
              <Nav.Link
                eventKey={2}
                href="https://linkedin.com/in/twknab"
                target="_new"
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
