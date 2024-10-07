describe('Should check Posts page logic', () => {
  beforeEach(() => {
    cy.loginViaCredentials()

    cy.get('a').contains('Start').click()
  })

  it('Should check Post page', () => {
    cy.get('nav').find('a').eq(0).click()

    cy.get('nav').find('a').eq(0).should('have.attr', 'href').then(href => {
      if (typeof href === 'string') {
        cy.request(href).its('status').should('eq', 200)
      }
    })
    cy.location().should(location => {
      expect(location.host).to.eq('localhost:3000')
      expect(location.hostname).to.eq('localhost')
      expect(location.href).to.eq('http://localhost:3000/post/list')
      expect(location.port).to.eq('3000')
    })
    cy.get('[data-cy="posts-page-searchbar"]').find('input').should('have.attr', 'placeholder', 'Search Post').and('have.attr', 'type', 'text')
    cy.get('[data-cy="posts-page-searchbar"]').find('img').should('have.attr', 'src', '/searchIcon.svg').and('have.attr', 'alt', 'close button')

    cy.get('select').find(':selected').should('have.text', 'All')
  })

  it.only('Should check Post functionality', () => {
    const hash = Date.now().toFixed(10)

    cy.get('#summary').type(`Test summary ${hash}`)
    cy.get('#text').type(`Test text ${hash}`)
    cy.get('button[type="submit"]').contains('Create').click()

    cy.get('ul').find('li').first().find('img[alt="favorite-icon"]')
    cy.get('ul').find('li').first().find('button').contains('Edit')
    cy.get('ul').find('li').first().find('button').contains('Delete')
    cy.get('ul').find('li').first().find('button').contains('Favorite')
    cy.get('ul').find('li').first().find('[data-cy="post-summary-toggler"]').find('span').should('have.text', 'Enable full Summary text')
    cy.get('ul').find('li').first().find('[data-cy="post-summary-toggler"]').find('input').should('have.attr', 'type', 'checkbox').and('not.be.checked')

    cy.get('ul').find('li').first().find('[data-cy="post-summary-toggler"]').find('input').check()
    cy.get('ul').find('li').first().find('[data-cy="post-summary-toggler"]').find('input').should('be.checked')
    cy.get(':nth-child(2) > .rfm-child > b').should('have.text', `Test summary ${hash}`)
  })
})