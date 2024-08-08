// cypress/e2e/user/articleList.cy.js

describe('ArticleList', () => {
  beforeEach(() => {
    cy.visit('/') // Ensure this path matches where your component is rendered
  })

  it('should display articles categorized by Trending, Latest, and Popular', () => {
    cy.get('[data-cy=article-list]')
      .find('[data-cy=article-section]')
      .should('have.length', 3)
      .and('contain', 'Trending')
      .and('contain', 'Latest')
      .and('contain', 'Popular')
  })

  it('should display article cards within sections', () => {
    cy.get('[data-cy=article-list]')
      .find('[data-cy=article-list-item]')
      .should('have.length.greaterThan', 0) // Ensure there are articles
  })
  it('should display section titles', () => {
    cy.get('[data-cy=article-section]')
      .should('have.length', 3) // Ensure there are 3 sections
      .each(($section) => {
        cy.wrap($section).find('.section-title').should('exist')
      })
  })
  it('should display at least one article card in each section', () => {
    cy.get('[data-cy=article-section]').each(($section) => {
      cy.wrap($section)
        .find('[data-cy=article-list-item]')
        .should('have.length.greaterThan', 0)
    })
  })
  it('should display a title in each article card', () => {
    cy.get('[data-cy=article-list-item]').each(($card) => {
      cy.wrap($card).find('h6').should('exist').and('not.be.empty')
    })
  })
  it('should have an image in each article card', () => {
    cy.get('[data-cy=article-list-item]').each(($card) => {
      cy.wrap($card).find("div[style*='background-image']").should('exist')
    })
  })
})
