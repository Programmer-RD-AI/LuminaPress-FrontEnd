describe("SignUpPage", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("renders the signup form", () => {
    cy.get("input[name=email]").should("exist");
    cy.get("input[name=password]").should("exist");
    cy.get("button[type=submit]").should("exist").and("contain", "Sign Up");
  });

  it("shows validation errors for empty fields", () => {
    cy.get("button[type=submit]").click();
    cy.get("input[name=email]").should("have.class", "Mui-error");
    cy.get("input[name=password]").should("have.class", "Mui-error");
  });

  it("shows success message and navigates to home on valid submission", () => {
    cy.intercept("POST", "/api/register", { statusCode: 201 }).as("register");
    cy.get("input[name=email]").type("testuser@example.com");
    cy.get("input[name=password]").type("Password123");
    cy.get("button[type=submit]").click();

    cy.wait("@register").then(() => {
      cy.get(".MuiSnackbar-root").should("contain", "Registration successful!");
      cy.url().should("include", "/home");
    });
  });

  it("displays error message on registration failure", () => {
    cy.intercept("POST", "/api/register", {
      statusCode: 400,
      body: { message: "Registration failed" },
    }).as("registerFailure");

    cy.get("input[name=email]").type("testuser@example.com");
    cy.get("input[name=password]").type("Password123");
    cy.get("button[type=submit]").click();

    cy.wait("@registerFailure").then(() => {
      cy.get(".MuiSnackbar-root").should("contain", "Registration failed");
    });
  });
});
