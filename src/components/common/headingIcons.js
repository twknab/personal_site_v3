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

export const headingIcons = {
  // A campfire rather than a raised hand: FaHandSparkles read as "stop", and
  // the hero photo right beside it is a fire on a beach at night.
  welcome: { Icon: FaCampground, from: "#ffd86b", to: "#ff2d95" },
  "about-me": { Icon: FaSeedling, from: "#32efa6", to: "#00d4ff" },
  skills: { Icon: FaTools, from: "#d8e052", to: "#fcb045" },
  projects: { Icon: FaPalette, from: "#b026ff", to: "#ff2d95" },
  "how-i-build": { Icon: FaDraftingCompass, from: "#00d4ff", to: "#b026ff" },
  "recently-shipped": { Icon: FaRocket, from: "#ff2d95", to: "#fcb045" },
  toolkit: { Icon: FaToolbox, from: "#32efa6", to: "#d8e052" },
  experience: { Icon: FaDumbbell, from: "#fcb045", to: "#ff2d95" },
  education: { Icon: FaGraduationCap, from: "#00d4ff", to: "#32efa6" },
  awards: { Icon: FaAward, from: "#ffd86b", to: "#fcb045" },
  reading: { Icon: FaBookOpen, from: "#b026ff", to: "#00d4ff" },
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
        {Object.entries(headingIcons).map(([id, { from, to }]) => (
          <linearGradient
            key={id}
            id={gradientId(id)}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}
