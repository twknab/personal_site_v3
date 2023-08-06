import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Scroll from "react-scroll";
import experiences from "./experience/experienceList";
const Element = Scroll.Element;

function Experience() {
  return (
    <div>
      <Element name="experience"></Element>
      <Row className="experience">
        <Col lg>
          <h1>
            <span role="img" aria-label="about">
              🏋️‍♂️
            </span>{" "}
            experience
          </h1>
          <p>
            I've been working with computers and building websites since getting
            the internet hooked up to our{" "}
            <a
              href="https://duckduckgo.com/?t=ffab&q=Gateway+2000+P5-133&iax=images&ia=images"
              target="new"
            >
              Gateway 2000 P5-133
            </a>{" "}
            's Telepath 28.8K modem. I love being creative and believe that
            being a developer is a life-long learning journey full of challenges
            and growth.
          </p>
          <Row class="experience-content-wrapper">
            <Col lg>
              {experiences.map((experience) => (
                <div class="experience-block">
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
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Experience;
