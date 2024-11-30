describe("AboutUsPage", () => {
  beforeEach(() => {
    // Visit the About Us page
    cy.visit("/about");
  });

  it("should display the correct page title", () => {
    cy.get("h1").contains("About Us").should("exist");
  });

  it("should display the welcome message", () => {
    cy.contains("Welcome to our platform!").should("be.visible");
  });

  it("should display the mission statement", () => {
    cy.contains(
      "We are a team of passionate individuals committed to bringing you the best content."
    ).should("be.visible");
  });

  it('should display the "Our Vision", "Our Mission", and "Our Values" sections', () => {
    cy.contains("Our Vision").should("be.visible");
    cy.contains("Our Mission").should("be.visible");
    cy.contains("Our Values").should("be.visible");
  });

  it('should display "Meet Our Team" section', () => {
    cy.contains("Meet Our Team").should("be.visible");
  });

  it('should show text for "Our Vision", "Our Mission", and "Our Values"', () => {
    cy.contains("To be a leading source of knowledge").should("be.visible");
    cy.contains("To deliver high-quality information").should("be.visible");
    cy.contains("Integrity, Excellence, Innovation, and Community").should(
      "be.visible"
    );
  });
});
