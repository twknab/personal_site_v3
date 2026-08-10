// ESLint flat config.
//
// Next 16 removed `next lint`, and ESLint 9 dropped .eslintrc.json, so linting
// now runs through the ESLint CLI against this file. `eslint-config-next`
// ships native flat configs, so no eslintrc compatibility layer is needed.
import coreWebVitals from "eslint-config-next/core-web-vitals";

export default [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "public/**"],
  },
  ...coreWebVitals,
  {
    rules: {
      // The site's copy is full of apostrophes in prose; escaping them all
      // would hurt readability for no rendering benefit.
      "react/no-unescaped-entities": "off",
    },
  },
];
