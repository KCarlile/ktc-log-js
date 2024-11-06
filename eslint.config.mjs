import globals from "globals";
import pluginJs from "@eslint/js";
import jest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    plugins: {
      jest
    },
    languageOptions:
    {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules:
    {
      "no-unused-vars": "error",
      "no-undef": "error"
    },
  },
];
