# Lottie animations

Drop your Lottie JSON exports (from [lottiefiles.com](https://lottiefiles.com))
into this folder, then wire them up in [`index.js`](./index.js).

Example:

```js
// index.js
import heroWave from "./hero-wave.json";
export const heroAnimation = heroWave;
```

Mount points already exist for `heroAnimation` (welcome section) and
`footerAnimation` (footer). While a slot is `null`, nothing renders, so the
site stays clean until you add a file.

Rendering is handled by `src/components/fun/LottieFigure.js`.
