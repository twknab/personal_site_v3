import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import squirrelStudioIco from "../../../assets/images/apps/squirrelstudio-ico.png";

function SquirrelStudio() {
  return (
    <div>
      <Row className="project-row">
        <Col md="3" className="project-col tilt">
          <Image
            src={squirrelStudioIco}
            className="project-icon"
            rounded
            fluid
          />
        </Col>
        <Col md="9">
          <h3>SquirrelStudio</h3>
          <p>
            A desktop studio for building generative music and visuals together,
            in sync. A piece is a single &ldquo;Scene&rdquo; &mdash; one
            validated document describing the audio (tempo, key, layered synths,
            effects) and the picture (pattern family, palette, motion) &mdash;
            which{" "}
            <a
              href="https://www.anthropic.com/claude"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claude
            </a>{" "}
            can write from a prompt or mutate from wherever you already are. Both
            halves share one clock and the visuals run off a live frequency
            analysis of the audio actually playing, so the picture breathes with
            the sound. Built with{" "}
            <a
              href="https://www.electronjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Electron
            </a>{" "}
            and{" "}
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            , with{" "}
            <a
              href="https://threejs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Three.js
            </a>{" "}
            (
            <a
              href="https://r3f.docs.pmnd.rs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              react-three-fiber
            </a>
            ) driving the visuals,{" "}
            <a
              href="https://tonejs.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tone.js
            </a>{" "}
            for synthesis, and a{" "}
            <a
              href="https://nestjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NestJS
            </a>{" "}
            service brokering the AI. In private development.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default SquirrelStudio;
