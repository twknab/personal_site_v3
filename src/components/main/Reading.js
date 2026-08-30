import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SectionHeading, { CopyLinkButton } from "../common/SectionHeading";
import { Element } from "react-scroll";
import { FaChevronDown } from "react-icons/fa";
import { currentlyReading, readingByYear } from "./reading/readingList";
import localCovers from "./reading/localCovers";
import placeholderCover from "../../assets/images/book-cover-placeholder.svg";

function BookCover({ slug, title }) {
  // Covers resolve strictly from the repo: the generated localCovers map
  // (one entry per committed file), else the bundled placeholder. No remote
  // hosts, so nothing here can be slow or disappear. onError is a last-resort
  // guard against a corrupt asset.
  const local = localCovers[slug];
  const [failed, setFailed] = useState(false);
  const src = !failed && local ? local.src : placeholderCover.src;

  return (
    <img
      className="reading-cover"
      src={src}
      alt={`${title} cover`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function BookEntry({ book }) {
  return (
    <li className="reading-book">
      <BookCover slug={book.slug} title={book.title} />
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
          <SectionHeading id="reading" label="Reading">
            Reading
          </SectionHeading>

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
