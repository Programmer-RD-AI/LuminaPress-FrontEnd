// cypress/e2e/user/articleCard.cy.js

describe("ArticleCard", () => {
  beforeEach(() => {
    // Visit the page where the ArticleCard is displayed
    cy.visit("/"); // Adjust this path if ArticleCard is on a different route
  });

  it("should display article card", () => {
    // Ensure at least one card exists and is visible
    cy.get(".article-card").first().should("exist").and("be.visible");
  });

  it("should display article title", () => {
    // Ensure at least one card exists and is visible
    cy.get(".article-card").first().should("exist").and("be.visible");

    // Check if the title is present within the first card
    cy.get(".article-card")
      .first()
      .within(() => {
        cy.get("h6").should("exist").and("not.be.empty");
      });
  });

  it("should display article summary", () => {
    // Ensure at least one card exists and is visible
    cy.get(".article-card").first().should("exist").and("be.visible");

    // Check if the summary is present within the first card
    cy.get(".article-card")
      .first()
      .within(() => {
        cy.get("p").should("exist").and("not.be.empty");
      });
  });

  it("should navigate to the article detail page on click", () => {
    // Ensure at least one card exists and is visible
    cy.get(".article-card").first().should("exist").and("be.visible");

    // Click the first card to navigate
    cy.get(".article-card").first().click();

    // Verify that the URL includes the article ID
    cy.url().should("include", "/article/");
  });
});
