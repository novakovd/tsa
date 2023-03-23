module.exports = {
  root: true,
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "airbnb-typescript/base",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "@typescript-eslint/lines-between-class-members": "off"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
};
