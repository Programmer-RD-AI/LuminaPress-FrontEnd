describe("ContactUsPage", () => {
  beforeEach(() => {
    // Visit the Contact Us page
    cy.visit("/contact");
  });

  it("should display the correct page title", () => {
    cy.contains("Contact Us").should("exist");
  });

  it("should display the welcome message", () => {
    cy.contains("We would love to hear from you!").should("be.visible");
  });

  it("should display the description text", () => {
    cy.contains(
      "Whether you have questions, feedback, or just want to say hello, feel free to reach out to us using the form below."
    ).should("be.visible");
  });

  it("should have a submit button", () => {
    cy.contains("Send Message").should("be.visible");
  });

  it("should show fade-in and zoom effects on the page elements", () => {
    // Check if the title appears after fade-in
    cy.get("h1").should("be.visible");

    // Check if the form container appears after zoom-in
    cy.get("div.MuiPaper-root").should("be.visible");
  });

  it("should show the follow us on social media section", () => {
    cy.contains("Follow us on social media").should("be.visible");
    cy.contains(
      "Stay connected and follow us on our social media channels for the latest updates and news."
    ).should("be.visible");
  });

  it("should display correct layout for different screen sizes", () => {
    cy.viewport(1024, 768); // Desktop view
    cy.get("form").should("be.visible");

    cy.viewport(375, 667); // Mobile view
    cy.get("form").should("be.visible");
  });
});
