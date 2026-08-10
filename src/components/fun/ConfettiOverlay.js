import React, { useState } from "react";
import dynamic from "next/dynamic";
import confettiAnimation from "../../assets/lottie/confetti.json";

// Loaded client-side only: the lottie-web engine is browser-only, so it must
// stay out of server rendering, the initial bundle, and the jsdom test
// environment.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

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
      <Lottie
        animationData={confettiAnimation}
        loop={false}
        autoplay
        onComplete={() => setFinished(true)}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default ConfettiOverlay;
