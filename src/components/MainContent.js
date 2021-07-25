import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import bioPhoto from "../assets/images/twksmall-966x966.jpeg";
// TODO: Move these to their own component eventually when breaking up body
import hack from "../assets/images/stacks/hack-md.png";
import lamp from "../assets/images/stacks/lamp-stack-sm.png";
import mean from "../assets/images/stacks/meanstack.png";
import mevn from "../assets/images/stacks/mevnstack.png";
import python from "../assets/images/stacks/python-stack.png";
import {
  FaCaretRight,
  FaLinkedin,
  FaGithubSquare,
  FaStackOverflow,
} from "react-icons/fa";

function MainContent() {
  return (
    <div>
      <Container fluid="true" className="mainContent">
        <Row className="professional-summary light-text-shadow">
          <Col xs={12} s={12} md={12} lg={4}>
            <Image src={bioPhoto} roundedCircle fluid className="bio-photo" />
          </Col>
          <Col
            className="professional-summary-description"
            xs={12}
            s={12}
            md={12}
            lg={8}
          >
            <h1>
              <span role="img" aria-label="welcome">
                👋
              </span>{" "}
              Summary
            </h1>
            <p className="light-text-shadow">
              <b className="highlighter">
                Full stack web application developer/engineer
              </b>
              , experienced in a variety of languages and frameworks: JavaScript
              MEVN/MERN/MEAN (Node, Express, Mongo, Vue/React/Angular), LAMP
              (PHP/Hacklang, XHP/React/Flow), Python (Django, Flask) stacks.
              Skillful knowledge of MySQL/NoSQL databases.{" "}
              <b className="highlighter">Goal-oriented & strong work ethic.</b>
            </p>
            <Row className="socials">
              <Col xs={4} s={4} md={4} lg={4} className="justify-content-end">
                <a
                  href="https://linkedin.com/in/twknab"
                  target="_new"
                  className="social-linkedin"
                >
                  <FaLinkedin size="4em" className="icon-shadow-light-bg" />
                </a>
              </Col>
              <Col xs={4} s={4} md={4} lg={4}>
                <a
                  href="https://github.com/twknab"
                  target="_new"
                  className="social-github"
                >
                  <FaGithubSquare size="4em" className="icon-shadow-light-bg" />
                </a>
              </Col>
              <Col xs={4} s={4} md={4} lg={4}>
                <a
                  href="https://stackoverflow.com/users/6685623/twknab?tab=profile"
                  target="_new"
                  className="social-stackoverflow"
                >
                  <FaStackOverflow
                    size="4em"
                    className="icon-shadow-light-bg"
                  />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="about-me">
          <Col lg>
            <h1>
              <span role="img" aria-label="about">
                🗣
              </span>{" "}
              About Me
            </h1>
            <p>
              My background is in web technology{" "}
              <span role="img" aria-label="technology">
                🧑‍💻
              </span>{" "}
              and environmental science{" "}
              <span role="img" aria-label="nature">
                🌱
              </span>
              . I enjoy learning about complex systems and their connections. I
              believe our well-being depends on a healthy relationship with both
              ecology and technology -- working together -- for us and for the
              planet{" "}
              <span role="img" aria-label="earth">
                🌎
              </span>
              . I wish to be a part of meaningful projects with honest goals. In
              my free time, I like to explore my backyard in Washington, learn about new things, or be aimlessly creative.
            </p>
          </Col>
        </Row>
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
        <Row className="stacks">
          <Col lg className="stack-image stack-image-adjust hack-image">
            <Image src={hack} fluid />
          </Col>
          <Col lg className="stack-image stack-image-adjust">
            <Image src={lamp} fluid />
          </Col>
          <Col lg className="stack-image">
            <Image src={mean} fluid />
          </Col>
          <Col lg className="stack-image">
            <Image src={mevn} fluid />
          </Col>
          <Col lg className="stack-image">
            <Image src={python} fluid />
          </Col>
        </Row>
        <Row className="projects">
          <Col lg>
            <h1>
              <span role="img" aria-label="about">
                👨‍🎨
              </span>{" "}
              Projects
            </h1>
            <p>
              Lorem ipsum <a href="https://duckduckgo.com">dolor sit amet</a>,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Vestibulum rhoncus est pellentesque
              elit ullamcorper. Maecenas ultricies mi eget mauris pharetra et
              ultrices neque ornare. Ut sem nulla pharetra diam. Mauris augue
              neque gravida in fermentum et. Nulla facilisi cras fermentum odio
              eu feugiat pretium nibh. Mauris cursus mattis molestie a iaculis
              at erat pellentesque. Nulla pellentesque dignissim enim sit amet
              venenatis urna. Cursus vitae congue mauris rhoncus aenean vel
              elit. Imperdiet sed euismod nisi porta. Orci nulla pellentesque
              dignissim enim sit amet venenatis urna cursus. Quisque non tellus
              orci ac auctor augue mauris augue neque. Tincidunt lobortis
              feugiat vivamus at augue eget arcu dictum. Sit amet porttitor eget
              dolor. Purus ut faucibus pulvinar elementum integer enim neque
              volutpat.
            </p>
            <p>
              Sed libero enim sed faucibus turpis in eu mi bibendum. Posuere
              urna nec tincidunt praesent semper feugiat nibh. Eget mauris
              pharetra et ultrices neque ornare. Maecenas ultricies mi eget
              mauris pharetra. Et molestie ac feugiat sed lectus vestibulum.
              Risus ultricies tristique nulla aliquet enim. Velit euismod in
              pellentesque massa placerat duis ultricies lacus. Netus et
              malesuada fames ac turpis egestas. Tincidunt eget nullam non nisi.
              Eget duis at tellus at urna condimentum mattis pellentesque.
            </p>
          </Col>
        </Row>
        <Row className="experience">
          <Col lg>
            <h1>
              <span role="img" aria-label="about">
                🏋️‍♂️
              </span>{" "}
              experience
            </h1>
            <p>
              Lorem ipsum <a href="https://duckduckgo.com">dolor sit amet</a>,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Vestibulum rhoncus est pellentesque
              elit ullamcorper. Maecenas ultricies mi eget mauris pharetra et
              ultrices neque ornare. Ut sem nulla pharetra diam. Mauris augue
              neque gravida in fermentum et. Nulla facilisi cras fermentum odio
              eu feugiat pretium nibh. Mauris cursus mattis molestie a iaculis
              at erat pellentesque. Nulla pellentesque dignissim enim sit amet
              venenatis urna. Cursus vitae congue mauris rhoncus aenean vel
              elit. Imperdiet sed euismod nisi porta. Orci nulla pellentesque
              dignissim enim sit amet venenatis urna cursus. Quisque non tellus
              orci ac auctor augue mauris augue neque. Tincidunt lobortis
              feugiat vivamus at augue eget arcu dictum. Sit amet porttitor eget
              dolor. Purus ut faucibus pulvinar elementum integer enim neque
              volutpat.
            </p>
            <p>
              Sed libero enim sed faucibus turpis in eu mi bibendum. Posuere
              urna nec tincidunt praesent semper feugiat nibh. Eget mauris
              pharetra et ultrices neque ornare. Maecenas ultricies mi eget
              mauris pharetra. Et molestie ac feugiat sed lectus vestibulum.
              Risus ultricies tristique nulla aliquet enim. Velit euismod in
              pellentesque massa placerat duis ultricies lacus. Netus et
              malesuada fames ac turpis egestas. Tincidunt eget nullam non nisi.
              Eget duis at tellus at urna condimentum mattis pellentesque.
            </p>
          </Col>
        </Row>
        <Row className="education-history link-light-bg">
          <Col lg className="light-text-shadow">
            <h1>
              <span role="img" aria-label="about">
                🎓
              </span>{" "}
              education history
            </h1>
            <h4>Full Stack Web Development</h4>
            <h5>Coding Dojo, 2017-2020</h5>
            <p>
              Full stack web development, from wireframes to deployment at the{" "}
              <a href="https://codingdojo.com" target="_new">Coding Dojo</a>.
            </p>
            <h4>Bachelors of Science: Environmental Science</h4>
            <h5>The University of Iowa, 2008</h5>
            <p>
              Student involvement and study of natural sciences at{" "}
              <a href="https://uiowa.edu" target="_new">The University of Iowa</a>.
            </p>
          </Col>
        </Row>
        <Row className="awards">
          <Col lg>
            <h1>
              <span role="img" aria-label="awards">
                ⭐️
              </span>{" "}
              Awards
            </h1>
            <p>
              <FaCaretRight size="1.2em" />
              Student recycling work lead to University of Iowa receiving
              $60,000 DNR grant and Iowa Recycling Association Best Practices
              Award.
            </p>
            <p>
              <FaCaretRight size="1.2em" />
              Awarded student conservation{" "}
              <a
                href="https://www.continuetolearn.uiowa.edu/lakesidelab/university/scholarships/parker-gentry.html"
                target="_new"
              >
                Parker Gentry Award
              </a>{" "}
              and $700 scholarship for my performance and group leadership
              during field work.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainContent;
