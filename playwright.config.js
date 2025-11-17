// playwright.config.js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./test/ui-tests",
  timeout: 30 * 1000,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },
});
