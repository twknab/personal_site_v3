import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SectionHeading from "../common/SectionHeading";
import Scroll from "react-scroll";
import skills from "./skills/skillsList";
const Element = Scroll.Element;

function Skills() {
  const chunkedSkills = [];
  for (let i = 0; i < skills.length; i += 16) {
    chunkedSkills.push(skills.slice(i, i + 16));
  }

  return (
    <div>
      <Element name="skills"></Element>
      <Row className="skills">
        <Col lg>
          <SectionHeading id="skills" label="Skills">
            <span role="img" aria-label="about">
              ⚒️
            </span>{" "}
            Skills
          </SectionHeading>
          {/* TODO: Add more rows, and break skills into categories to match current resume template */}
          <Row className="skills-wrapper">
            {chunkedSkills.map((chunk, idx) => (
              <Col lg key={idx}>
                <ul>
                  {chunk.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Skills;
