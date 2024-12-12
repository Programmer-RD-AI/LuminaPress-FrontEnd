describe("SignUpPage", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("renders the signup form", () => {
    cy.get("input[name=email]").should("exist");
    cy.get("input[name=password]").should("exist");
    cy.get("button[type=submit]").should("exist").and("contain", "Sign Up");
  });
});
