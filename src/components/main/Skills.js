import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Scroll from "react-scroll";
import skills from "./skills/skillsList";
const Element = Scroll.Element;

function Skills() {
  const chunkedSkills = [];
  for (let i = 0; i < skills.length; i += 15) {
    chunkedSkills.push(skills.slice(i, i + 15));
  }

  return (
    <div>
      <Element name="skills"></Element>
      <Row className="skills">
        <Col lg>
          <h1>
            <span role="img" aria-label="about">
              ⚒️
            </span>{" "}
            Skills
          </h1>
          <Row className="skills-wrapper">
            {chunkedSkills.map((chunk, idx) => (
              <Col lg>
                <ul key={idx}>
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
