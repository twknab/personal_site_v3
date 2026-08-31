// ESLint flat config.
//
// Next 16 removed `next lint`, and ESLint 9 dropped .eslintrc.json, so linting
// now runs through the ESLint CLI against this file. `eslint-config-next`
// ships native flat configs, so no eslintrc compatibility layer is needed.
import * as espree from "espree";
import coreWebVitals from "eslint-config-next/core-web-vitals";

export default [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "public/**"],
  },
  ...coreWebVitals,
  {
    // This project is plain JavaScript. eslint-config-next points every file
    // at its own TypeScript parser, and that parser's scope manager does not
    // implement `addGlobals`, which ESLint 10 requires -- so linting dies
    // before a single rule runs. Espree is ESLint's own parser and handles
    // JSX fine here.
    languageOptions: {
      parser: espree,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    // Pin the version so eslint-plugin-react skips its detection path, which
    // calls context.getFilename() -- removed in ESLint 10.
    settings: { react: { version: "19.2" } },
  },
  {
    rules: {
      // The site's copy is full of apostrophes in prose; escaping them all
      // would hurt readability for no rendering benefit.
      "react/no-unescaped-entities": "off",
    },
  },
];
