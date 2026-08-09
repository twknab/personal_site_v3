import { useEffect } from "react";

/**
 * Adds a gentle fade/rise-in animation to matching elements as they scroll
 * into view. Tags each target with `.reveal`, then toggles `.in-view` via an
 * IntersectionObserver. No-ops gracefully when reduced motion is preferred or
 * IntersectionObserver is unavailable (elements simply stay visible).
 *
 * @param {string} selector - CSS selector for the sections to animate.
 */
function useScrollReveal(selector) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = Array.from(document.querySelectorAll(selector));
    if (!targets.length) return undefined;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("reveal", "in-view"));
      return undefined;
    }

    targets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      // The threshold MUST stay 0. A section can only ever reach an
      // intersection ratio of (viewport height / its own height), so any
      // fraction here is a height limit in disguise: at 0.12 a section taller
      // than ~8x the viewport can never trigger, never gets `.in-view`, and
      // sits at opacity 0 forever. That is exactly what happened to Projects
      // on a phone once it grew past 7000px — the whole section rendered
      // invisible. Timing is the rootMargin's job, not the threshold's: the
      // -8% bottom inset is what holds the fade until the section's leading
      // edge is properly on screen, and it behaves the same at any height.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);
}

export default useScrollReveal;
