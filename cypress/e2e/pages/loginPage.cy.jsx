describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login"); // Visit the login page
  });

  it("should load the login page with all elements", () => {
    cy.get("h1").should("contain", "Log in to your account"); // Check for the header
    cy.get('input[name="email"]').should("exist"); // Check for email input
    cy.get('input[name="password"]').should("exist"); // Check for password input
    cy.get('button[type="submit"]').should("contain", "Log In"); // Check for login button
  });
});
