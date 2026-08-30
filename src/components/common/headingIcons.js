// *********************************************************************
// HEADING ICONS
// *********************************************************************
// EXPERIMENT: replaces the native system emoji in section headings.
//
// System emoji render differently on every platform, sit at whatever size
// the font decides, and carry Apple's or Google's art direction rather than
// this site's. These are vector glyphs filled with a gradient drawn from the
// site's own palette, so they scale cleanly, look identical everywhere, and
// belong to the same visual family as the pipeline diagram and the chips.
//
// Each entry maps a section id to its glyph and a two-stop gradient. The
// gradients are painted once as SVG <defs> by <HeadingIconDefs />; the glyphs
// reference them by id.
// *********************************************************************

import {
  FaAward,
  FaBookOpen,
  FaDraftingCompass,
  FaDumbbell,
  FaGraduationCap,
  FaCampground,
  FaPalette,
  FaRocket,
  FaSeedling,
  FaToolbox,
  FaTools,
} from "react-icons/fa";

// Three stops rather than two, with a neon in the middle, so each glyph runs
// through a colour it did not start or end on. That mid tone is what makes it
// read as the site's psychedelic gradients rather than a flat two-tone fade.
export const headingIcons = {
  // A campfire rather than a raised hand: FaHandSparkles read as "stop", and
  // the hero photo right beside it is a fire on a beach at night.
  welcome: {
    Icon: FaCampground,
    stops: ["#fff3b0", "#ff2d95", "#b026ff"],
  },
  "about-me": { Icon: FaSeedling, stops: ["#32efa6", "#00d4ff", "#b026ff"] },
  skills: { Icon: FaTools, stops: ["#d8e052", "#fcb045", "#ff2d95"] },
  projects: { Icon: FaPalette, stops: ["#00d4ff", "#b026ff", "#ff2d95"] },
  "how-i-build": {
    Icon: FaDraftingCompass,
    stops: ["#00d4ff", "#32efa6", "#d8e052"],
  },
  "recently-shipped": {
    Icon: FaRocket,
    stops: ["#ff2d95", "#fcb045", "#ffd86b"],
  },
  toolkit: { Icon: FaToolbox, stops: ["#32efa6", "#d8e052", "#00d4ff"] },
  experience: { Icon: FaDumbbell, stops: ["#fcb045", "#ff2d95", "#b026ff"] },
  // The mortarboard is wide and shallow, so at the shared size it reads
  // noticeably smaller than the rest. `scale` corrects a single glyph's
  // optical weight without moving everything else.
  education: {
    Icon: FaGraduationCap,
    stops: ["#00d4ff", "#32efa6", "#d8e052"],
    scale: 1.18,
  },
  awards: { Icon: FaAward, stops: ["#ffd86b", "#fcb045", "#ff2d95"] },
  reading: { Icon: FaBookOpen, stops: ["#b026ff", "#00d4ff", "#32efa6"] },
};

export const gradientId = (id) => `heading-grad-${id}`;

/**
 * Paints every heading gradient once.
 *
 * SVG gradients are referenced by id from anywhere in the document, so a
 * single hidden <svg> serves all the headings. Rendered near the top of the
 * page so the definitions exist before any glyph asks for one.
 */
export function HeadingIconDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute" }}
    >
      <defs>
        {Object.entries(headingIcons).map(([id, { stops }]) => (
          <linearGradient
            key={id}
            id={gradientId(id)}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {stops.map((color, i) => (
              <stop
                key={color + i}
                offset={`${(i / (stops.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
            {/*
              The gradient's angle sweeps rather than sitting still, so the
              colours travel across the glyph. Slow on purpose — this is
              eleven headings down a page, not a light show.
            */}
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 0.5 0.5"
              to="360 0.5 0.5"
              dur="14s"
              repeatCount="indefinite"
            />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}
