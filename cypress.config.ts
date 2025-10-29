import { defineConfig } from 'cypress'
import { getConfig } from './cypress/configs'

// Obter configuração baseada na variável de ambiente
const config = getConfig('ui');

export default defineConfig({
  e2e: {
    baseUrl: config.baseUrl,
    viewportWidth: config.viewport?.width || 1280,
    viewportHeight: config.viewport?.height || 720,
    video: config.features.video,
    screenshotOnRunFailure: config.features.screenshot,
    defaultCommandTimeout: config.timeout.default,
    requestTimeout: config.timeout.request,
    responseTimeout: config.timeout.response,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.spec.{js,ts}',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads'
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
  env: {
    apiUrl: config.api?.baseUrl || 'https://serverest.dev',
    serverestApiUrl: config.api?.baseUrl || 'https://serverest.dev',
    environment: config.environment,
    debug: config.features.debug
  }
})
