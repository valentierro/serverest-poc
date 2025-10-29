import { faker } from '@faker-js/faker';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.getByTestId('submit-button')
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      
      /**
       * Custom command to generate a random email.
       * @example cy.generateRandomEmail()
       */
      generateRandomEmail(): Chainable<string>;
      
      /**
       * Custom command to generate a random name.
       * @example cy.generateRandomName()
       */
      generateRandomName(): Chainable<string>;
      
      /**
       * Custom command to generate random user data.
       * @example cy.generateRandomUser()
       */
      generateRandomUser(): Chainable<{nome: string, email: string, password: string}>;
    }
  }
}

// Custom command to select element by data-testid
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Custom command to generate random email
Cypress.Commands.add('generateRandomEmail', () => {
  return cy.wrap(faker.internet.email());
});

// Custom command to generate random name
Cypress.Commands.add('generateRandomName', () => {
  return cy.wrap(faker.person.fullName());
});

// Custom command to generate random user data
Cypress.Commands.add('generateRandomUser', () => {
  return cy.wrap({
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 })
  });
});
