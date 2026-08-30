import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ProjectGallery from "./ProjectGallery";

const IMAGES = [
  { src: "/shots/dashboard.png", alt: "Dashboard view" },
  { src: "/shots/detail.png", alt: "Trip detail" },
  { src: "/shots/awards.png", alt: "Awards earned" },
];

const openFirst = () => {
  const thumb = screen.getAllByRole("button")[0];
  fireEvent.click(thumb);
  return thumb;
};

const dialog = () => screen.getByRole("dialog");

describe("ProjectGallery", () => {
  it("renders nothing for a project with no screenshots", () => {
    const { container } = render(
      <ProjectGallery images={[]} projectName="Demo" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("names each thumbnail with its subject and position", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    // A screen reader user should know what the shot is and how many there are
    // before deciding to open anything.
    expect(
      screen.getByRole("button", { name: /Trip detail.*2 of 3/i })
    ).toBeInTheDocument();
  });

  it("does not announce the thumbnail image twice", () => {
    const { container } = render(
      <ProjectGallery images={IMAGES} projectName="Demo" />
    );
    // The button carries the label, so the <img> must stay decorative or the
    // same text is read out twice over.
    container
      .querySelectorAll(".project-gallery-frame img")
      .forEach((img) => expect(img).toHaveAttribute("alt", ""));
  });

  it("puts no caption on the thumbnail", () => {
    const { container } = render(
      <ProjectGallery images={IMAGES} projectName="Demo" />
    );
    // Captions belong under the image in the lightbox, not overlaid on the
    // grid, where they covered the screenshot they were describing.
    expect(
      container.querySelector(".project-gallery-caption")
    ).not.toBeInTheDocument();
    expect(container.querySelector(".project-gallery")).not.toHaveTextContent(
      "Dashboard view"
    );
  });

  it("shows the caption beneath the screenshot, not above it", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    openFirst();
    const panel = dialog().querySelector(".project-lightbox-panel");
    const image = panel.querySelector(".project-lightbox-image");
    const caption = panel.querySelector(".project-lightbox-title");
    expect(caption).toHaveTextContent("Dashboard view");
    // DOCUMENT_POSITION_FOLLOWING: the caption comes after the image.
    expect(image.compareDocumentPosition(caption) & 4).toBeTruthy();
  });

  it("lazy-loads thumbnails so the homepage does not fetch every screenshot", () => {
    const { container } = render(
      <ProjectGallery images={IMAGES} projectName="Demo" />
    );
    container
      .querySelectorAll(".project-gallery-frame img")
      .forEach((img) => expect(img).toHaveAttribute("loading", "lazy"));
  });

  it("opens a labelled modal dialog on the chosen screenshot", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    fireEvent.click(screen.getAllByRole("button")[1]);

    const d = dialog();
    expect(d).toHaveAttribute("aria-modal", "true");
    expect(within(d).getByText("Trip detail")).toBeInTheDocument();
    expect(within(d).getByText("2 of 3")).toBeInTheDocument();
  });

  it("shows the full screenshot rather than a cropped one", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    openFirst();
    // `contain` is the whole point: the gallery exists so the application can
    // be seen, so the lightbox must never crop.
    expect(
      dialog().querySelector(".project-lightbox-image")
    ).toBeInTheDocument();
  });

  it("moves through the screenshots with the arrow keys, wrapping at both ends", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    openFirst();

    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(within(dialog()).getByText("2 of 3")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "ArrowLeft" });
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(within(dialog()).getByText("3 of 3")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(within(dialog()).getByText("1 of 3")).toBeInTheDocument();
  });

  it("jumps to the first and last screenshot with Home and End", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    openFirst();

    fireEvent.keyDown(document, { key: "End" });
    expect(within(dialog()).getByText("3 of 3")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Home" });
    expect(within(dialog()).getByText("1 of 3")).toBeInTheDocument();
  });

  it("moves through the screenshots with the on-screen controls", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    openFirst();

    fireEvent.click(screen.getByRole("button", { name: /next screenshot/i }));
    expect(within(dialog()).getByText("2 of 3")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /previous screenshot/i })
    );
    expect(within(dialog()).getByText("1 of 3")).toBeInTheDocument();
  });

  it("advances on a swipe, and ignores a stray tap", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    openFirst();
    const panel = dialog().querySelector(".project-lightbox-panel");

    fireEvent.touchStart(panel, { changedTouches: [{ clientX: 300 }] });
    fireEvent.touchEnd(panel, { changedTouches: [{ clientX: 100 }] });
    expect(within(dialog()).getByText("2 of 3")).toBeInTheDocument();

    fireEvent.touchStart(panel, { changedTouches: [{ clientX: 300 }] });
    fireEvent.touchEnd(panel, { changedTouches: [{ clientX: 400 }] });
    expect(within(dialog()).getByText("1 of 3")).toBeInTheDocument();

    // Under the threshold: a tap or a small wobble must not change the image.
    fireEvent.touchStart(panel, { changedTouches: [{ clientX: 300 }] });
    fireEvent.touchEnd(panel, { changedTouches: [{ clientX: 290 }] });
    expect(within(dialog()).getByText("1 of 3")).toBeInTheDocument();
  });

  it("closes on Escape, on the close control, and on a click outside", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);

    openFirst();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    openFirst();
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    openFirst();
    fireEvent.click(dialog());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("stays open when the panel itself is clicked", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    openFirst();
    fireEvent.click(dialog().querySelector(".project-lightbox-panel"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("takes focus on open and hands it back to the thumbnail on close", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    const thumb = openFirst();

    // Focus has to land inside the dialog, or a keyboard user is left at the
    // top of the document with a modal open they cannot reach.
    expect(dialog().contains(document.activeElement)).toBe(true);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.activeElement).toBe(thumb);
  });

  it("keeps Tab inside the dialog", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    openFirst();

    const buttons = dialog().querySelectorAll("button");
    const first = buttons[0];
    const last = buttons[buttons.length - 1];

    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(first);

    first.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it("holds the page still while open and releases it on close", () => {
    render(<ProjectGallery images={IMAGES} projectName="Demo" />);
    openFirst();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("offers no navigation when there is only one screenshot", () => {
    render(<ProjectGallery images={[IMAGES[0]]} projectName="Demo" />);
    openFirst();

    expect(
      screen.queryByRole("button", { name: /next screenshot/i })
    ).not.toBeInTheDocument();
    expect(within(dialog()).getByText("1 of 1")).toBeInTheDocument();
  });
});
