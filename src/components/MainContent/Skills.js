import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Skills() {
  return (
    <div>
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
            MEVN/MERN/MEAN (Node, Express, Mongo, Vue/React/Angular), LAMP
            (PHP/Hacklang, XHP/React/Flow), Python (Django, Flask).
          </p>
          <h4>Front-end</h4>
          <p>
            Vue.js, React.js, AngularJS, HTML, CSS, SCSS, JavaScript, JSX,
            Typescript, jQuery, npm, Yarn, Bootstrap, AJAX.
          </p>
          <h4>Back-end</h4>
          <p>
            RESTful APIs, JavaScript, PHP, Hacklang, Python, Node.js,
            Express.js, Flask, Django, Socket.io, CodeIgniter, MongoDB,
            Mongoose, MySQL, Apache, Nginx, Gunicorn.
          </p>
          <h4>Addt'l Skills, Tools and Technologies</h4>
          <p>
            Amazon Web Services, OOP, Mercurial, Git, pip, virtualenv, Linux,
            bash, MVC, DRY, SEO, DNS, cPanel, WordPress, Adobe Creative Cloud
            Suite, gulp, sass.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Skills;
