import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    supportFile: "tests/e2e/support/e2e.ts",
    specPattern: "tests/e2e/specs/*.cy.ts",
  },
  watchForFileChanges: false,
  fixturesFolder: "tests/e2e/fixtures",
  video: false,
});
