import React from "react";
import { render, screen } from "@testing-library/react";
import Reading from "./Reading";

beforeEach(() => {
  render(<Reading />);
});

describe("Reading", () => {
  it("pins in-progress books above the completed years", () => {
    expect(document.getElementById("reading-current")).toBeTruthy();
    expect(
      screen.getByAltText(
        "Clean Craftsmanship: Disciplines, Standards, and Ethics cover"
      )
    ).toBeInTheDocument();
  });

  it("renders a 2026 completed group", () => {
    expect(document.getElementById("reading-year-2026")).toBeTruthy();
    expect(screen.getByAltText("Maxalding cover")).toBeInTheDocument();
  });

  it("gives every book a cover image, falling back to the placeholder", () => {
    const covers = document.querySelectorAll("img.reading-cover");
    expect(covers.length).toBeGreaterThan(0);
    covers.forEach((img) => expect(img.getAttribute("src")).toBeTruthy());
  });

  // The regression this section shipped with: covers hotlinked to
  // covers.openlibrary.org and archive.org, which were slow enough to watch.
  // Every cover must now resolve from the bundle (or the placeholder) — no
  // remote hosts, ever.
  it("never hotlinks a cover from a remote host", () => {
    document.querySelectorAll("img.reading-cover").forEach((img) => {
      expect(img.getAttribute("src")).not.toMatch(/^https?:\/\//);
    });
  });
});

describe("reading list data", () => {
  const { currentlyReading, readingByYear } = jest.requireActual(
    "./reading/readingList"
  );
  const allBooks = [
    ...currentlyReading,
    ...readingByYear.flatMap((year) => year.books),
  ];

  it("gives every book a unique slug for cover lookup", () => {
    const slugs = allBooks.map((book) => book.slug);
    expect(slugs.every(Boolean)).toBe(true);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
