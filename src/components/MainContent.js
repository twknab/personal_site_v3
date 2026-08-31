import React from "react";
import Container from "react-bootstrap/Container";
import AboutMe from "./main/AboutMe";
import Awards from "./main/Awards";
import EducationHistory from "./main/EducationHistory";
import Experience from "./main/Experience";
import ProfessionalSummary from "./main/ProfessionalSummary";
import Projects from "./main/Projects";
import HowIBuild from "./main/HowIBuild";
import { HeadingIconDefs } from "./common/headingIcons";
import Reading from "./main/Reading";
import RecentlyShipped from "./main/RecentlyShipped";
import Skills from "./main/Skills";
import Stacks from "./main/Stacks";
import Toolkit from "./main/Toolkit";
import useScrollReveal from "../hooks/useScrollReveal";

const REVEAL_SECTIONS =
  ".professional-summary, .about-me, .skills, .stacks, .projects, .how-i-build, .recently-shipped, .toolkit, .experience, .education-history, .awards, .reading";

function MainContent({ recentActivity }) {
  useScrollReveal(REVEAL_SECTIONS);

  return (
    <div>
      {/* TODO: add max container height if going into maintainence mode style={{height: "100vh"}}  */}
      <Container fluid className="mainContent" data-testid="main-content">
        <HeadingIconDefs />
        <ProfessionalSummary />
        <AboutMe />
        <Skills />
        <Stacks />
        <Projects />
        <HowIBuild />
        <RecentlyShipped items={recentActivity} />
        <Toolkit />
        <Experience />
        <EducationHistory />
        <Awards />
        <Reading />
      </Container>
    </div>
  );
}

export default MainContent;
