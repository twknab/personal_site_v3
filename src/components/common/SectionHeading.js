import React, { useState } from "react";
import { FaCheck, FaLink } from "react-icons/fa";

/**
 * Copies a deep link to the section it sits in.
 *
 * Extracted from the Reading section, which had the only copy of this. It is
 * now shared so every section heading behaves the same way.
 */
export function CopyLinkButton({ anchorId, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    const { origin, pathname } = window.location;
    const link = `${origin}${pathname}#${anchorId}`;
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // Clipboard access is blocked in some contexts (insecure origins,
      // older browsers). Fall back to the selection trick rather than
      // failing silently and leaving the user with nothing copied.
      const temp = document.createElement("textarea");
      temp.value = link;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const tip = copied ? "Link copied" : `Copy link to ${label}`;

  return (
    <button
      type="button"
      className={`section-link-btn ${copied ? "is-copied" : ""}`}
      onClick={handleCopy}
      aria-label={tip}
      // data-tip drives the CSS tooltip; title is the native fallback for
      // anyone whose browser suppresses the styled one.
      data-tip={tip}
      title={tip}
    >
      {copied ? <FaCheck aria-hidden="true" /> : <FaLink aria-hidden="true" />}
    </button>
  );
}

/**
 * A section's <h1> plus its share control.
 *
 * The id lands on the heading itself, which is what makes `#skills` in a URL
 * actually jump — react-scroll's <Element> registers its anchor internally and
 * renders no id, so it cannot serve a shared link on its own.
 */
function SectionHeading({ id, label, children }) {
  return (
    <h1 id={id} className="section-heading">
      <span className="section-heading-text">{children}</span>
      <CopyLinkButton anchorId={id} label={label} />
    </h1>
  );
}

export default SectionHeading;
