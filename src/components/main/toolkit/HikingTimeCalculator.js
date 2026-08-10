import React, { useMemo, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaChevronDown, FaUndo } from "react-icons/fa";
import {
  BOOK_TIME_DEFAULTS,
  estimateHikingTime,
  formatDuration,
} from "./hikingTime";

const PRESETS = [
  { label: "Rattlesnake Ledge", miles: 4, gain: 1160 },
  { label: "Mailbox Peak", miles: 9.4, gain: 4000 },
  { label: "Enchantments thru-hike", miles: 18, gain: 4500 },
];

const TUNING = [
  {
    key: "paceMph",
    label: "Flat pace",
    unit: "mph",
    min: 0.5,
    max: 5,
    step: 0.1,
  },
  {
    key: "feetPerExtraHour",
    label: "Gain per extra hour",
    unit: "ft",
    min: 250,
    max: 2500,
    step: 50,
  },
  {
    key: "restMinutesPerHour",
    label: "Rest per hour moving",
    unit: "min",
    min: 0,
    max: 20,
    step: 1,
  },
];

function HikingTimeCalculator() {
  const [miles, setMiles] = useState("8");
  const [gain, setGain] = useState("500");
  const [tuning, setTuning] = useState(BOOK_TIME_DEFAULTS);
  const [tuningOpen, setTuningOpen] = useState(false);

  const result = useMemo(
    () => estimateHikingTime(miles, gain, tuning),
    [miles, gain, tuning]
  );

  const isTuned = TUNING.some(
    ({ key }) => Number(tuning[key]) !== BOOK_TIME_DEFAULTS[key]
  );

  const segments = [
    { key: "flat", label: "Walking", hours: result.flatHours },
    { key: "climb", label: "Climbing", hours: result.climbHours },
    { key: "rest", label: "Resting", hours: result.restHours },
  ];

  const applyPreset = ({ miles: m, gain: g }) => {
    setMiles(String(m));
    setGain(String(g));
  };

  return (
    <div className="toolkit-card" data-testid="hiking-time-calculator">
      <div className="toolkit-card-head">
        <h3>Hiking time estimator</h3>
        <span className="toolkit-tag">Algorithm &middot; 2017</span>
      </div>

      <p className="toolkit-card-blurb">
        Distance alone is a bad predictor of how long a hike takes — 9 miles
        with 4,000 ft of gain is a completely different day than 9 flat miles.
        This is &ldquo;Book Time,&rdquo; adapted from Rick Curtis&rsquo;{" "}
        <em>The Backpacker&rsquo;s Handbook</em>, and it is the same estimate
        that powers trip planning in HikingTool. It runs entirely in your
        browser.
      </p>

      <Row className="toolkit-calc">
        <Col md="5" className="toolkit-calc-inputs">
          <label className="toolkit-field" htmlFor="hike-miles">
            <span className="toolkit-field-label">Distance</span>
            <span className="toolkit-input-wrap">
              <input
                id="hike-miles"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
              />
              <span className="toolkit-unit">mi</span>
            </span>
          </label>

          <label className="toolkit-field" htmlFor="hike-gain">
            <span className="toolkit-field-label">Elevation gain</span>
            <span className="toolkit-input-wrap">
              <input
                id="hike-gain"
                type="number"
                inputMode="numeric"
                min="0"
                step="50"
                value={gain}
                onChange={(e) => setGain(e.target.value)}
              />
              <span className="toolkit-unit">ft</span>
            </span>
          </label>

          <div className="toolkit-presets">
            <span className="toolkit-presets-label">Try one</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className="toolkit-preset"
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </Col>

        <Col md="7" className="toolkit-calc-output">
          <div className="toolkit-result">
            <span className="toolkit-result-label">Plan for about</span>
            <span className="toolkit-result-value" data-testid="hiking-total">
              {formatDuration(result.totalHours)}
            </span>
          </div>

          <div
            className="toolkit-bar"
            role="img"
            aria-label={`Walking ${formatDuration(
              result.flatHours
            )}, climbing ${formatDuration(
              result.climbHours
            )}, resting ${formatDuration(result.restHours)}`}
          >
            {segments.map(({ key, hours }) => (
              <span
                key={key}
                className={`toolkit-bar-seg toolkit-bar-seg--${key}`}
                style={{
                  width: result.totalHours
                    ? `${(hours / result.totalHours) * 100}%`
                    : "0%",
                }}
              />
            ))}
          </div>

          <ul className="toolkit-breakdown">
            {segments.map(({ key, label, hours }) => (
              <li key={key}>
                <span className={`toolkit-dot toolkit-dot--${key}`} />
                <span className="toolkit-breakdown-label">{label}</span>
                <span className="toolkit-breakdown-value">
                  {formatDuration(hours)}
                </span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>

      <div className="toolkit-tuning">
        <button
          type="button"
          className="toolkit-disclosure"
          aria-expanded={tuningOpen}
          onClick={() => setTuningOpen((open) => !open)}
        >
          <FaChevronDown
            className={`toolkit-chevron ${tuningOpen ? "is-open" : ""}`}
            aria-hidden="true"
          />
          Tune the assumptions
          {isTuned && <span className="toolkit-tuned-flag">edited</span>}
        </button>

        {tuningOpen && (
          <div className="toolkit-tuning-body">
            <p className="toolkit-tuning-note">
              The book is explicit that these constants &ldquo;may need to be
              adjusted depending upon the individual, group or trip
              needs.&rdquo; The 2017 version hard-coded them; this one does not.
            </p>
            {TUNING.map(({ key, label, unit, min, max, step }) => (
              <label className="toolkit-slider" key={key} htmlFor={`tune-${key}`}>
                <span className="toolkit-slider-label">
                  {label}
                  <strong>
                    {tuning[key]} {unit}
                  </strong>
                </span>
                <input
                  id={`tune-${key}`}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={tuning[key]}
                  onChange={(e) =>
                    setTuning((prev) => ({
                      ...prev,
                      [key]: Number(e.target.value),
                    }))
                  }
                />
              </label>
            ))}
            <button
              type="button"
              className="toolkit-reset"
              onClick={() => setTuning(BOOK_TIME_DEFAULTS)}
              disabled={!isTuned}
            >
              <FaUndo aria-hidden="true" /> Reset to the book
            </button>
          </div>
        )}
      </div>

      <p className="toolkit-formula">
        <code>
          time = (miles ÷ {tuning.paceMph}) + (gain ÷ {tuning.feetPerExtraHour})
          + moving hours × {tuning.restMinutesPerHour} min
        </code>
      </p>

      <p className="toolkit-provenance">
        Minutes round up on purpose — on a trail, over-estimating is the safe
        direction. Porting it here also fixed a latent bug in the original:
        whole-hour results crashed the formatter.{" "}
        <a
          href="https://github.com/twknab/mean_hiking_algorithm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Original 2017 source
        </a>
      </p>
    </div>
  );
}

export default HikingTimeCalculator;
