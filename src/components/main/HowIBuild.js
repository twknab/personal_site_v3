import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import { Element } from "react-scroll";
import { FaChevronDown } from "react-icons/fa";
import {
  architectNote,
  flow,
  intro,
  lastRevised,
  loopLabel,
  stages,
} from "./how-i-build/methodology";

/**
 * The pipeline, drawn rather than described.
 *
 * Built from flex/CSS rather than a fixed SVG so it reflows: a horizontal
 * run of steps on a wide screen, a vertical stack on a phone, with the
 * connector arrows rotating to match. An SVG at this size would either
 * shrink its labels to nothing on mobile or need a second drawing.
 *
 * It is decorative in the sense that the stages below carry the same
 * information in prose — so it is aria-hidden, and the list underneath is
 * the accessible source of truth.
 */
function FlowDiagram() {
  return (
    <div className="hib-flow-wrap">
      <ol className="hib-flow" aria-hidden="true">
        {flow.map(({ id, Icon, label, caption, loop }) => (
          <li
            key={id}
            className={`hib-flow-step ${loop ? "is-loop-target" : ""}`}
          >
            <span className="hib-flow-icon">
              <Icon />
            </span>
            <span className="hib-flow-label">{label}</span>
            <span className="hib-flow-caption">{caption}</span>
          </li>
        ))}
      </ol>
      <p className="hib-flow-loop" aria-hidden="true">
        <span className="hib-flow-loop-arrow" />
        {loopLabel}
      </p>
    </div>
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
  const { Icon } = stage;

  return (
    <li className="hib-stage">
      {/*
        A real <button>, not the role="button" div the Reading section uses:
        Enter/Space and focus semantics come free rather than being
        reimplemented, and it is announced correctly.
      */}
      <button
        type="button"
        className="hib-stage-header"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="hib-stage-icon" aria-hidden="true">
          <Icon />
        </span>
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
          </div>
        </div>
      </Collapse>
    </li>
  );
}

function HowIBuild() {
  const { Icon: ArchitectIcon, text: architectText } = architectNote;

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

          <FlowDiagram />

          <p className="hib-architect">
            <span className="hib-architect-icon" aria-hidden="true">
              <ArchitectIcon />
            </span>
            {architectText}
          </p>

          <ol className="hib-stages">
            {stages.map((stage, index) => (
              <Stage key={stage.id} stage={stage} index={index} />
            ))}
          </ol>

          <p className="hib-revised">Methodology last revised {lastRevised}.</p>
        </Col>
      </Row>
    </div>
  );
}

export default HowIBuild;
