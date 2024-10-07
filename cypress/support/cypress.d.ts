declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in via credentials
     * @example cy.loginViaCredentials()
     */
    loginViaCredentials(): Chainable<void>;
  }
}
