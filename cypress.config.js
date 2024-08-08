import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "si3213",
  e2e: {
    baseUrl: "http://localhost:5174",
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
