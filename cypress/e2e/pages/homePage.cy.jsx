describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render the ArticleList component', () => {
    cy.contains('h2', 'Articles').should('be.visible')
  })

  it('should load and display articles', () => {
    cy.get('.article-item').should('have.length.greaterThan', 0)
  })

  it('should display article titles', () => {
    cy.get('.article-title').first().should('be.visible').and('not.be.empty')
  })

  it('should check if articles are clickable', () => {
    cy.get('.article-item').first().click()
    cy.url().should('include', '/article') // Adjust based on actual route
  })

  it('should handle empty article lists gracefully', () => {
    cy.intercept('GET', '/api/articles', { body: [] }).as('getArticles')
    cy.visit('/')
    cy.wait('@getArticles')
    cy.get('.no-articles-message')
      .should('be.visible')
      .and('contain', 'No articles available')
  })
})
