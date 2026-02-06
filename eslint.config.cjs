// eslint-disable-next-line @typescript-eslint/no-require-imports
const eslintPluginAstro = require("eslint-plugin-astro");

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tseslint = require("typescript-eslint");

module.exports = [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"], // In CommonJS, the `flat/` prefix is required.
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
];
