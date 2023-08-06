import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Scroll from "react-scroll";
const Element = Scroll.Element;

function Skills() {
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
          <p>
            Agile Software Development, APIs, Asana Software, AWS, Browser
            Compatibility Testing, Circle CI, Code Review, Coding,
            Collaboration, Confluence, CSS3, Data Modeling, Detail Oriented,
            Docker, End To End Testing, Estimation, Express.js, Figma, Git,
            GitHub, GraphQL, Guru, HTML5, Integration Testing, JavaScript, Jest,
            Jira, Material UI, MongoDB, MVC Architecture, MySQL, Node.js,
            On-Call Rotation, Organization, Passionate, PHP, Pixel-Perfect
            Components, Positive Attitude, Postgres, Problem Solving, Python,
            React Testing Library, React.js, RSpec, Ruby, Ruby on Rails, Ruby
            Version Manager, SCSS, Slack, Software Development Life Cycle, Team
            Development, Team Player, Technical Documentation, Time Management,
            Triaging, TypeScript, Unit Testing, Vue.js, Web Applications
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Skills;
