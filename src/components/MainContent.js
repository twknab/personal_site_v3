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
import useScrollReveal from "../hooks/useScrollReveal";

const REVEAL_SECTIONS =
  ".professional-summary, .about-me, .skills, .stacks, .projects, .experience, .education-history, .awards";

function MainContent() {
  useScrollReveal(REVEAL_SECTIONS);

  return (
    <div>
      {/* TODO: add max container height if going into maintainence mode style={{height: "100vh"}}  */}
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
