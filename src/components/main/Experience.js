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
          <h3>Technical Consultant</h3>
          <p>
            {" "}
            <em>
              <a href="https://perficient.com" target="_new">
                Perficient, Inc.
              </a>
            </em>
            , Seattle, WA <b>2019 - Present</b>
          </p>
          <h3>Freelance Web Developer</h3>
          <p>
            <em>
              <b>
                <a
                  href="http://web.archive.org/web/20190415114803/http://sasquatchcreative.com/"
                  target="_new"
                >
                  Sasquat.ch
                </a>
              </b>
            </em>{" "}
            &{" "}
            <em>
              <b>
                <a
                  href="http://web.archive.org/web/20141221044330/http://smartguysdesign.com/"
                  target="_new"
                >
                  SmartGuys Design
                </a>
              </b>
            </em>{" "}
            Seattle, WA <b>2011 – 2019</b>
          </p>
          <h3>Kayak Guide & Website Manager</h3>
          <p>
            <em>
              <a href="https://kayakalki.com" target="_new">
                Alki Kayak Tours
              </a>
            </em>
            , Seattle, WA 2015 – 2016
          </p>
          <h3>Web Producer</h3>
          <p>
            <em>
              <a href="https://sesamecommunication.com" target="_new">
                Sesame Communication
              </a>
            </em>
            , Seattle, WA, 2015 – 2016
          </p>
          <h4>Additional Experience</h4>
          <p>
            <b>Ecommerce Product Manager</b> at{" "}
            <em>
              <a href="https://m2soutfitters.com" target="_new">
                Mountain to Sound Outfitters
              </a>
            </em>
            , <b>Kayak Guide</b> at{" "}
            <em>
              <a href="https://outdoorodysseys.com" target="_new">
                Outdoor Odysseys
              </a>
            </em>
            , <b>Web Producer</b> at{" "}
            <em>
              <a href="https://wyomingwildlife.org" target="_new">
                Wyoming Wildlife Federation
              </a>
            </em>
            , <b>Web Content Administrator</b> at{" "}
            <em>
              <a href="https://nols.edu" target="_new">
                National Outdoor Leadership School
              </a>
            </em>
            , <b>Help Desk Specialist</b> at{" "}
            <em>
              <a
                href="https://www.linkedin.com/company/compleware-corporation"
                target="_new"
              >
                CompleWare
              </a>
            </em>
            , and <b>Help Desk Specialist</b> at{" "}
            <em>
              <a href="https://uiowa.edu" target="_new">
                The University of Iowa
              </a>
            </em>
            .
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Experience;
