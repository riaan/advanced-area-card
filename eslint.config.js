import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["node_modules/**", "test/**"] },
  js.configs.recommended,
  {
    files: ["dist/**/*.js"],
    languageOptions: { ecmaVersion: 2022, sourceType: "module", globals: { ...globals.browser } },
    rules: {
      // The card contains a few unused helpers from earlier iterations; report them without failing CI.
      "no-unused-vars": ["warn", { args: "none", caughtErrors: "none", varsIgnorePattern: "^_" }],
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: { ecmaVersion: 2022, sourceType: "module", globals: { ...globals.node } },
  },
];
