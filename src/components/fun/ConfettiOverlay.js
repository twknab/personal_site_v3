import React, { Suspense, useState } from "react";
import confettiAnimation from "../../assets/lottie/confetti.json";

// Lazy-loaded so the browser-only lottie-web engine stays out of the initial
// bundle (and out of the jsdom test environment).
const Lottie = React.lazy(() => import("lottie-react"));

/**
 * Full-screen confetti that "rains down" once on page load, then unmounts so it
 * never lingers or blocks interaction (it is pointer-events: none regardless).
 * Skipped for users who prefer reduced motion, and in the test environment
 * where lottie-web cannot evaluate.
 */
function ConfettiOverlay() {
  const [finished, setFinished] = useState(false);

  if (process.env.NODE_ENV === "test") return null;
  if (finished) return null;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return null;

  return (
    <div className="confetti-overlay" aria-hidden="true">
      <Suspense fallback={null}>
        <Lottie
          animationData={confettiAnimation}
          loop={false}
          autoplay
          onComplete={() => setFinished(true)}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
    </div>
  );
}

export default ConfettiOverlay;
