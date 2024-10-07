describe('Should check Registration logic', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.contains('Registration').click()
  })

  it('Should check Registration page', () => {
    cy.location().should(location => {
      expect(location.host).to.eq('localhost:3000')
      expect(location.hostname).to.eq('localhost')
      expect(location.href).to.eq('http://localhost:3000/registration')
      expect(location.port).to.eq('3000')
    })

    cy.get('h2').should('have.text', 'Registration')

    cy.get('label[for="registrationLogin"]').should('have.text', 'Email *')
    cy.get('#registrationLogin').should('have.attr', 'placeholder', 'user@gmail.com')

    cy.get('label[for="registrationname"]').should('have.text', 'User Name *')
    cy.get('#registrationname').should('have.attr', 'placeholder', 'John Doe')

    cy.get('label[for="registrationPassword"]').should('have.text', 'Password *')
    cy.get('#registrationPassword').should('have.attr', 'placeholder', 'Password')

    cy.get('label[for="registrationConfirmPassword"]').should('have.text', 'Confirm Password *')
    cy.get('#registrationConfirmPassword').should('have.attr', 'placeholder', 'Confirm Password')

    cy.get('button').contains('Registration')

    cy.get('a').contains('Login').click()

    cy.location().should(location => {
      expect(location.host).to.eq('localhost:3000')
      expect(location.hostname).to.eq('localhost')
      expect(location.href).to.eq('http://localhost:3000/login')
      expect(location.port).to.eq('3000')
    })
  })

  it('Should check Registration page warnings', () => {
    cy.get('button').contains('Registration').click()

    cy.get('#registrationLogin').invoke('attr', 'class').should('include', 'bg-[#e5b6c0]').and('include', 'border-[red]')
    cy.get('p').eq(0).should('have.class', 'text-[red]').and('have.text', 'Email should have \'@\' symbol')

    cy.get('#registrationname').invoke('attr', 'class').should('include', 'bg-[#e5b6c0]').and('include', 'border-[red]')
    cy.get('p').eq(1).should('have.class', 'text-[red]').and('have.text', 'User Name field should have at least 3 letters')

    cy.get('#registrationPassword').invoke('attr', 'class').should('include', 'bg-[#e5b6c0]').and('include', 'border-[red]')
    cy.get('p').eq(2).should('have.class', 'text-[red]').and('have.text', 'Password field should have at least 6 symbols and include letters, upper case, digits')

    cy.get('#registrationConfirmPassword').invoke('attr', 'class').should('include', 'bg-[#e5b6c0]').and('include', 'border-[red]')
    cy.get('p').eq(3).should('have.class', 'text-[red]').and('have.text', 'Confirm Password field should have at least 6 symbols and include letters, upper case, digits and should match to \'Password\' field')
  })

  it('Should check new User registration logic', () => {
    const hash = Date.now().toFixed(0)

    cy.get('button').contains('Registration').click()

    cy.get('#registrationLogin').type(`testEmail${hash}@gmail.com`)
    cy.get('#registrationname').type(`Test User ${hash}`)
    cy.get('#registrationPassword').type(`Pass${hash}`)
    cy.get('#registrationConfirmPassword').type(`Pass${hash}`)

    cy.get('button').contains('Registration').click()

    cy.location().should(location => {
      expect(location.host).to.eq('localhost:3000')
      expect(location.hostname).to.eq('localhost')
      expect(location.href).to.eq('http://localhost:3000/')
      expect(location.port).to.eq('3000')
    })

    cy.get('.text-xl').should('have.text', `Test User ${hash}`)
  })
})