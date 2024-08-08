// cypress/integration/aboutUsPage.spec.js
describe("About Us Page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("should display the About Us heading", () => {
    cy.get("h1").contains("About Us").should("be.visible");
  });

  it("should display the Vision section", () => {
    cy.contains("Our Vision").should("be.visible");
    cy.contains("To be a leading source of knowledge and inspiration").should(
      "be.visible"
    );
  });

  it("should display the Mission section", () => {
    cy.contains("Our Mission").should("be.visible");
    cy.contains("To deliver high-quality information and resources").should(
      "be.visible"
    );
  });

  it("should display the Values section", () => {
    cy.contains("Our Values").should("be.visible");
    cy.contains("Integrity, Excellence, Innovation, and Community").should(
      "be.visible"
    );
  });

  it("should display the Meet Our Team section", () => {
    cy.contains("Meet Our Team").should("be.visible");
    cy.contains("Our dedicated team brings a wealth of experience").should(
      "be.visible"
    );
  });
});
