describe('NotFoundPage', () => {
  beforeEach(() => {
    // Visit the page directly or by simulating an incorrect URL
    cy.visit('/nonexistent-page') // Assuming you want to test the 404 page for a nonexistent URL
  })

  it('should display the 404 error message', () => {
    // Check if the 404 heading is visible
    cy.get('h1').contains('404').should('be.visible')
  })

  it("should display the \"Oops! The page you're looking for doesn't exist.\" message", () => {
    // Check if the "Oops" message is visible
    cy.get('p')
      .contains("Oops! The page you're looking for doesn't exist.")
      .should('be.visible')
  })
})
