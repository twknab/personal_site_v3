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
    expect(titles().slice(0, 3)).toEqual([
      "Plumber Wars",
      "Mail Digest",
      "SquirrelStudio",
    ]);
  });

  it("keeps the existing projects", () => {
    expect(titles()).toEqual(
      expect.arrayContaining([
        "RoamGuru",
        "GearList",
        "HikingTool",
        "Fitness Tracker",
        "Sock It!",
      ]),
    );
  });

  it("links Mail Digest to its repository", () => {
    const link = document.querySelector(
      'a[href="https://github.com/twknab/mail-digest"]',
    );
    expect(link).toBeTruthy();
    expect(link.textContent).toMatch(/view on github/i);
  });

  it("links Plumber Wars to the game and its repository", () => {
    const repo = document.querySelector(
      'a[href="https://github.com/twknab/plumber-wars"]',
    );
    expect(repo).toBeTruthy();
    expect(repo.textContent).toMatch(/view on github/i);
    const play = document.querySelector(
      'a[href="https://plumber-wars-980128349276.us-west1.run.app"]',
    );
    expect(play).toBeTruthy();
    expect(play.textContent).toMatch(/play it/i);
  });

  it("parks AQI Viewer at the bottom of the list", () => {
    expect(titles().at(-1)).toBe("AQI Viewer");
  });

  it("links Frog Garden to its repository", () => {
    const link = document.querySelector(
      'a[href="https://github.com/twknab/zen-frog-todo"]',
    );
    expect(link).toBeTruthy();
    expect(link.textContent).toMatch(/view on github/i);
  });

  it("gives every project card an icon", () => {
    const icons = document.querySelectorAll("img.project-icon");
    expect(icons.length).toBe(titles().length);
    icons.forEach((img) => expect(img.getAttribute("src")).toBeTruthy());
  });
});
