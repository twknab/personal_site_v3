import React, { useState } from "react";
import dynamic from "next/dynamic";
import confettiAnimation from "../../assets/lottie/confetti.json";

// Loaded client-side only: the lottie-web engine is browser-only, so it must
// stay out of server rendering, the initial bundle, and the jsdom test
// environment.
// lottie-react 3 dropped its default export in favour of a named `Lottie`.
// `dynamic()` hands React whatever the promise resolves to, so without
// picking the export out here React receives the module object itself and
// throws "Element type is invalid" — which takes the whole page down.
const Lottie = dynamic(() => import("lottie-react").then((m) => m.Lottie), {
  ssr: false,
});

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
