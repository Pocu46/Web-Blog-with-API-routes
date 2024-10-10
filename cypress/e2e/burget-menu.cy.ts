interface LinkCheckResponse {
  status: number;
}

describe('Should check Burger menu', () => {
  beforeEach(() => {
    cy.loginViaCredentials()
  })

  it('Should check Burger menu bar', () => {
    cy.get('[data-cy="burger-menu-button"]').click()

    cy.get('[data-cy="burger-menu-wrapper"]').should('be.visible')
    cy.get('[data-cy="burger-menu-wrapper"]').find('h2').should('have.text', 'Create your posts to save them!')
    cy.get('[data-cy="burger-menu-wrapper"]').find('img').should('have.attr', 'alt', 'Profile Image')
    cy.get('[data-cy="burger-menu-wrapper"]').find('p').contains('Cypress Test User')
    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('a').eq(0).should('have.text', 'Profile')

    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('a').eq(1).should('have.text', 'Home')
    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('a').eq(1).invoke('attr', 'href')
      .then((href: string | undefined) => {
        if(href) {
          cy.request(href)
            .then((response: LinkCheckResponse) => {
              expect(response.status).to.equal(200)
            })
        }
      })

    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('a').eq(2).should('have.text', 'Posts')
    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('a').eq(3).should('have.text', 'Create Post')
    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('a').eq(4).should('have.text', 'Favorites')

    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('button').should('have.text', 'Logout')
  })

  it('Should check open and close Burger menu bar', () => {
    cy.get('[data-cy="burger-menu-button"]').click()
    cy.get('[data-cy="burger-menu-button"]').click()

    cy.get('[data-cy="burger-menu-wrapper"]').should('not.exist')
    cy.get('[data-cy="modal-backdrop"]').should('not.exist')

    cy.get('[data-cy="burger-menu-button"]').click()
    cy.get('[data-cy="modal-backdrop"]').click({force: true})

    cy.get('[data-cy="burger-menu-wrapper"]').should('not.exist')
    cy.get('[data-cy="modal-backdrop"]').should('not.exist')
  })

  it('Should check Burger menu navigation', () => {
    cy.get('[data-cy="burger-menu-button"]').click()

    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('a').contains( 'Profile').click()
    cy.location().should(location => {
      expect(location.href).to.include('http://localhost:3000/profile/')
    })
    cy.get('[data-cy="burger-menu-wrapper"]').should('not.exist')
    cy.get('[data-cy="modal-backdrop"]').should('not.exist')

    cy.get('[data-cy="burger-menu-button"]').click()

    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('a').contains( 'Posts').click()
    cy.location().should(location => {
      expect(location.href).to.include('http://localhost:3000/post/list')
    })
    cy.get('[data-cy="burger-menu-wrapper"]').should('not.exist')
    cy.get('[data-cy="modal-backdrop"]').should('not.exist')

    cy.get('[data-cy="burger-menu-button"]').click()

    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('a').contains( 'Create Post').click()
    cy.location().should(location => {
      expect(location.href).to.include('http://localhost:3000/post/create')
    })
    cy.get('[data-cy="burger-menu-wrapper"]').should('not.exist')
    cy.get('[data-cy="modal-backdrop"]').should('not.exist')

    cy.get('[data-cy="burger-menu-button"]').click()

    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('a').contains( 'Favorites').click()
    cy.location().should(location => {
      expect(location.href).to.include('http://localhost:3000/post/favorites')
    })
    cy.get('[data-cy="burger-menu-wrapper"]').should('not.exist')
    cy.get('[data-cy="modal-backdrop"]').should('not.exist')

    cy.get('[data-cy="burger-menu-button"]').click()

    cy.get('[data-cy="burger-menu-wrapper"]').find('nav').find('button').contains( 'Logout').click()
    cy.location().should(location => {
      expect(location.href).to.include('http://localhost:3000/login?')
    })
    cy.get('[data-cy="burger-menu-wrapper"]').should('not.exist')
    cy.get('[data-cy="modal-backdrop"]').should('not.exist')
  })
})