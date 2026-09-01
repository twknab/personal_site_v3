import React from "react";
import dynamic from "next/dynamic";

// Loaded client-side only so the (browser-only) lottie-web engine is never
// imported until an animation is actually rendered. This keeps it out of
// server rendering, the jsdom test environment, and the initial bundle.
// lottie-react 3 dropped its default export in favour of a named `Lottie`.
// `dynamic()` hands React whatever the promise resolves to, so without
// picking the export out here React receives the module object itself and
// throws "Element type is invalid" — which takes the whole page down.
const Lottie = dynamic(() => import("lottie-react").then((m) => m.Lottie), {
  ssr: false,
});

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
      <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
    </div>
  );
}

export default LottieFigure;
