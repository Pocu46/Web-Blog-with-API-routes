describe('Should check Login logic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should check Login page', () => {
    cy.get('h2').should('have.text', 'Login')

    cy.get('[for="loginLogin"]').should('have.text', 'Login *')
    cy.get('#loginLogin').should('have.attr', 'placeholder', 'user@gmail.com')

    cy.get('[for="loginPassword"]').should('have.text', 'Password *')
    cy.get('#loginPassword').should('have.attr', 'placeholder', 'Password')

    cy.get('a[href="/registration"]').should('have.attr', 'href', '/registration').and('have.text', 'Registration')
    cy.get('button[type="submit"]').should('have.text', 'Login')
    cy.get('button[type="button"]').eq(0).should('have.text', 'Login via Google')
    cy.get('button[type="button"]').eq(1).should('have.text', 'Login via GitHub')
  })

  it('Should check Login page warnings', () => {        // Need to add test
    cy.get('button').contains('Login').click()

    cy.get('#loginLogin').invoke('attr', 'class').should('include', 'bg-[#e5b6c0]').and('include', 'border-[red]')
    cy.get('p').eq(0).should('have.class', 'text-[red]').and('have.text', 'Email is wrong or doesn\'t exist')

    cy.get('#loginPassword').invoke('attr', 'class').should('include', 'bg-[#e5b6c0]').and('include', 'border-[red]')
    cy.get('p').eq(1).should('have.class', 'text-[red]').and('have.text', 'Wrong Password')
  })

  it('Should check login via Credentials', () => {
    cy.loginViaCredentials()

    cy.location().should(location => {
      expect(location.host).to.eq('localhost:3000')
      expect(location.hostname).to.eq('localhost')
      expect(location.href).to.eq('http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F')
      expect(location.port).to.eq('3000')
    })
    cy.get('h1').should('have.text', 'Web Blog')
    cy.contains('Add articles and save them to favorites.')
    cy.get('a').contains('Start')

    cy.get('header').find('p').should('have.text', 'Cypress Test User')
    cy.get('header').find('img').should('have.attr', 'alt', 'Profile Image')

    cy.get('.burger-wrapper').click()
    cy.contains('Logout').click()

    cy.location().should(location => {
      expect(location.host).to.eq('localhost:3000')
      expect(location.hostname).to.eq('localhost')
      expect(location.href).to.eq('http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F')
      expect(location.port).to.eq('3000')
    })
  })

  it('Should check login via Credentials mobile resolution', () => {
    cy.loginViaCredentials()

    cy.viewport('iphone-x')

    cy.location().should(location => {
      expect(location.host).to.eq('localhost:3000')
      expect(location.hostname).to.eq('localhost')
      expect(location.href).to.eq('http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F')
      expect(location.port).to.eq('3000')
    })
    cy.get('h1').should('have.text', 'Web Blog')
    cy.contains('Add articles and save them to favorites.')
    cy.get('a').contains('Start')

    cy.get('[data-cy="header-profile-component"]').should('not.exist')
  })
})