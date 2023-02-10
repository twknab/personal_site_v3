import React from "react";
import Container from "react-bootstrap/Container";
import AboutMe from "./main/AboutMe";
import Awards from "./main/Awards";
import EducationHistory from "./main/EducationHistory";
import Experience from "./main/Experience";
import ProfessionalSummary from "./main/ProfessionalSummary";
import Projects from "./main/Projects";
import Skills from "./main/Skills";
import Stacks from "./main/Stacks";

function MainContent() {
  return (
    <div>
      <Container fluid="true" className="mainContent" data-testid="main-content">
        <ProfessionalSummary />
        <AboutMe />
        <Skills />
        <Stacks />
        <Projects />
        <Experience />
        <EducationHistory />
        <Awards />
      </Container>
    </div>
  );
}

export default MainContent;
