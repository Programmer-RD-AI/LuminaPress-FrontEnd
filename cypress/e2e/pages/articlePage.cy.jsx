/// <reference types="cypress" />

describe("Article Page", () => {
  beforeEach(() => {
    // Mock the API call for fetching article data
    cy.intercept("GET", "/articles/*", {
      statusCode: 200,
      body: {
        id: "123",
        title: "Test Article",
        subtitle: "A brief overview of the article",
        category: "Tech",
        description: "This is the description of the article.",
        images: ["https://via.placeholder.com/150"],
        authorImage: "https://via.placeholder.com/50",
        authors: ["John Doe", "Jane Smith"],
        publishedAt: "2024-11-01T12:00:00Z",
        tags: ["tech", "innovation"],
        likes: 10,
        liked_by: ["user123"],
        comments: [{ id: "1", text: "Great article!" }],
      },
    }).as("getArticle");
  });

  it("should load the article page and display content correctly", () => {
    // Visit the article page with a mock article ID
    cy.visit("/article/123");

    // Wait for the article data to be fetched
    cy.wait("@getArticle");

    // Check that the article title is displayed correctly
    cy.get("h1").should("contain.text", "Test Article");

    // Check that the article subtitle is displayed
    cy.get("h2").should("contain.text", "A brief overview of the article");

    // Verify that the article description is visible
    cy.get(".content").should(
      "contain.text",
      "This is the description of the article."
    );

    // Check that the author names are displayed
    cy.get(".author-name").should("contain.text", "By John Doe, Jane Smith");

    // Verify the publish date is formatted correctly
    cy.get(".publish-date").should("contain.text", "November 1, 2024");

    // Verify that the image carousel is visible and functioning
    cy.get(".carousel-container img")
      .should("have.attr", "src", "https://via.placeholder.com/150")
      .and("be.visible");

    // Verify that tags are displayed
    cy.get(".tags-section .tag")
      .should("contain.text", "tech")
      .and("contain.text", "innovation");

    // Check that the comments section is displayed
    cy.get(".comments").should("exist");
  });

  it("should toggle dark and light modes correctly", () => {
    // Check initial dark mode
    cy.get("article").should("have.class", "dark");

    // Click the theme toggle button to switch to light mode
    cy.get(".theme-toggle").click();

    // Verify that the page switches to light mode
    cy.get("article").should("not.have.class", "dark");

    // Click again to switch back to dark mode
    cy.get(".theme-toggle").click();

    // Verify it switches back to dark mode
    cy.get("article").should("have.class", "dark");
  });

  it("should navigate the image carousel", () => {
    // Verify the first image in the carousel
    cy.get(".carousel-container img").should(
      "have.attr",
      "src",
      "https://via.placeholder.com/150"
    );

    // Click next button to change the image
    cy.get(".carousel-btn.next").click();

    // Verify that the next image is displayed (this could be enhanced depending on your carousel setup)
    cy.get(".carousel-container img").should(
      "have.attr",
      "src",
      "https://via.placeholder.com/150"
    );

    // Click prev button to change the image back
    cy.get(".carousel-btn.prev").click();

    // Verify it returns to the original image
    cy.get(".carousel-container img").should(
      "have.attr",
      "src",
      "https://via.placeholder.com/150"
    );
  });

  it("should log the article view if the user is authenticated", () => {
    // Mock the user authentication
    cy.window().then((window) => {
      window.localStorage.setItem(
        "auth",
        JSON.stringify({ id: "user123", isAuthenticated: true })
      );
    });

    // Visit the article page
    cy.visit("/article/123");

    // Ensure that the article view is logged
    cy.wait("@getArticle");

    // Verify that the logArticleView function is called (you can mock the API call for logging views if needed)
    cy.intercept("POST", "/api/articles/log", (req) => {
      expect(req.body.userId).to.equal("user123");
      expect(req.body.articleId).to.equal("123");
    }).as("logView");

    // Call the API to log the view
    cy.wait("@logView");
  });
});
