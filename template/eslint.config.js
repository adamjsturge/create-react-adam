import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import deMorgan from "eslint-plugin-de-morgan";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import promisePlugin from "eslint-plugin-promise";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.strict,
    prettier,
    promisePlugin.configs["flat/recommended"],
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    unicorn.configs["unopinionated"],
    deMorgan.configs.recommended,
  ],
  plugins: {
    "jsx-a11y": jsxA11y,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    ...jsxA11y.flatConfigs.strict.rules,
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist"],
});
