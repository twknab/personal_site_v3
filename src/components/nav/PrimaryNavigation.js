import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import timknabLogo from "../../assets/images/timknabdev-logo-light-lg.png";
import Scroll from "react-scroll";
const scroller = Scroll.scroller;

// NOTE: This value I am unsure where it's coming from, however this seems to
// get it pretty close for small displays.
const MOBILE_SCROLL_OFFSET = 324;

function PrimaryNavigation() {
  const [activeItem, setActiveItem] = useState("home");

  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
    // Read the width at click time rather than once on mount, so the offset
    // stays correct after a resize or orientation change.
    const navigationOffset =
      window.innerWidth <= 991 ? MOBILE_SCROLL_OFFSET : 0;
    scroller.scrollTo(itemName, {
      duration: 1300,
      smooth: "easeOutQuart",
      offset: -navigationOffset,
    });
  };
  // Add title to nav drop down
  const navAboutDropdownTitle = (
    <span className="nav-dropdown-adjustment">About</span>
  );

  return (
    <div>
      <Container
        fluid
        className="pl-0 pr-0 h-100"
        id="twk-nav"
        data-testid="primary-navigation"
      >
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="lg"
          bg="primary"
          variant="dark"
        >
          <Navbar.Brand href="/">
            <img
              src={timknabLogo.src}
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
                data-testid="primary-nav-dropdown"
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
              </NavDropdown>
              <Nav.Link
                onClick={() => handleNavClick("reading")}
                active={activeItem === "reading"}
              >
                Reading
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default PrimaryNavigation;
