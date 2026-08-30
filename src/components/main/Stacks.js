import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import {
  SiExpo,
  SiElectron,
  SiNestjs,
  SiNextdotjs,
  SiGooglecloud,
  SiFirebase,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

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
// no weight. `color` is the official mark, used for the spine and glyph;
// `gradient` is the two-stop brand pair washed under the chip surface.
const MODERN_STACK = [
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#111111",
    gradient: ["#111111", "#5a5a5a"],
    href: "https://nextjs.org/",
  },
  {
    name: "NestJS",
    Icon: SiNestjs,
    color: "#e0234e",
    gradient: ["#e0234e", "#ff6f91"],
    href: "https://nestjs.com/",
  },
  {
    name: "Expo",
    Icon: SiExpo,
    color: "#111111",
    gradient: ["#111111", "#4630eb"],
    href: "https://expo.dev/",
  },
  {
    name: "Electron",
    Icon: SiElectron,
    color: "#2f6b78",
    gradient: ["#2f6b78", "#6fc3d6"],
    href: "https://www.electronjs.org/",
  },
  {
    name: "Google Cloud",
    Icon: SiGooglecloud,
    color: "#1a73e8",
    gradient: ["#1a73e8", "#34a853"],
    href: "https://cloud.google.com/",
  },
  {
    name: "Firebase",
    Icon: SiFirebase,
    color: "#dd8b0b",
    gradient: ["#dd8b0b", "#ffca28"],
    href: "https://firebase.google.com/",
  },
  {
    // react-icons carries no Firestore mark, and reusing the Firebase flame
    // would make two different chips look identical. A database glyph in
    // Firestore's amber reads correctly and stays visually distinct.
    name: "Firestore",
    Icon: FaDatabase,
    color: "#f5820b",
    gradient: ["#f5820b", "#ffca28"],
    href: "https://firebase.google.com/docs/firestore",
  },
];

function Stacks() {
  return (
    <div className="stacks-section">
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
            {/*
              aria-hidden so the list's accessible name stays "my favorites"
              rather than "party my favorites" — it's decoration, and every
              other section heading on the site leads with an emoji the same way.
            */}
            <span className="stacks-modern-emoji" aria-hidden="true">
              🎉
            </span>
            my favorites
          </span>
          <ul className="stacks-modern-list" aria-labelledby="stacks-modern-label">
            {MODERN_STACK.map(({ name, Icon, color, gradient, href }) => (
              <li key={name}>
                <a
                  className="stack-chip tilt"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Each chip carries its brand colors as custom properties:
                  // one accent for the spine, icon, border and glow, and a
                  // two-stop gradient washed under the surface.
                  style={{
                    "--chip-accent": color,
                    "--chip-from": gradient[0],
                    "--chip-to": gradient[1],
                  }}
                >
                  <Icon className="stack-chip-icon" aria-hidden="true" />
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
