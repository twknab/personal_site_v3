import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

function MainContent() {
  return (
    <div>
      <Container fluid="true" className="mainContent">
        <Row className="professional-summary">
          <Col lg>
            {/* <Card>
              <Card.Body> */}
            <h1 className="light-text-shadow">
              <span role="img" aria-label="welcome">
                👋
              </span>{" "}
              Summary
            </h1>
            <p>
              <b>Full stack web application developer/engineer</b>, experienced
              in a variety of languages and frameworks: JavaScript
              MEVN/MERN/MEAN (Node, Express, Mongo, Vue/React/Angular), LAMP
              (PHP/Hacklang, XHP/React/Flow), Python (Django, Flask) stacks.
              Skillful knowledge of MySQL/NoSQL databases. Goal-oriented
              communicator, strong work ethic.
            </p>
            {/* </Card.Body>
            </Card> */}
          </Col>
        </Row>
        <Row className="about-me">
          <Col lg>
            <h1>
              <span role="img" aria-label="about">
                🗣
              </span>{" "}
              About
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
              . I enjoy learning about complex systems and understanding their
              connections. I believe that our future depends on a healthy
              relationship with both ecology and technology, working together
              for us and for the planet{" "}
              <span role="img" aria-label="earth">
                🌎
              </span>
              . I wish to be a part of meaningful projects with honest goals. In
              my free time, I like to explore my backyard in Washington, lounge
              around, or be aimlessly creative.
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
            <p>
              Lorem ipsum <a href="#">dolor sit amet</a>, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Vestibulum rhoncus est pellentesque elit ullamcorper.
              Maecenas ultricies mi eget mauris pharetra et ultrices neque
              ornare. Ut sem nulla pharetra diam. Mauris augue neque gravida in
              fermentum et. Nulla facilisi cras fermentum odio eu feugiat
              pretium nibh. Mauris cursus mattis molestie a iaculis at erat
              pellentesque. Nulla pellentesque dignissim enim sit amet venenatis
              urna. Cursus vitae congue mauris rhoncus aenean vel elit.
              Imperdiet sed euismod nisi porta. Orci nulla pellentesque
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
        <Row className="projects">
          <Col lg>
            <h1>
              <span role="img" aria-label="about">
                👨‍🎨
              </span>{" "}
              Projects
            </h1>
            <p>
              Lorem ipsum <a href="#">dolor sit amet</a>, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Vestibulum rhoncus est pellentesque elit ullamcorper.
              Maecenas ultricies mi eget mauris pharetra et ultrices neque
              ornare. Ut sem nulla pharetra diam. Mauris augue neque gravida in
              fermentum et. Nulla facilisi cras fermentum odio eu feugiat
              pretium nibh. Mauris cursus mattis molestie a iaculis at erat
              pellentesque. Nulla pellentesque dignissim enim sit amet venenatis
              urna. Cursus vitae congue mauris rhoncus aenean vel elit.
              Imperdiet sed euismod nisi porta. Orci nulla pellentesque
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
              Lorem ipsum <a href="#">dolor sit amet</a>, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Vestibulum rhoncus est pellentesque elit ullamcorper.
              Maecenas ultricies mi eget mauris pharetra et ultrices neque
              ornare. Ut sem nulla pharetra diam. Mauris augue neque gravida in
              fermentum et. Nulla facilisi cras fermentum odio eu feugiat
              pretium nibh. Mauris cursus mattis molestie a iaculis at erat
              pellentesque. Nulla pellentesque dignissim enim sit amet venenatis
              urna. Cursus vitae congue mauris rhoncus aenean vel elit.
              Imperdiet sed euismod nisi porta. Orci nulla pellentesque
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
        <Row className="education-history">
          <Col lg>
            <h1 className="light-text-shadow">
              <span role="img" aria-label="about">
                🎓
              </span>{" "}
              education history
            </h1>
            <p>
              Lorem ipsum <a href="#">dolor sit amet</a>, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Vestibulum rhoncus est pellentesque elit ullamcorper.
              Maecenas ultricies mi eget mauris pharetra et ultrices neque
              ornare. Ut sem nulla pharetra diam. Mauris augue neque gravida in
              fermentum et. Nulla facilisi cras fermentum odio eu feugiat
              pretium nibh. Mauris cursus mattis molestie a iaculis at erat
              pellentesque. Nulla pellentesque dignissim enim sit amet venenatis
              urna. Cursus vitae congue mauris rhoncus aenean vel elit.
              Imperdiet sed euismod nisi porta. Orci nulla pellentesque
              dignissim enim sit amet venenatis urna cursus. Quisque non tellus
              orci ac auctor augue mauris augue neque. Tincidunt lobortis
              feugiat vivamus at augue eget arcu dictum. Sit amet porttitor eget
              dolor. Purus ut faucibus pulvinar elementum integer enim neque
              volutpat.
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg>
            <Row>
              <h1>Column 3</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Vestibulum rhoncus est pellentesque elit ullamcorper. Maecenas
                ultricies mi eget mauris pharetra et ultrices neque ornare. Ut
                sem nulla pharetra diam. Mauris augue neque gravida in fermentum
                et. Nulla facilisi cras fermentum odio eu feugiat pretium nibh.
                Mauris cursus mattis molestie a iaculis at erat pellentesque.
                Nulla pellentesque dignissim enim sit amet venenatis urna.
                Cursus vitae congue mauris rhoncus aenean vel elit. Imperdiet
                sed euismod nisi porta. Orci nulla pellentesque dignissim enim
                sit amet venenatis urna cursus. Quisque non tellus orci ac
                auctor augue mauris augue neque. Tincidunt lobortis feugiat
                vivamus at augue eget arcu dictum. Sit amet porttitor eget
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
                malesuada fames ac turpis egestas. Tincidunt eget nullam non
                nisi. Eget duis at tellus at urna condimentum mattis
                pellentesque.
              </p>
              <p>
                Sagittis vitae et leo duis. In tellus integer feugiat
                scelerisque varius morbi enim nunc faucibus. Velit aliquet
                sagittis id consectetur. In ante metus dictum at tempor commodo
                ullamcorper a lacus. Leo vel orci porta non pulvinar neque
                laoreet. Quam elementum pulvinar etiam non quam lacus
                suspendisse faucibus. Cursus metus aliquam eleifend mi in.
                Lobortis scelerisque fermentum dui faucibus in ornare quam
                viverra orci. Ullamcorper morbi tincidunt ornare massa eget
                egestas. Tempus egestas sed sed risus pretium quam vulputate.
                Viverra orci sagittis eu volutpat odio facilisis mauris sit
                amet. Pellentesque habitant morbi tristique senectus et netus
                et. Ut venenatis tellus in metus vulputate eu. Ac tortor
                dignissim convallis aenean et tortor at risus.
              </p>
            </Row>
          </Col>
          <Col lg>
            <Row>
              <h1>Column 4</h1>
              <h2>These are the</h2>
              <h3>Smaller headings and how</h3>
              <h4>They appear as they</h4>
              <h5>scale from heading one</h5>
              <h6>down to heading six</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Vestibulum rhoncus est pellentesque elit ullamcorper. Maecenas
                ultricies mi eget mauris pharetra et ultrices neque ornare. Ut
                sem nulla pharetra diam. Mauris augue neque gravida in fermentum
                et. Nulla facilisi cras fermentum odio eu feugiat pretium nibh.
                Mauris cursus mattis molestie a iaculis at erat pellentesque.
                Nulla pellentesque dignissim enim sit amet venenatis urna.
                Cursus vitae congue mauris rhoncus aenean vel elit. Imperdiet
                sed euismod nisi porta. Orci nulla pellentesque dignissim enim
                sit amet venenatis urna cursus. Quisque non tellus orci ac
                auctor augue mauris augue neque. Tincidunt lobortis feugiat
                vivamus at augue eget arcu dictum. Sit amet porttitor eget
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
                malesuada fames ac turpis egestas. Tincidunt eget nullam non
                nisi. Eget duis at tellus at urna condimentum mattis
                pellentesque.
              </p>
              <p>
                Sagittis vitae et leo duis. In tellus integer feugiat
                scelerisque varius morbi enim nunc faucibus. Velit aliquet
                sagittis id consectetur. In ante metus dictum at tempor commodo
                ullamcorper a lacus. Leo vel orci porta non pulvinar neque
                laoreet. Quam elementum pulvinar etiam non quam lacus
                suspendisse faucibus. Cursus metus aliquam eleifend mi in.
                Lobortis scelerisque fermentum dui faucibus in ornare quam
                viverra orci. Ullamcorper morbi tincidunt ornare massa eget
                egestas. Tempus egestas sed sed risus pretium quam vulputate.
                Viverra orci sagittis eu volutpat odio facilisis mauris sit
                amet. Pellentesque habitant morbi tristique senectus et netus
                et. Ut venenatis tellus in metus vulputate eu. Ac tortor
                dignissim convallis aenean et tortor at risus.
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainContent;
