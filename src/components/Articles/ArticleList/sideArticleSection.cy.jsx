describe("SideArticleSection Component", () => {
  beforeEach(() => {
    // Sample props
    const articles = [
      {
        id: "1",
        title: "Breaking News: Cypress Testing Rocks!",
        description: "Cypress is a fantastic tool for end-to-end testing.",
      },
      {
        id: "2",
        title: "React and Cypress: A Perfect Match",
        description: "Learn how to test your React components with Cypress.",
      },
      {
        id: "3",
        title: "JavaScript Frameworks in 2024",
        description: "What makes a framework great? A quick comparison.",
      },
      {
        id: "4",
        title: "Why Testing Matters in Modern Development",
        description: "Testing improves code quality and reliability.",
      },
    ];

    const handleReadMore = cy.stub().as("handleReadMore");
    const articleType = "Technology";

    // Mount the component
    cy.mount(
      <SideArticleSection
        articles={articles}
        articleType={articleType}
        handleReadMore={handleReadMore}
      />
    );
  });

  it("renders the article type as the sidebar title", () => {
    cy.get(".sidebar_title").should("contain", "Technology");
  });

  it("renders the correct number of articles", () => {
    // We expect articles.slice(1, 4) (i.e., 3 articles) to be rendered
    cy.get(".news").should("have.length", 3);
  });

  it("renders article titles and descriptions correctly", () => {
    cy.get(".news")
      .eq(0)
      .within(() => {
        cy.get(".news_title").should(
          "contain",
          "React and Cypress: A Perfect Match..."
        );
        cy.get(".news_description").should(
          "contain",
          "Learn how to test your React components with Cypress."
        );
      });

    cy.get(".news")
      .eq(2)
      .within(() => {
        cy.get(".news_title").should(
          "contain",
          "Why Testing Matters in Modern Development..."
        );
        cy.get(".news_description").should(
          "contain",
          "Testing improves code quality and reliability."
        );
      });
  });

  it("calls handleReadMore with the correct article ID when an article is clicked", () => {
    // Click on the second article
    cy.get(".news").eq(1).click();
    cy.get("@handleReadMore").should("have.been.calledWith", "3");
  });
});
