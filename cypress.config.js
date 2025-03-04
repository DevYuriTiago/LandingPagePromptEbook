// Configuração simplificada do Cypress
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/e2e/**/*.spec.js',
    supportFile: 'cypress/support/index.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'test-results/screenshots',
  videosFolder: 'test-results/videos',
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
};
