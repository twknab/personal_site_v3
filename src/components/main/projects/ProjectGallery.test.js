import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ProjectGallery from "./ProjectGallery";

const IMAGES = [
  { src: { src: "/one.png" }, alt: "Dashboard view" },
  { src: { src: "/two.png" }, alt: "Detail view" },
];

describe("ProjectGallery", () => {
  it("renders nothing when there are no images", () => {
    const { container } = render(
      <ProjectGallery images={[]} projectName="Demo" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a gallery of screenshot cards", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    const gallery = document.querySelector('[data-testid="project-gallery"]');
    expect(gallery).toBeTruthy();
    expect(gallery.querySelectorAll("li")).toHaveLength(2);
    expect(gallery.textContent).toContain("Dashboard view");
  });

  it("opens a lightbox when a card is clicked", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    fireEvent.click(
      document.querySelector('button[aria-label="View larger: Dashboard view"]')
    );
    const dialog = document.querySelector('.project-lightbox[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(dialog.textContent).toContain("Dashboard view");
  });

  it("closes the lightbox from the close control", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    fireEvent.click(
      document.querySelector('button[aria-label="View larger: Dashboard view"]')
    );
    fireEvent.click(
      Array.from(document.querySelectorAll("button")).find(
        (b) => b.textContent === "Close"
      )
    );
    expect(document.querySelector(".project-lightbox")).toBeNull();
  });
});
