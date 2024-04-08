/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    "vue/block-lang": [
      "error",
      {
        script: {
          lang: "ts",
        },
      },
    ],
    "vue/component-api-style": ["error", ["script-setup", "composition"]],
    "prefer-const": "error",
    "no-restricted-syntax": [
      "warn",
      {
        selector: "CallExpression[callee.name='setTimeout']",
        message: "Avoid using setTimeout.",
      },
    ],
  },
};
