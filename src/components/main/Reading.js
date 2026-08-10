import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Element } from "react-scroll";
import { FaChevronDown, FaCheck, FaLink } from "react-icons/fa";
import { currentlyReading, readingByYear } from "./reading/readingList";
import placeholderCover from "../../assets/images/book-cover-placeholder.svg";

function BookCover({ cover, title }) {
  // `cover` is either a single image (a local import or a URL) or an ordered
  // list of candidates to try. Each one that fails to load falls through to the
  // next, and the local placeholder always brings up the rear.
  const sources = (Array.isArray(cover) ? cover : [cover])
    .filter(Boolean)
    .concat(placeholderCover.src);
  const [index, setIndex] = useState(0);

  return (
    <img
      className="reading-cover"
      src={sources[index]}
      alt={`${title} cover`}
      loading="lazy"
      onError={() => setIndex((i) => Math.min(i + 1, sources.length - 1))}
    />
  );
}

function CopyLinkButton({ anchorId, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    const { origin, pathname } = window.location;
    const link = `${origin}${pathname}#${anchorId}`;
    try {
      await navigator.clipboard.writeText(link);
    } catch {
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

  return (
    <button
      type="button"
      className={`reading-link-btn ${copied ? "is-copied" : ""}`}
      onClick={handleCopy}
      aria-label={`Copy link to ${label}`}
      title={copied ? "Link copied!" : `Copy link to ${label}`}
    >
      {copied ? <FaCheck aria-hidden="true" /> : <FaLink aria-hidden="true" />}
    </button>
  );
}

function BookEntry({ book }) {
  return (
    <li className="reading-book">
      <BookCover cover={book.cover} title={book.title} />
      <span className="reading-citation">
        <span className="reading-title">&ldquo;{book.title}&rdquo;</span>
        <span className="reading-meta">
          {book.author} &middot; {book.publisher}, {book.year}
        </span>
      </span>
    </li>
  );
}

function ReadingGroup({ id, title, books, withLink = false }) {
  const [open, setOpen] = useState(true);
  const panelId = `${id}-panel`;

  return (
    <div className="reading-group" id={id}>
      <div
        className="reading-group-header"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
      >
        <h3>
          {title}
          <span className="reading-count">{books.length}</span>
        </h3>
        <div className="reading-group-actions">
          {withLink && <CopyLinkButton anchorId={id} label={title} />}
          <FaChevronDown
            className={`reading-chevron ${open ? "is-open" : ""}`}
            aria-hidden="true"
          />
        </div>
      </div>
      <Collapse in={open}>
        <div id={panelId}>
          <ul className="reading-list reading-list--cols">
            {books.map((book) => (
              <BookEntry key={`${book.title}-${book.author}`} book={book} />
            ))}
          </ul>
        </div>
      </Collapse>
    </div>
  );
}

function Reading() {
  return (
    <div>
      <Element name="reading"></Element>
      <Row className="reading">
        <Col lg>
          <h1>
            <span role="img" aria-label="reading">
              📚
            </span>{" "}
            Reading
          </h1>

          {currentlyReading.length > 0 && (
            <ReadingGroup
              id="reading-current"
              title="Currently Reading"
              books={currentlyReading}
              withLink
            />
          )}

          {readingByYear.map((entry) => (
            <ReadingGroup
              key={entry.year}
              id={`reading-year-${entry.year}`}
              title={`${entry.year} Completed`}
              books={entry.books}
              withLink
            />
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default Reading;
