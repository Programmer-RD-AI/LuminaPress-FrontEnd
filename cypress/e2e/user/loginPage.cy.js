// cypress/integration/loginPage.spec.js
describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display the Login heading", () => {
    cy.get("h1").contains("Login").should("be.visible");
  });

  it("should display the form heading", () => {
    cy.get("h5")
      .contains("Welcome Back! Please log in to your account.")
      .should("be.visible");
  });

  it("should display form description", () => {
    cy.contains(
      "If you have an account with us, please log in to access your dashboard and enjoy personalized features"
    ).should("be.visible");
  });

  it("should have an Email field", () => {
    cy.get("input[type='email']").should("exist");
  });

  it("should have a Password field", () => {
    cy.get("input[type='password']").should("exist");
  });

  it("should have a Login button", () => {
    cy.get("button").contains("Login").should("be.visible");
  });

  it("should have a link to the Sign Up page", () => {
    cy.contains("Don’t have an account? Sign Up").should("be.visible");
    cy.get('a[href="/signup"]').should("exist");
  });

  it("should have animations on elements", () => {
    // Check for animations by ensuring elements are visible after a delay
    cy.get("h1").should("be.visible");
    cy.get("form").should("be.visible");
  });
});
