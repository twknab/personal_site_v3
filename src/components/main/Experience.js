import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Scroll from "react-scroll";
import experiences from "./experience/experienceList";
import telepathModemImage from "../../assets/images/gateway-2000-telepath-modem.jpg";
import gateway2000Image from "../../assets/images/gateway-2000-p5-133.jpg";
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
                href={gateway2000Image}
                target="_blank"
                rel="noopener noreferrer"
              >
                Gateway 2000 P5-133
              </a>{" "}
              's{" "}
              <a
                href={telepathModemImage}
                target="_blank"
                rel="noopener noreferrer"
              >
                Telepath 28.8K modem
              </a>{" "}
              was connected to the web. I love expressing creativity through
              digital experiences, and believe that being a developer is a
              life-long learning journey full of challenges and growth.
            </em>
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Experience;
