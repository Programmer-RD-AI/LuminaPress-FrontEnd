describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login"); // Visit the login page
  });

  it("should load the login page with all elements", () => {
    cy.get("h1").should("contain", "Log in to your account"); // Check for the header
    cy.get('input[name="email"]').should("exist"); // Check for email input
    cy.get('input[name="password"]').should("exist"); // Check for password input
    cy.get('button[type="submit"]').should("contain", "Log In"); // Check for login button
  });

  it("should show validation errors for empty form submission", () => {
    cy.get('button[type="submit"]').click(); // Try submitting without filling out the form

    cy.get('input[name="email"]')
      .should("have.class", "Mui-error") // Check for error on email input
      .and("have.attr", "aria-invalid", "true"); // Ensure the email field is invalid
    cy.get('input[name="password"]')
      .should("have.class", "Mui-error") // Check for error on password input
      .and("have.attr", "aria-invalid", "true"); // Ensure the password field is invalid

    cy.get(".MuiFormHelperText-root").should("exist"); // Check for validation error messages
  });

  it("should show an error message for invalid email format", () => {
    cy.get('input[name="email"]').type("invalid-email"); // Enter invalid email
    cy.get('button[type="submit"]').click(); // Submit the form
    cy.get('input[name="email"]').should("have.class", "Mui-error"); // Check for error
    cy.get(".MuiFormHelperText-root").should("contain", "Email is not valid"); // Ensure the specific error message appears
  });

  it("should successfully log in and navigate to homepage", () => {
    const validEmail = "testuser@example.com"; // Update with an easily verifiable test email
    const validPassword = "password123"; // Update with a valid test password

    cy.intercept("POST", "/api/login", { statusCode: 200 }).as("loginRequest"); // Mock successful login response

    cy.get('input[name="email"]').type(validEmail); // Enter valid email
    cy.get('input[name="password"]').type(validPassword); // Enter valid password
    cy.get('button[type="submit"]').click(); // Submit the form

    cy.wait("@loginRequest"); // Wait for the login request to complete

    // Verify successful navigation
    cy.url().should("eq", Cypress.config().baseUrl + "/"); // Check homepage URL
    cy.contains("Welcome"); // Replace with actual homepage text
  });

  it("should show error message when login fails", () => {
    const invalidEmail = "invaliduser@example.com";
    const invalidPassword = "wrongpassword";

    cy.intercept("POST", "/auth/login", {
      statusCode: 401,
      body: { message: "Invalid email or password" },
    }).as("loginFail");

    cy.get('input[name="email"]').type(invalidEmail); // Enter invalid email
    cy.get('input[name="password"]').type(invalidPassword); // Enter invalid password
    cy.get('button[type="submit"]').click(); // Submit the form

    cy.wait("@loginFail"); // Wait for the failed login request

    // Verify error message is displayed
    cy.get(".MuiSnackbar-root").should("contain", "Invalid email or password"); // Check for error notification
  });
});
