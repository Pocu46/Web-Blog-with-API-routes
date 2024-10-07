describe('Should check Create Post logic', () => {
  beforeEach(() => {
    cy.loginViaCredentials()
  })

  it('Should check Create Post page', () => {
    cy.get('a').contains('Start').click()
    cy.location().should(location => {
      expect(location.host).to.eq('localhost:3000')
      expect(location.hostname).to.eq('localhost')
      expect(location.href).to.eq('http://localhost:3000/post/create')
      expect(location.port).to.eq('3000')
    })

    cy.get('nav')
    cy.get('nav').find('a').eq(0).should('have.attr', 'href', '/post/list').and('have.text', 'Posts')
    cy.get('nav').find('a').eq(1).should('have.attr', 'href', '/post/create').and('have.text', 'Create')
    cy.get('nav').find('a').eq(1).should('have.attr', 'href').then(href => {
      if (typeof href === 'string') {
        cy.request(href).its('status').should('eq', 200)
      }
    })
    cy.get('nav').find('a').eq(2).should('have.attr', 'href', '/post/favorites').and('have.text', 'Favorites')

    cy.get('h2').contains('Create New Post')

    cy.get('label[for="summary"]').should('have.text', 'Summary *')
    cy.get('#summary').should('have.attr', 'placeholder', 'Enter your summary')

    cy.get('label[for="text"]').should('have.text', 'Text *')
    cy.get('#text').should('have.attr', 'placeholder', 'Enter your article text')

    cy.get('label').contains('Options')
    cy.get('select').should('have.attr', 'name', 'type')
    cy.get('select').find('option').should('have.length', 2)
    cy.get('select').should('have.value', 'Note')
    cy.get('select').find('option').eq(0).should('have.value', 'Note').and('have.text', 'Note')
    cy.get('select').find('option').eq(1).should('have.value', 'News').and('have.text', 'News')

    cy.get('button[type="submit"]').contains('Create')
  })

  it('Should check Create Post page warning', () => {
    cy.get('a').contains('Start').click()

    cy.get('button[type="submit"]').contains('Create').click()
    cy.get('#summary').invoke('attr', 'class').should('include', 'bg-[#e5b6c0]').and('include', 'border-[red]')
    cy.get('p[class="text-[red]"]').eq(0).should('have.class', 'text-[red]').and('have.text', 'The Summary field should have at least 3 characters')
    cy.get('#text').invoke('attr', 'class').should('include', 'bg-[#e5b6c0]').and('include', 'border-[red]')
    cy.get('p[class="text-[red]"]').eq(1).should('have.class', 'text-[red]').and('have.text', 'The Text field should have at least 5 characters')
  })

  it('Should check create post logic', () => {
    const hash = Date.now().toFixed(10)

    cy.get('a').contains('Start').click()

    cy.get('#summary').type(`Test summary ${hash}`)
    cy.get('#text').type(`Test text ${hash}`)
    cy.get('select').select('News')
    cy.get('button[type="submit"]').contains('Create').click()

    cy.contains('Loading...')

    cy.location().should(location => {
      expect(location.host).to.eq('localhost:3000')
      expect(location.hostname).to.eq('localhost')
      expect(location.href).to.eq('http://localhost:3000/post/list')
      expect(location.port).to.eq('3000')
    })

    cy.get('ul').find('li').first().find('p>b').should('have.text', `Test summary ${hash}`)
    cy.get('ul').find('li').first().find('p').contains(`Test text ${hash}`)
    cy.get('ul').find('li').first().find('img[alt="favorite-icon"]').siblings('span').should('have.text', 'News')
    cy.get('nav').find('a').eq(0).should('have.attr', 'href').then(href => {
      if (typeof href === 'string') {
        cy.request(href).its('status').should('eq', 200)
      }
    })
  })

  it('Should check create post with Note type', () => {
    const hash = Date.now().toFixed(10)

    cy.get('a').contains('Start').click()

    cy.get('#summary').type(`Test summary ${hash}`)
    cy.get('#text').type(`Test text ${hash}`)
    cy.get('button[type="submit"]').contains('Create').click()

    cy.get('ul').find('li').first().find('p>b').should('have.text', `Test summary ${hash}`)
    cy.get('ul').find('li').first().find('p').contains(`Test text ${hash}`)
    cy.get('ul').find('li').first().find('img[alt="favorite-icon"]').siblings('span').should('have.text', 'Note')
    cy.get('nav').find('a').eq(0).should('have.attr', 'href').then(href => {
      if (typeof href === 'string') {
        cy.request(href).its('status').should('eq', 200)
      }
    })
  })
})