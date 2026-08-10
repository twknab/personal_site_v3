import React, { useEffect, useId, useState } from "react";

/**
 * Horizontal screenshot gallery for a project card.
 * Expects [{ src, alt }] — renders nothing when empty.
 */
function ProjectGallery({ images, projectName }) {
  const titleId = useId();
  const [activeIndex, setActiveIndex] = useState(null);
  const items = Array.isArray(images) ? images.filter((img) => img?.src) : [];

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((i) => (i === null ? i : (i + 1) % items.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((i) =>
          i === null ? i : (i - 1 + items.length) % items.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, items.length]);

  if (items.length === 0) return null;

  const active = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <ul
        className="project-gallery"
        aria-label={`${projectName} screenshots`}
        data-testid="project-gallery"
      >
        {items.map((image, index) => (
          <li key={`${image.alt}-${index}`} className="project-gallery-card">
            <button
              type="button"
              className="project-gallery-frame"
              onClick={() => setActiveIndex(index)}
              aria-label={`View larger: ${image.alt}`}
            >
              <img
                src={typeof image.src === "string" ? image.src : image.src.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
              <span className="project-gallery-caption">{image.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="project-lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <p id={titleId} className="project-lightbox-title">
              {active.alt}
            </p>
            <img
              src={typeof active.src === "string" ? active.src : active.src.src}
              alt={active.alt}
            />
            <div className="project-lightbox-actions">
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    className="project-lightbox-nav"
                    onClick={() =>
                      setActiveIndex(
                        (i) => (i - 1 + items.length) % items.length
                      )
                    }
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="project-lightbox-nav"
                    onClick={() =>
                      setActiveIndex((i) => (i + 1) % items.length)
                    }
                  >
                    Next
                  </button>
                </>
              )}
              <button
                type="button"
                className="project-lightbox-close"
                onClick={() => setActiveIndex(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectGallery;
