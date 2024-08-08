// cypress/e2e/user/footer.cy.js
describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the correct footer title', () => {
    cy.get('.footer-title').should('contain.text', 'LuminaPress')
  })

  it('should have social media links', () => {
    // Ensure that there are social media links present
    cy.get('.social-media a').should('have.length', 4)

    // Verify each social media link
    cy.get('.social-media a[href*="facebook.com"]').should('exist')
    cy.get('.social-media a[href*="twitter.com"]').should('exist')
    cy.get('.social-media a[href*="instagram.com"]').should('exist')
    cy.get('.social-media a[href*="linkedin.com"]').should('exist')

    // Verify the href attributes of social media links
    cy.get('.social-media a').each(($el) => {
      cy.wrap($el)
        .should('have.attr', 'href')
        .and(
          'match',
          /facebook\.com|twitter\.com|instagram\.com|linkedin\.com/
        )
    })
  })

  it('should contain copyright text', () => {
    cy.get('.footer-credits p').should(
      'contain.text',
      '© 2024 LuminaPress. All rights reserved.'
    )
  })
})
