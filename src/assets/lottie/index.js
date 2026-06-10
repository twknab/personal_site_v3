// *********************************************************************
// LOTTIE ANIMATION REGISTRY
// *********************************************************************
// Central place to wire up Lottie animations. Each export is `null` until you
// add a real animation, so the site builds and runs cleanly with empty slots.
//
// HOW TO ADD ONE:
//   1. Export your animation from lottiefiles.com as a Lottie JSON (`.json`).
//   2. Drop the file in this folder, e.g. `src/assets/lottie/hero-wave.json`.
//   3. Import it below and assign it to the matching slot:
//
//        import heroWave from "./hero-wave.json";
//        export const heroAnimation = heroWave;
//
// That's it -- the placeholder mount points in the UI will start rendering it.
// (Components consuming these render nothing while the value is null.)
// *********************************************************************

// Shown near the hero / welcome section.
export const heroAnimation = null;

// Shown in the site footer.
export const footerAnimation = null;
