// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
Cypress.on('window:before:load', (win) => {
  // Hide fetch/XHR requests
  const originalFetch = win.fetch;
  win.fetch = function(...args) {
    return originalFetch.apply(this, args);
  };
});

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  // Return false to prevent the error from failing the test
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});

// Configure viewport
beforeEach(() => {
  // Set default viewport
  cy.viewport(1280, 720);
});
