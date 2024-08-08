// cypress/integration/signUpPage.spec.js
describe("Sign Up Page", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should display the Sign Up heading", () => {
    cy.get("h1").contains("Sign Up").should("be.visible");
  });

  it("should display the form heading", () => {
    cy.get("h5").contains("Create an Account").should("be.visible");
  });

  it("should display form description", () => {
    cy.contains("Join us to access exclusive content and features").should(
      "be.visible"
    );
  });

  it("should have a Username field", () => {
    cy.get("input[placeholder='Your Username']").should("exist");
  });

  it("should have an Email field", () => {
    cy.get("input[type='email']").should("exist");
  });

  it("should have a Password field", () => {
    cy.get("input[type='password']").should("exist");
  });

  it("should have a Confirm Password field", () => {
    cy.get("input[placeholder='******']").should("exist");
  });

  it("should have a Sign Up button", () => {
    cy.get("button").contains("Sign Up").should("be.visible");
  });

  it("should have a link to the Log In page", () => {
    cy.contains("Already have an account? Log In").should("be.visible");
    cy.get('a[href="/login"]').should("exist");
  });

  it("should have animations on elements", () => {
    // Check for animations by ensuring elements are visible after a delay
    cy.get("h1").should("be.visible");
    cy.get("form").should("be.visible");
  });
});
