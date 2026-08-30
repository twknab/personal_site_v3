import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import SectionHeading from "../common/SectionHeading";
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
        {flow.map(({ id, Icon, label, caption, loop, accent }) => (
          <li
            key={id}
            className={`hib-flow-step ${loop ? "is-loop-target" : ""}`}
            // Each step carries its own colour from the site palette, so the
            // pipeline reads as a spectrum rather than five identical boxes.
            style={{ "--step-accent": accent }}
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

/**
 * A cloud of every tool named anywhere in the methodology, deduped, each
 * pointing at the first stage that uses it. Gives a reader the shape of the
 * stack in one glance before they read a word, and doubles as navigation.
 */
function ToolCloud({ onPick }) {
  const seen = new Map();
  stages.forEach((stage) => {
    (stage.tools || []).forEach((tool) => {
      if (!seen.has(tool)) seen.set(tool, stage.id);
    });
  });

  return (
    <div className="hib-cloud">
      <span className="hib-cloud-label">The stack behind it</span>
      <ul className="hib-cloud-list">
        {[...seen.entries()].map(([tool, stageId]) => (
          <li key={tool}>
            <button
              type="button"
              className="hib-tag hib-tag-button"
              onClick={() => onPick(stageId)}
            >
              {tool}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToolChips({ tools }) {
  if (!tools || tools.length === 0) return null;

  return (
    <ul className="hib-tools" aria-label="Tools used at this stage">
      {tools.map((tool) => (
        <li key={tool} className="hib-tag">
          {tool}
        </li>
      ))}
    </ul>
  );
}

function Stage({ stage, index, open, onToggle }) {
  const panelId = `hib-panel-${stage.id}`;
  const { Icon } = stage;

  return (
    <li className="hib-stage" id={`hib-stage-${stage.id}`}>
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
        onClick={onToggle}
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
  const [openIds, setOpenIds] = useState([]);

  const toggle = (id) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  // Picking a tag opens the stage that uses it and scrolls it into view.
  // Opened rather than toggled: arriving at a collapsed stage you just asked
  // to see would be a non-answer.
  const jumpToStage = (id) => {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    // Opening the stage is the part that matters; scrolling is a courtesy.
    // Guarded because not every environment implements scrollIntoView, and a
    // missing convenience should not stop the stage from opening.
    const el = document.getElementById(`hib-stage-${id}`);
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div>
      <Element name="how-i-build"></Element>
      <Row className="how-i-build" data-testid="how-i-build">
        <Col lg>
          <SectionHeading id="how-i-build" label="How I Build">
            <span role="img" aria-label="how i build">
              🛠
            </span>{" "}
            How I Build
          </SectionHeading>

          <p className="hib-revised">Last revised {lastRevised}</p>

          <p className="hib-intro">{intro}</p>

          <FlowDiagram />

          <ToolCloud onPick={jumpToStage} />

          <p className="hib-architect">
            <span className="hib-architect-icon" aria-hidden="true">
              <ArchitectIcon />
            </span>
            {architectText}
          </p>

          <ol className="hib-stages">
            {stages.map((stage, index) => (
              <Stage
                key={stage.id}
                stage={stage}
                index={index}
                open={openIds.includes(stage.id)}
                onToggle={() => toggle(stage.id)}
              />
            ))}
          </ol>
        </Col>
      </Row>
    </div>
  );
}

export default HowIBuild;
