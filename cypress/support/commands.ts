Cypress.Commands.add('loginViaCredentials', () => {
  cy.visit('/')
  cy.get('#loginLogin').type('hello@cypress.io')
  cy.get('#loginPassword').type('CypressUserPas1')
  cy.get('button[type="submit"]').click()
})