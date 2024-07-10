import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Scroll from "react-scroll";
import experiences from "./experience/experienceList";
const Element = Scroll.Element;

function Experience() {
  const colorVars = [
    "--theme-vibrant-yellow-green",
    "--theme-turquoise",
    "--theme-green",
    "--theme-orange",
    "--theme-red",
    "--theme-darkPurple",
  ];

  return (
    <div>
      <Element nameName="experience"></Element>
      <Row className="experience">
        <h1>
          <span role="img" aria-label="about">
            🏋️‍♂️
          </span>{" "}
          experience
        </h1>
        <Col lg>
          {experiences.map((experience, index) => (
            <div
              className="experience-block"
              key={index}
              style={{
                borderLeftColor: `var(${colorVars[index % colorVars.length]})`,
              }}
            >
              <h3>{experience.jobTitle}</h3>
              <p>
                <b>
                  {experience.startYear}-{experience.endYear}
                </b>{" "}
                -{" "}
                <em>
                  <b>{experience.companyName}</b>
                </em>
                , {experience.city}, {experience.stateAbbreviation}
              </p>
            </div>
          ))}
        </Col>
        <Col lg className="experience-description-wrapper">
          <p className="experience-description">
            💠{" "}
            <em>
              I've been building websites since our family's{" "}
              <a
                href="https://duckduckgo.com/?t=ffab&q=Gateway+2000+P5-133&iax=images&ia=images"
                target="new"
              >
                Gateway 2000 P5-133
              </a>{" "}
              's Telepath 28.8K modem was connected to the web. I love
              expressing creativity through digital experiences, and believe
              that being a developer is a life-long learning journey full of
              challenges and growth.
            </em>
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Experience;
