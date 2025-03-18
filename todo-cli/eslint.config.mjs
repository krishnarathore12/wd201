export default [
  {
    ignores: ["**/node_modules/", "dist/", "**/coverage/"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];
