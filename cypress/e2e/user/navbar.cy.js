describe("Navbar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the site title", () => {
    cy.get('[data-cy="site-title"]').contains("LuminaPress");
  });
  it("should show Sign In and Sign Up buttons if not authenticated", () => {
    // Ensure AuthButtons are visible
    cy.get('[data-cy="auth-buttons"]').should("be.visible");
  });
});
