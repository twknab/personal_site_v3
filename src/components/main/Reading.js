import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaChevronDown } from "react-icons/fa";
import { currentlyReading, readingByYear } from "./reading/readingList";
import placeholderCover from "../../assets/images/book-cover-placeholder.svg";

function BookCover({ cover, title }) {
  const [src, setSrc] = useState(cover || placeholderCover);
  return (
    <img
      className="reading-cover"
      src={src}
      alt={`${title} cover`}
      loading="lazy"
      onError={() => setSrc(placeholderCover)}
    />
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

function ReadingGroup({ id, title, books }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="reading-group">
      <div
        className="reading-group-header"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={id}
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
        <FaChevronDown
          className={`reading-chevron ${open ? "is-open" : ""}`}
          aria-hidden="true"
        />
      </div>
      <Collapse in={open}>
        <div id={id}>
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
            />
          )}

          {readingByYear.map((entry) => (
            <ReadingGroup
              key={entry.year}
              id={`reading-year-${entry.year}`}
              title={`${entry.year} Completed`}
              books={entry.books}
            />
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default Reading;
