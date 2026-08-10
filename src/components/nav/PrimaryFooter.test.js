import React from "react";
import { render, screen } from "@testing-library/react";
import PrimaryFooter from "./PrimaryFooter";

describe("PrimaryFooter", () => {
  beforeEach(() => {
    render(<PrimaryFooter />);
  });

  it("successfully renders primary footer", () => {
    const footer = screen.getByTestId("primary-footer");
    expect(footer).toHaveTextContent("Crafted with 💚");
    expect(footer).toHaveTextContent(
      `${new Date().getFullYear()} timknab.dev`
    );
  });

  it("renders as a real fluid container", () => {
    expect(screen.getByTestId("primary-footer")).toHaveClass("container-fluid");
  });

  it("shows no tech-stack badges when the prop is absent", () => {
    expect(document.querySelector(".tech-stack")).toBeNull();
  });

  it("links to the site's GitHub repo and new-issue page", () => {
    const footer = screen.getByTestId("primary-footer");
    expect(
      footer.querySelector(
        'a[href="https://github.com/twknab/personal_site_v3"]'
      )
    ).toBeInTheDocument();
    expect(
      footer.querySelector(
        'a[href="https://github.com/twknab/personal_site_v3/issues/new"]'
      )
    ).toBeInTheDocument();
  });
});

describe("PrimaryFooter tech-stack badges", () => {
  const techStack = {
    siteVersion: "5.0.0",
    nodeMajor: "22",
    badges: [
      { name: "Next.js", version: "14.2.30", url: "https://nextjs.org" },
      { name: "React", version: "18.3.1", url: "https://react.dev" },
    ],
  };

  it("renders one badge per dependency plus site and Node versions", () => {
    render(<PrimaryFooter techStack={techStack} />);
    const badges = Array.from(document.querySelectorAll(".tech-badge")).map(
      (el) => el.textContent
    );
    expect(badges).toEqual([
      "timknab.devv5.0.0",
      "Next.js14.2.30",
      "React18.3.1",
      "Node22",
    ]);
  });

  it("gives the site badge the tk favicon and dependency badges a brand mark", () => {
    render(<PrimaryFooter techStack={techStack} />);
    const logo = document.querySelector("img.tech-badge-logo");
    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute("src")).toBe("/img/timknabdev-favico.png");
    // Next.js + React brand icons render as inline SVGs in the name segment.
    expect(
      document.querySelectorAll(".tech-badge-name svg").length
    ).toBeGreaterThanOrEqual(2);
  });

  it("links dependency badges to their docs", () => {
    render(<PrimaryFooter techStack={techStack} />);
    expect(
      document.querySelector('a.tech-badge[href="https://nextjs.org"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('a.tech-badge[href="https://react.dev"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('a.tech-badge[href="https://nodejs.org"]')
    ).toBeInTheDocument();
  });
});
