import React, { Suspense } from "react";

// Lazy-loaded so the (browser-only) lottie-web engine is never imported until
// an animation is actually rendered. This keeps it out of the jsdom test
// environment and trims it from the initial bundle.
const Lottie = React.lazy(() => import("lottie-react"));

/**
 * Thin wrapper around lottie-react that renders a Lottie animation, or nothing
 * at all when no animation data is supplied. This lets us scatter placeholder
 * mount points across the site that stay invisible (and keep the build green)
 * until real `.json` Lottie exports are dropped into `src/assets/lottie/`.
 *
 * @param {object|null} animationData - Imported Lottie JSON, or null/undefined.
 * @param {boolean} [loop=true]
 * @param {boolean} [autoplay=true]
 * @param {string} [className]
 * @param {object} [style]
 * @param {string} [ariaLabel]
 */
function LottieFigure({
  animationData,
  loop = true,
  autoplay = true,
  className = "",
  style,
  ariaLabel,
}) {
  if (!animationData) return null;

  return (
    <div
      className={`lottie-figure ${className}`.trim()}
      style={style}
      role="img"
      aria-label={ariaLabel}
    >
      <Suspense fallback={null}>
        <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
      </Suspense>
    </div>
  );
}

export default LottieFigure;
