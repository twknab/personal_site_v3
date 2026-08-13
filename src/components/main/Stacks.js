import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { SiExpo, SiElectron, SiNestjs, SiNextdotjs } from "react-icons/si";

import hack from "../../assets/images/stacks/hack-md.png";
import lamp from "../../assets/images/stacks/lamp-stack-sm.png";
// import mean from "../../assets/images/stacks/meanstack.png";
// import mern from "../../assets/images/stacks/mernstack.png";
// import mevn from "../../assets/images/stacks/mevnstack.png";
import mervan from "../../assets/images/stacks/mervan-stacks.png";
import python from "../../assets/images/stacks/python-stack.png";
import ror from "../../assets/images/stacks/ruby-on-rails-stack.png";

// The stack artwork above is composite PNGs of long-standing stacks. These are
// the frameworks in current use that never got artwork — drawn as vector icons
// from react-icons rather than as new image assets, so they stay crisp and add
// no weight. Brand colours are the official marks.
const MODERN_STACK = [
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#111111",
    href: "https://nextjs.org/",
  },
  {
    name: "NestJS",
    Icon: SiNestjs,
    color: "#e0234e",
    href: "https://nestjs.com/",
  },
  {
    name: "Expo",
    Icon: SiExpo,
    color: "#111111",
    href: "https://expo.dev/",
  },
  {
    name: "Electron",
    Icon: SiElectron,
    color: "#2f6b78",
    href: "https://www.electronjs.org/",
  },
];

function Stacks() {
  return (
    <div>
      <Row className="stacks">
        <Col lg className="stack-image tilt">
          <a
            href="https://www.mongodb.com/mean-stack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={mervan.src} fluid />
          </a>
        </Col>
        <Col lg className="stack-image ror-image tilt">
          <a
            href="https://rubyonrails.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={ror.src} fluid />
          </a>
        </Col>
        {/* <Col lg className="stack-image tilt">
          <a
            href="https://www.mongodb.com/mean-stack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={mern.src} fluid />
          </a>
        </Col>
        <Col lg className="stack-image tilt">
          <a
            href="https://www.mongodb.com/mean-stack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={mean.src} fluid />
          </a>
        </Col>
        <Col lg className="stack-image tilt">
          <a
            href="https://www.geeksforgeeks.org/what-is-mevn-stack/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={mevn.src} fluid />
          </a>
        </Col> */}
        <Col lg className="stack-image tilt">
          <a
            href="https://www.python.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={python.src} fluid />
          </a>
        </Col>
        <Col lg className="stack-image tilt lamp-image">
          <a
            href="https://www.ibm.com/topics/lamp-stack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={lamp.src} fluid />
          </a>
        </Col>
        <Col lg className="stack-image tilt hack-adjust hack-image">
          <a
            href="https://hacklang.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={hack.src} fluid />
          </a>
        </Col>
      </Row>
      <Row className="stacks stacks-modern">
        <Col lg className="stacks-modern-col">
          <span className="stacks-modern-label" id="stacks-modern-label">
            my favorites:
          </span>
          <ul className="stacks-modern-list" aria-labelledby="stacks-modern-label">
            {MODERN_STACK.map(({ name, Icon, color, href }) => (
              <li key={name}>
                <a
                  className="stack-chip tilt"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    className="stack-chip-icon"
                    style={{ color }}
                    aria-hidden="true"
                  />
                  <span>{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default Stacks;
