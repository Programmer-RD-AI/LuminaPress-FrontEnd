// cypress/integration/homePage.spec.js

describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render ArticleList", () => {
    cy.get("[data-cy=article-list]").should("be.visible");
  });

  it("should render Footer", () => {
    cy.get("footer").should("be.visible");
  });

  it("should display at least one article card in ArticleList", () => {
    cy.get("[data-cy=article-list]")
      .find("[data-cy=article-list-item]")
      .should("have.length.greaterThan", 0);
  });

  it("should have a footer with a specific text", () => {
    cy.get("footer").should("contain.text", "©"); // Assuming the footer contains a copyright symbol
  });
});
