import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import { Element } from "react-scroll";
import { FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
import {
  caseStudies,
  intro,
  lastRevised,
  stages,
} from "./how-i-build/methodology";

function EvidenceLinks({ links }) {
  // Optional field: render nothing at all rather than an empty label (FR-012).
  if (!links || links.length === 0) return null;

  return (
    <p className="hib-evidence">
      <span className="hib-evidence-label">Evidence:</span>
      {links.map((link) => (
        <a
          key={link.href}
          className="hib-evidence-link"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaExternalLinkAlt aria-hidden="true" />
          {link.label}
        </a>
      ))}
    </p>
  );
}

function ToolChips({ tools }) {
  if (!tools || tools.length === 0) return null;

  return (
    <ul className="hib-tools" aria-label="Tools used at this stage">
      {tools.map((tool) => (
        <li key={tool} className="hib-tool-chip">
          {tool}
        </li>
      ))}
    </ul>
  );
}

function Stage({ stage, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `hib-panel-${stage.id}`;

  return (
    <li className="hib-stage">
      {/*
        A real <button> rather than the role="button" div the Reading section
        uses: Enter/Space and focus semantics come for free instead of being
        reimplemented, and screen readers announce it correctly.
      */}
      <button
        type="button"
        className="hib-stage-header"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="hib-stage-index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="hib-stage-heading">
          <span className="hib-stage-name">{stage.name}</span>
          <span className="hib-stage-summary">{stage.summary}</span>
        </span>
        <FaChevronDown
          className={`hib-chevron ${open ? "is-open" : ""}`}
          aria-hidden="true"
        />
      </button>

      <Collapse in={open}>
        <div id={panelId}>
          <div className="hib-stage-detail">
            {stage.detail.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <ToolChips tools={stage.tools} />
            <EvidenceLinks links={stage.evidence} />
          </div>
        </div>
      </Collapse>
    </li>
  );
}

function HowIBuild() {
  return (
    <div>
      <Element name="how-i-build"></Element>
      <Row className="how-i-build" data-testid="how-i-build">
        <Col lg>
          <h1>
            <span role="img" aria-label="how i build">
              🛠
            </span>{" "}
            How I Build
          </h1>

          <p className="hib-intro">{intro}</p>

          <ol className="hib-stages">
            {stages.map((stage, index) => (
              <Stage key={stage.id} stage={stage} index={index} />
            ))}
          </ol>

          <h3 className="hib-cases-heading">What it caught</h3>
          <ul className="hib-cases">
            {caseStudies.map((study) => (
              <li key={study.id} className="hib-case">
                <h4 className="hib-case-title">{study.title}</h4>
                <p className="hib-case-body">{study.body}</p>
                <a
                  className="hib-evidence-link"
                  href={study.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt aria-hidden="true" />
                  {study.link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="hib-revised">
            Methodology last revised {lastRevised}.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default HowIBuild;
