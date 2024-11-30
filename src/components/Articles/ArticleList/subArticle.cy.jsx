describe("SubArticles Component", () => {
  beforeEach(() => {
    // Sample props
    const articles = [
      {
        id: "1",
        title: "Exploring the Benefits of Cypress Testing",
        description: "Cypress provides end-to-end testing for modern web apps.",
        Images: ["https://via.placeholder.com/150"],
      },
      {
        id: "2",
        title: "React Testing Best Practices",
        description:
          "Testing React components is vital for reliable applications.",
        Images: [], // No image provided, should fallback to placeholder
      },
      {
        id: "3",
        title: "JavaScript Testing Frameworks",
        description: "Which JS testing framework is right for you?",
        Images: ["https://via.placeholder.com/150"],
      },
    ];

    const handleReadMore = cy.stub().as("handleReadMore");

    // Mount the component
    cy.mount(
      <SubArticles articles={articles} handleReadMore={handleReadMore} />
    );
  });

  it("renders the correct number of articles", () => {
    cy.get(".sub_article").should("have.length", 3);
  });

  it("renders article content correctly", () => {
    cy.get(".sub_article")
      .eq(0)
      .within(() => {
        cy.get(".sub_article_title").should(
          "contain",
          "Exploring the Benefits of Cypress Testing..."
        );
        cy.get(".sub_article_description").should(
          "contain",
          "Cypress provides end-to-end testing for modern web apps."
        );
        cy.get("img").should(
          "have.attr",
          "src",
          "https://via.placeholder.com/150"
        );
      });

    cy.get(".sub_article")
      .eq(1)
      .within(() => {
        cy.get(".sub_article_title").should(
          "contain",
          "React Testing Best Practices..."
        );
        cy.get(".sub_article_description").should(
          "contain",
          "Testing React components is vital for reliable applications."
        );
        cy.get("img").should("have.attr", "src", "/placeholder.jpg"); // Placeholder fallback
      });
  });

  it("calls handleReadMore with the correct article ID when an article is clicked", () => {
    // Simulate a click on the second article
    cy.get(".sub_article").eq(1).click();
    cy.get("@handleReadMore").should("have.been.calledWith", "2");
  });
});
