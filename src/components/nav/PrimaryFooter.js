import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithub, FaRegLightbulb } from "react-icons/fa";
import washingtonStateOutline from "../../assets/images/washington-state-outline.png";
import LottieFigure from "../fun/LottieFigure";
import { footerAnimation } from "../../assets/lottie";

// Version-segment tints cycled across the dependency badges.
const BADGE_ACCENTS = [
  "var(--theme-turquoise)",
  "var(--theme-vibrant-yellow-green)",
  "var(--theme-orange)",
  "var(--theme-green)",
];

function PrimaryFooter({ techStack }) {
  return (
    <div>
      <Container
        fluid
        className="pl-0 pr-0 h-100 footer"
        data-testid="primary-footer"
      >
        <LottieFigure
          animationData={footerAnimation}
          className="lottie-footer"
          ariaLabel="Animated footer illustration"
        />
        <Row className="tagline">
          <Col lg>
            <p className="crafted-tag">
              <span className="wa-state">
                <Image src={washingtonStateOutline.src} />
              </span>
              <span className="crafted-with-care">
                Crafted with{" "}
                <span role="img" aria-label="love" className="love-icon">
                  💚
                </span>{" "}
                from Washington
              </span>
            </p>
          </Col>
        </Row>
        {techStack && (
          <Row className="tech-stack">
            <Col lg className="tech-stack-col">
              <span className="tech-stack-label" id="tech-stack-label">
                this site runs on
              </span>
              <ul className="tech-stack-list" aria-labelledby="tech-stack-label">
                <li>
                  <span className="tech-badge">
                    <span className="tech-badge-name">timknab.dev</span>
                    <span
                      className="tech-badge-version"
                      style={{ "--badge-accent": "var(--theme-vibrant-yellow-green)" }}
                    >
                      v{techStack.siteVersion}
                    </span>
                  </span>
                </li>
                {techStack.badges.map((badge, index) => (
                  <li key={badge.name}>
                    <a
                      className="tech-badge"
                      href={badge.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="tech-badge-name">{badge.name}</span>
                      <span
                        className="tech-badge-version"
                        style={{
                          "--badge-accent": BADGE_ACCENTS[index % BADGE_ACCENTS.length],
                        }}
                      >
                        {badge.version}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <span className="tech-badge">
                    <span className="tech-badge-name">Node</span>
                    <span
                      className="tech-badge-version"
                      style={{ "--badge-accent": "var(--theme-green)" }}
                    >
                      {techStack.nodeMajor}
                    </span>
                  </span>
                </li>
              </ul>
            </Col>
          </Row>
        )}
        <Row className="site-source">
          <Col lg className="site-source-col">
            <a
              className="site-source-link"
              href="https://github.com/twknab/personal_site_v3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub aria-hidden="true" /> site source
            </a>
            <span className="site-source-divider" aria-hidden="true">
              &middot;
            </span>
            <a
              className="site-source-link"
              href="https://github.com/twknab/personal_site_v3/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaRegLightbulb aria-hidden="true" /> spot a bug? open an issue
            </a>
          </Col>
        </Row>
        <Row className="copyright">
          <Col lg className="copyright-text">
            <p>
              <span role="img" aria-label="copyright">
                ©
              </span>{" "}
              2021 - {new Date().getFullYear()}{" "}
              <a href="https://timknab.dev">timknab.dev</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrimaryFooter;
