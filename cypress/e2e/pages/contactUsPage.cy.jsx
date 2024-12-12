describe("ContactUsPage", () => {
  beforeEach(() => {
    // Visit the Contact Us page
    cy.visit("/contact");
  });

  it("should display the correct page title", () => {
    cy.contains("Contact Us").should("exist");
  });

  it("should have a submit button", () => {
    cy.contains("Send Message").should("be.visible");
  });

  it("should display correct layout for different screen sizes", () => {
    cy.viewport(1024, 768); // Desktop view
    cy.get("form").should("be.visible");

    cy.viewport(375, 667); // Mobile view
    cy.get("form").should("be.visible");
  });
});
