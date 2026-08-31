import React, { useMemo, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaChevronDown, FaHiking, FaUndo } from "react-icons/fa";
import { GiCanoe } from "react-icons/gi";
import {
  BOOK_TIME_DEFAULTS,
  estimateHikingTime,
  formatDuration,
} from "./hikingTime";
import { estimateKayakTime, KAYAK_TIME_DEFAULTS } from "./kayakTime";

const HIKING_PRESETS = [
  { label: "Rattlesnake Ledge", miles: 4, gain: 1160 },
  { label: "Mailbox Peak", miles: 9.4, gain: 4000 },
  { label: "Enchantments thru-hike", miles: 18, gain: 4500 },
];

// Deliberately generic conditions, not named routes — real crossings deserve
// real tide and current tables, and this card is a classroom, not a chart.
const KAYAK_PRESETS = [
  {
    label: "Calm lake loop",
    nm: 5,
    currentKn: 0,
    currentDirection: "slack",
    windKn: 4,
    windDirection: "beam",
  },
  {
    label: "Crossing into a headwind",
    nm: 8,
    currentKn: 1,
    currentDirection: "against",
    windKn: 12,
    windDirection: "head",
  },
  {
    label: "Riding the ebb home",
    nm: 6,
    currentKn: 2,
    currentDirection: "with",
    windKn: 6,
    windDirection: "tail",
  },
];

const HIKING_TUNING = [
  { key: "paceMph", label: "Flat pace", unit: "mph", min: 0.5, max: 5, step: 0.1 },
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

const KAYAK_TUNING = [
  {
    key: "paddleSpeedKn",
    label: "Paddling speed",
    unit: "kn",
    min: 1.5,
    max: 5,
    step: 0.1,
  },
  {
    key: "restMinutesPerHour",
    label: "Rest per hour paddling",
    unit: "min",
    min: 0,
    max: 20,
    step: 1,
  },
];

const CURRENT_DIRECTIONS = [
  { value: "against", label: "Against" },
  { value: "slack", label: "Slack" },
  { value: "with", label: "With" },
];

const WIND_DIRECTIONS = [
  { value: "head", label: "Head" },
  { value: "beam", label: "Beam" },
  { value: "tail", label: "Tail" },
];

// One control per question: a labeled row of mutually exclusive buttons.
// Radios in trench coats — aria-pressed carries the state to screen readers.
function Segmented({ label, options, value, onChange }) {
  return (
    <div className="toolkit-seg" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`toolkit-seg-btn ${
            value === option.value ? "is-active" : ""
          }`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function NumberField({ id, label, unit, unitTitle, value, onChange, step }) {
  return (
    <label className="toolkit-field" htmlFor={id}>
      <span className="toolkit-field-label">{label}</span>
      <span className="toolkit-input-wrap">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="toolkit-unit" title={unitTitle}>
          {unit}
        </span>
      </span>
    </label>
  );
}

function Tuning({ idPrefix, note, tuning, config, defaults, onChange }) {
  const isTuned = config.some(
    ({ key }) => Number(tuning[key]) !== defaults[key]
  );
  const [open, setOpen] = useState(false);

  return (
    <div className="toolkit-tuning">
      <button
        type="button"
        className="toolkit-disclosure"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaChevronDown
          className={`toolkit-chevron ${open ? "is-open" : ""}`}
          aria-hidden="true"
        />
        Tune the assumptions
        {isTuned && <span className="toolkit-tuned-flag">edited</span>}
      </button>

      {open && (
        <div className="toolkit-tuning-body">
          <p className="toolkit-tuning-note">{note}</p>
          {config.map(({ key, label, unit, min, max, step }) => (
            <label
              className="toolkit-slider"
              key={key}
              htmlFor={`${idPrefix}-${key}`}
            >
              <span className="toolkit-slider-label">
                {label}
                <strong>
                  {tuning[key]} {unit}
                </strong>
              </span>
              <input
                id={`${idPrefix}-${key}`}
                type="range"
                min={min}
                max={max}
                step={step}
                value={tuning[key]}
                onChange={(e) => onChange(key, Number(e.target.value))}
              />
            </label>
          ))}
          <button
            type="button"
            className="toolkit-reset"
            onClick={() => onChange(null, defaults)}
            disabled={!isTuned}
          >
            <FaUndo aria-hidden="true" /> Reset defaults
          </button>
        </div>
      )}
    </div>
  );
}

function ResultPanel({ total, speedNote, segments, barLabel, warning }) {
  if (warning) {
    return (
      <div className="toolkit-warning" role="status">
        <strong>The water is winning.</strong> At these settings your speed
        made good is {warning} — you are not making headway, and no honest
        number of hours fixes that. The real answer is to wait for slack,
        shorten the crossing, or stay on shore.
      </div>
    );
  }

  return (
    <>
      <div className="toolkit-result">
        <span className="toolkit-result-label">Plan for about</span>
        <span className="toolkit-result-value" data-testid="hiking-total">
          {total}
        </span>
        {speedNote && <span className="toolkit-speed">{speedNote}</span>}
      </div>

      <div className="toolkit-bar" role="img" aria-label={barLabel}>
        {segments.map(({ key, share }) => (
          <span
            key={key}
            className={`toolkit-bar-seg toolkit-bar-seg--${key}`}
            style={{ width: share }}
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
    </>
  );
}

function HikingPanel() {
  const [miles, setMiles] = useState("8");
  const [gain, setGain] = useState("500");
  const [tuning, setTuning] = useState(BOOK_TIME_DEFAULTS);

  const result = useMemo(
    () => estimateHikingTime(miles, gain, tuning),
    [miles, gain, tuning]
  );

  const segments = [
    { key: "flat", label: "Walking", hours: result.flatHours },
    { key: "climb", label: "Climbing", hours: result.climbHours },
    { key: "rest", label: "Resting", hours: result.restHours },
  ].map((seg) => ({
    ...seg,
    share: result.totalHours
      ? `${(seg.hours / result.totalHours) * 100}%`
      : "0%",
  }));

  return (
    <div data-testid="hiking-time-calculator">
      <p className="toolkit-card-blurb">
        9 miles with 4,000 ft of gain is a completely different day than 9
        flat miles. Adapted from Rick Curtis&rsquo;{" "}
        <em>The Backpacker&rsquo;s Handbook</em>: base pace, an extra hour per
        1,000 ft climbed, rest budgeted per moving hour.
      </p>

      <Row className="toolkit-calc">
        <Col md="5" className="toolkit-calc-inputs">
          <NumberField
            id="hike-miles"
            label="Distance"
            unit="mi"
            value={miles}
            onChange={setMiles}
            step="0.1"
          />
          <NumberField
            id="hike-gain"
            label="Elevation gain"
            unit="ft"
            value={gain}
            onChange={setGain}
            step="50"
          />

          <div className="toolkit-presets">
            <span className="toolkit-presets-label">Try one</span>
            {HIKING_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className="toolkit-preset"
                onClick={() => {
                  setMiles(String(preset.miles));
                  setGain(String(preset.gain));
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </Col>

        <Col md="7" className="toolkit-calc-output">
          <ResultPanel
            total={formatDuration(result.totalHours)}
            segments={segments}
            barLabel={`Walking ${formatDuration(
              result.flatHours
            )}, climbing ${formatDuration(
              result.climbHours
            )}, resting ${formatDuration(result.restHours)}`}
          />
        </Col>
      </Row>

      <Tuning
        idPrefix="tune"
        note={
          'The book is explicit that these constants "may need to be adjusted depending upon the individual, group or trip needs." So adjust them.'
        }
        tuning={tuning}
        config={HIKING_TUNING}
        defaults={BOOK_TIME_DEFAULTS}
        onChange={(key, value) =>
          setTuning((prev) =>
            key === null ? value : { ...prev, [key]: value }
          )
        }
      />

      <p className="toolkit-formula">
        <code>
          time = (miles ÷ {tuning.paceMph}) + (gain ÷ {tuning.feetPerExtraHour})
          + moving hours × {tuning.restMinutesPerHour} min
        </code>
      </p>

      <p className="toolkit-provenance">
        Minutes round up on purpose — on a trail, over-estimating is the safe
        direction.{" "}
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

function KayakingPanel() {
  const [nm, setNm] = useState("6");
  const [currentKn, setCurrentKn] = useState("1");
  const [currentDirection, setCurrentDirection] = useState("slack");
  const [windKn, setWindKn] = useState("8");
  const [windDirection, setWindDirection] = useState("head");
  const [tuning, setTuning] = useState(KAYAK_TIME_DEFAULTS);

  const result = useMemo(
    () =>
      estimateKayakTime(nm, {
        ...tuning,
        currentKn,
        currentDirection,
        windKn,
        windDirection,
      }),
    [nm, currentKn, currentDirection, windKn, windDirection, tuning]
  );

  const segments = [
    { key: "flat", label: "Paddling", hours: result.paddlingHours },
    { key: "rest", label: "Resting", hours: result.restHours },
  ].map((seg) => ({
    ...seg,
    share: result.totalHours
      ? `${(seg.hours / result.totalHours) * 100}%`
      : "0%",
  }));

  const speedMadeGood = `${result.effectiveSpeedKn.toFixed(1)} kn`;

  return (
    <div data-testid="kayak-time-calculator">
      <p className="toolkit-card-blurb">
        On the water, the medium moves too. Current under the hull adds or
        subtracts whole, a headwind costs about a seventh of its speed, and a
        tailwind gives back only half of what a headwind takes. The answer that
        matters is speed made good — the hours follow from it.
      </p>

      <Row className="toolkit-calc">
        <Col md="5" className="toolkit-calc-inputs">
          <NumberField
            id="kayak-nm"
            label="Distance"
            unit="nm"
            unitTitle="Nautical miles — 1 nm ≈ 1.15 land miles"
            value={nm}
            onChange={setNm}
            step="0.5"
          />

          <NumberField
            id="kayak-current"
            label="Current"
            unit="kn"
            unitTitle="Knots — nautical miles per hour"
            value={currentKn}
            onChange={setCurrentKn}
            step="0.5"
          />
          <Segmented
            label="Current direction"
            options={CURRENT_DIRECTIONS}
            value={currentDirection}
            onChange={setCurrentDirection}
          />

          <NumberField
            id="kayak-wind"
            label="Wind"
            unit="kn"
            unitTitle="Knots — nautical miles per hour"
            value={windKn}
            onChange={setWindKn}
            step="1"
          />
          <Segmented
            label="Wind direction"
            options={WIND_DIRECTIONS}
            value={windDirection}
            onChange={setWindDirection}
          />

          <div className="toolkit-presets">
            <span className="toolkit-presets-label">Try one</span>
            {KAYAK_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className="toolkit-preset"
                onClick={() => {
                  setNm(String(preset.nm));
                  setCurrentKn(String(preset.currentKn));
                  setCurrentDirection(preset.currentDirection);
                  setWindKn(String(preset.windKn));
                  setWindDirection(preset.windDirection);
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </Col>

        <Col md="7" className="toolkit-calc-output">
          <ResultPanel
            total={formatDuration(result.totalHours)}
            speedNote={`making good ≈ ${speedMadeGood}`}
            segments={segments}
            barLabel={`Paddling ${formatDuration(
              result.paddlingHours
            )}, resting ${formatDuration(result.restHours)}`}
            warning={result.underway ? null : speedMadeGood}
          />
        </Col>
      </Row>

      <Tuning
        idPrefix="ktune"
        note="Cruising speed is the honest variable: boat, load, fitness, and sea state all move it. Three knots is a loaded touring kayak at conversational effort."
        tuning={tuning}
        config={KAYAK_TUNING}
        defaults={KAYAK_TIME_DEFAULTS}
        onChange={(key, value) =>
          setTuning((prev) =>
            key === null ? value : { ...prev, [key]: value }
          )
        }
      />

      <p className="toolkit-formula">
        <code>
          time = nm ÷ ({tuning.paddleSpeedKn} ± current ± wind÷7) + paddling
          hours × {tuning.restMinutesPerHour} min
        </code>
      </p>

      <p className="toolkit-provenance">
        Wind rule of thumb from{" "}
        <a
          href="https://www.kayarchy.co.uk/html/03thesea/002wind.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kayarchy
        </a>
        ; the planning craft itself is the subject of{" "}
        <em>Navigation, Sea State and Weather: A Paddler&rsquo;s Manual</em> —
        currently on the{" "}
        <a href="#reading-current">reading list</a> below.
      </p>
    </div>
  );
}

const MODES = [
  { value: "hiking", label: "Hiking", Icon: FaHiking },
  { value: "kayaking", label: "Kayaking", Icon: GiCanoe },
];

const DISCLAIMERS = {
  hiking:
    "Estimates are for education and rough planning only. Trails, weather, and fitness vary — carry the Ten Essentials and your own judgment.",
  kayaking:
    "Estimates are for education only — not navigation or safety advice. Wind, waves, and tide behave locally and change fast: check the marine forecast and current tables, file a float plan, and dress for the water.",
};

function TripTimeCalculator() {
  const [mode, setMode] = useState("hiking");

  return (
    <div className="toolkit-card" data-testid="trip-time-calculator">
      <div className="toolkit-card-head">
        <h3>Trip time estimator</h3>
        <span className="toolkit-tag">
          {mode === "hiking" ? "Algorithm · 2017" : "Algorithm · 2026"}
        </span>
        <div
          className="toolkit-mode"
          role="group"
          aria-label="Estimator mode"
        >
          {MODES.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              className={`toolkit-mode-btn ${mode === value ? "is-active" : ""}`}
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              <Icon aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
      </div>

      {mode === "hiking" ? <HikingPanel /> : <KayakingPanel />}

      <p className="toolkit-disclaimer">{DISCLAIMERS[mode]}</p>
    </div>
  );
}

export default TripTimeCalculator;
