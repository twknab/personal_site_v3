import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Scroll from "react-scroll";
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
          <Row>
            <Col lg>
              <div class="experience-block">
                <h3>🧑‍💻 Software Engineer</h3>
                <p>
                  {" "}
                  <em>
                    <b>Sana Benefits</b>
                  </em>
                  , Austin, TX <b>2022 - 2023</b>
                </p>
              </div>
              <div class="experience-block">
                <h3>🧑‍💻 Software Engineer</h3>
                <p>
                  {" "}
                  <em>
                    <b>Perficient, Inc.</b>
                  </em>
                  , St. Louis, MO <b>2019 - 2022</b>
                </p>
              </div>
              <div class="experience-block">
                <h3>🧑‍💻 Software Engineer</h3>
                <p>
                  <em>
                    <b>Sasquat.ch</b>
                  </em>
                  , Bothell, WA <b>2016 – 2019</b>
                </p>
              </div>
            </Col>
            <Col lg>
              <div class="experience-block">
                <h3>🛠️ Web Developer</h3>
                <p>
                  <em>
                    <b>Sesame Communication</b>
                  </em>
                  , Seattle, WA, <b>2015 – 2016</b>
                </p>
              </div>
              <div class="experience-block">
                <h3>🛠️ Web Developer</h3>
                <p>
                  <em>
                    <b>SmartGuys Design</b>
                  </em>
                  , Kansas City, MO <b>2011 – 2015</b>
                </p>
              </div>
              <div class="experience-block">
                <h3>⚙️ Web Content Administrator</h3>
                <p>
                  <em>
                    <b>National Outdoor Leadership School</b>
                  </em>
                  , Lander, WY <b>2011 – 2012</b>
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Experience;
