import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

// How far a finger has to travel before it counts as a swipe rather than a tap
// or a wobble while reading.
const SWIPE_THRESHOLD = 45;

/** Static imports arrive as an object; a plain path arrives as a string. */
const srcOf = (src) => (typeof src === "string" ? src : src?.src);

/**
 * Screenshot gallery for a project card: a row of thumbnails that open into a
 * full-screen lightbox.
 *
 * The thumbnails are square-cropped for a tidy grid, which is only safe because
 * the source images keep their real aspect ratio — the crop is presentational.
 * In the lightbox the whole screenshot is shown, scaled to fit the viewport,
 * because the point of the gallery is seeing the application.
 *
 * Renders nothing at all when a project has no screenshots, so a project can
 * opt in simply by passing some.
 */
function ProjectGallery({ images, projectName }) {
  const titleId = useId();
  const counterId = useId();
  const [activeIndex, setActiveIndex] = useState(null);
  const dialogRef = useRef(null);
  // The thumbnail that opened the lightbox, so focus can go back to it.
  const openerRef = useRef(null);
  const touchStartX = useRef(null);

  const items = Array.isArray(images) ? images.filter((img) => img?.src) : [];
  const count = items.length;
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const go = useCallback(
    (delta) =>
      setActiveIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count]
  );

  // Keyboard: the shortcuts a lightbox is expected to honour, plus a focus trap
  // so Tab cannot wander onto the page behind the dialog.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          close();
          break;
        case "ArrowRight":
          event.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          go(-1);
          break;
        case "Home":
          event.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          event.preventDefault();
          setActiveIndex(count - 1);
          break;
        case "Tab": {
          const focusables = dialogRef.current?.querySelectorAll("button");
          if (!focusables?.length) break;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          // Wrap at both ends rather than letting focus escape the dialog.
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, go, close, count]);

  // Hold the page still behind the dialog. The scrollbar's width is added back
  // as padding, otherwise removing it shifts the whole layout sideways.
  useEffect(() => {
    if (!isOpen) return undefined;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [isOpen]);

  // Move focus into the dialog on open, and back to the thumbnail on close —
  // without it, a keyboard user is dropped at the top of the document.
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.querySelector("button")?.focus();
      return undefined;
    }
    openerRef.current?.focus();
    openerRef.current = null;
    return undefined;
  }, [isOpen]);

  const open = (index, event) => {
    openerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  const onTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event) => {
    if (touchStartX.current === null || count < 2) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  if (count === 0) return null;

  const active = isOpen ? items[activeIndex] : null;

  return (
    <>
      <ul className="project-gallery" data-testid="project-gallery">
        {items.map((image, index) => (
          <li key={`${image.alt}-${index}`} className="project-gallery-card">
            <button
              type="button"
              className="project-gallery-frame"
              onClick={(event) => open(index, event)}
              // The thumbnail carries no visible caption, so its button has to
              // say what the image is; the <img> stays decorative to avoid
              // announcing the same thing twice.
              aria-label={`${image.alt} — view larger, ${index + 1} of ${count}`}
            >
              <img
                src={srcOf(image.src)}
                alt=""
                loading="lazy"
                decoding="async"
                width={image.src?.width}
                height={image.src?.height}
              />
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
          aria-describedby={counterId}
          onClick={close}
        >
          <div
            className="project-lightbox-panel"
            ref={dialogRef}
            onClick={(event) => event.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="project-lightbox-bar">
              <button
                type="button"
                className="project-lightbox-close"
                onClick={close}
                aria-label="Close screenshot viewer"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <div className="project-lightbox-stage">
              {count > 1 && (
                <button
                  type="button"
                  className="project-lightbox-nav is-prev"
                  onClick={() => go(-1)}
                  aria-label="Previous screenshot"
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>
              )}

              {/*
                Keyed by index so React swaps the element rather than mutating
                the src, which would otherwise hold the previous screenshot on
                screen until the next one decodes.
              */}
              <img
                key={activeIndex}
                className="project-lightbox-image"
                src={srcOf(active.src)}
                alt={`${projectName}: ${active.alt}`}
                width={active.src?.width}
                height={active.src?.height}
              />

              {count > 1 && (
                <button
                  type="button"
                  className="project-lightbox-nav is-next"
                  onClick={() => go(1)}
                  aria-label="Next screenshot"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Caption sits under the screenshot, where a caption belongs. */}
            <div className="project-lightbox-footer">
              <p id={titleId} className="project-lightbox-title">
                {active.alt}
              </p>
              <p
                id={counterId}
                className="project-lightbox-counter"
                role="status"
              >
                {activeIndex + 1} of {count}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectGallery;
