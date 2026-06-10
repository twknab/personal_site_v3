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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);
}

export default useScrollReveal;
