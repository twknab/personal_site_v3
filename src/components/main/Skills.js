import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Scroll from 'react-scroll';
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
          <h4>Stacks & Languages</h4>
          <p>
            Ruby on Rails, JavaScript: MEVN/MERN/MEAN (Node, Express, Mongo,
            Vue/React/Angular), LAMP (PHP/Hacklang, XHP/React/Flow), Python
            (Django & Flask) stacks
          </p>
          <h4>Front-end</h4>
          <p>
            React.js, Vue.js, AngularJS, front-end testing: jest/react testing
            library, HTML, CSS, SCSS, JavaScript, JSX, Typescript, Storybook,
            jQuery, Bootstrap, AJAX
          </p>
          <h4>Back-end</h4>
          <p>
            RESTful APIs, Back-end testing, rspec, JavaScript, Ruby, PHP,
            Hacklang, Python, Node.js, Express.js, Socket.io, CodeIgniter,
            MongoDB, Mongoose, MySQL, PostgreSQL, Apache, Nginx, Gunicorn
          </p>
          <h4>Other Tools & Technologies</h4>
          <p>
            Amazon Web Services, Docker, agile/scrum, Jira, Formstack API,
            DropboxSign API, OOP, MVC, DRY, Mercurial, Git, Github, npm, yarn,
            pip, virtualenv, nvm, rvm, Linux, bash, SEO, DNS, cPanel, Adobe
            Creative Cloud Suite, gulp, sass
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Skills;
