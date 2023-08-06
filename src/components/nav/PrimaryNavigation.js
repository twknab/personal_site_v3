import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import timknabLogo from "../../assets/images/timknabdev-logo-light-lg.png";
import Scroll from "react-scroll";
const scroller = Scroll.scroller;

function PrimaryNavigation() {
  // Set active navigation item and offset if mobile
  const [navigationOffset, setNavigationOffset] = useState(0);
  const [activeItem, setActiveItem] = useState("home");

  // set offset for mobile
  useEffect(() => {
    if (window.innerWidth <= 991) {
      setNavigationOffset(324); // NOTE: This value I am unsure where it's coming from, however this seems to get it pretty close for small displays
    }
  }, []);
  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default PrimaryNavigation;
