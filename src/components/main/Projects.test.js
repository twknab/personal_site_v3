import React from "react";
import { render } from "@testing-library/react";
import Projects from "./Projects";

// Note: this suite uses plain DOM queries rather than *ByRole. The pinned
// jsdom here throws on getComputedStyle with a pseudo-element, which is what
// dom-accessibility-api calls while computing accessible names.
beforeEach(() => {
  render(<Projects />);
});

const titles = () =>
  Array.from(document.querySelectorAll("h3")).map((h) => h.textContent);

describe("Projects", () => {
  it("leads with the newest work", () => {
    expect(titles().slice(0, 2)).toEqual(["SquirrelStudio", "Frog Garden"]);
  });

  it("keeps the existing projects", () => {
    expect(titles()).toEqual(
      expect.arrayContaining([
        "RoamGuru",
        "GearList",
        "HikingTool",
        "Fitness Tracker",
        "Sock It!",
      ])
    );
  });

  it("parks AQI Viewer at the bottom of the list", () => {
    expect(titles().at(-1)).toBe("AQI Viewer");
  });

  it("links Frog Garden to its repository", () => {
    const link = document.querySelector(
      'a[href="https://github.com/twknab/zen-frog-todo"]'
    );
    expect(link).toBeTruthy();
    expect(link.textContent).toMatch(/view on github/i);
  });

  it("gives every project card an icon", () => {
    const icons = document.querySelectorAll("img.project-icon");
    expect(icons.length).toBe(titles().length);
    icons.forEach((img) => expect(img.getAttribute("src")).toBeTruthy());
  });

  it("attaches screenshot galleries to projects that have them", () => {
    const galleries = document.querySelectorAll('[data-testid="project-gallery"]');
    // SquirrelStudio (private) and Sock It! (no shots) skip galleries.
    expect(galleries.length).toBe(titles().length - 2);
    galleries.forEach((gallery) => {
      expect(gallery.querySelectorAll("img").length).toBeGreaterThan(0);
    });
  });
});
