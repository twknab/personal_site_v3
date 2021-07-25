import React from "react";
import Container from "react-bootstrap/Container";
import AboutMe from "./MainContent/AboutMe";
import Awards from "./MainContent/Awards";
import EducationHistory from "./MainContent/EducationHistory";
import Experience from "./MainContent/Experience";
import ProfessionalSummary from "./MainContent/ProfessionalSummary";
import Projects from "./MainContent/Projects";
import Skills from "./MainContent/Skills";
import Stacks from "./MainContent/Stacks";

function MainContent() {
  return (
    <div>
      <Container fluid="true" className="mainContent">
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
