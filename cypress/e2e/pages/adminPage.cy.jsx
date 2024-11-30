describe("AdminPage Tests", () => {
  before(() => {
    // Mock the Redux store state for authentication
    cy.intercept("GET", "/api/admin/user", {
      statusCode: 200,
      body: {
        email: "admin@example.com",
        isAuthenticated: true,
      },
    }).as("adminAuth");
  });

  beforeEach(() => {
    // Mock Redux store state
    cy.window().then((win) => {
      win.localStorage.setItem("adminToken", "mock-token");
    });

    // Visit the admin page
    cy.visit("/admin");
  });

  it("should display the Admin Control Center and User Profile", () => {
    cy.get('[data-testid="admin-header"]').should(
      "contain",
      "Admin Control Center"
    );
    cy.get('[data-testid="user-welcome"]').should(
      "contain",
      "Welcome, admin@example.com"
    );
  });

  it("should display API Key Management section", () => {
    cy.get('[data-testid="api-management"]').should("exist");
    cy.get('[data-testid="api-key-name-input"]').should("exist");
    cy.get('[data-testid="api-key-env-select"]').should("exist");
    cy.get('[data-testid="generate-api-key-btn"]').should("exist");
  });

  it("should generate a new API key", () => {
    // Input key name
    cy.get('[data-testid="api-key-name-input"]').type("Test API Key");
    cy.get('[data-testid="api-key-env-select"]').select("development");
    cy.get('[data-testid="generate-api-key-btn"]').click();

    // Check that the new key is added to the list
    cy.get('[data-testid="api-keys-list"] .key-item').should("have.length", 1);
    cy.get('[data-testid="api-keys-list"] .key-name').should(
      "contain",
      "Test API Key"
    );
    cy.get('[data-testid="api-keys-list"] .key-env').should(
      "contain",
      "development"
    );
  });

  it("should delete an API key", () => {
    // First generate a key
    cy.get('[data-testid="api-key-name-input"]').type("Key to Delete");
    cy.get('[data-testid="api-key-env-select"]').select("staging");
    cy.get('[data-testid="generate-api-key-btn"]').click();

    // Delete the generated key
    cy.get('[data-testid="api-keys-list"] .key-item').should("have.length", 1);
    cy.get('[data-testid="delete-api-key-1"]').click();

    // Ensure the key is removed from the list
    cy.get('[data-testid="api-keys-list"] .key-item').should("have.length", 0);
  });

  it("should display Configuration Management section", () => {
    cy.get('[data-testid="configuration-management"]').should("exist");
    cy.get('[data-testid="config-name-input"]').should("exist");
    cy.get('[data-testid="config-type-select"]').should("exist");
    cy.get('[data-testid="config-value-input"]').should("exist");
    cy.get('[data-testid="add-config-btn"]').should("exist");
  });

  it("should add a new configuration", () => {
    // Input configuration details
    cy.get('[data-testid="config-name-input"]').type("New Configuration");
    cy.get('[data-testid="config-type-select"]').select("feature");
    cy.get('[data-testid="config-value-input"]').type("new-feature:true");
    cy.get('[data-testid="add-config-btn"]').click();

    // Check that the new configuration is added to the list
    cy.get('[data-testid="configurations-list"] .config-item').should(
      "have.length",
      4
    );
    cy.get('[data-testid="configurations-list"] .config-name').should(
      "contain",
      "New Configuration"
    );
    cy.get('[data-testid="configurations-list"] .config-type').should(
      "contain",
      "feature"
    );
  });

  it("should delete a configuration", () => {
    // First add a configuration
    cy.get('[data-testid="config-name-input"]').type("Config to Remove");
    cy.get('[data-testid="config-type-select"]').select("performance");
    cy.get('[data-testid="config-value-input"]').type("200 req/min");
    cy.get('[data-testid="add-config-btn"]').click();

    // Delete the added configuration
    cy.get('[data-testid="configurations-list"] .config-item').should(
      "have.length",
      4
    );
    cy.get('[data-testid="delete-config-4"]').click();

    // Ensure the configuration is removed from the list
    cy.get('[data-testid="configurations-list"] .config-item').should(
      "have.length",
      3
    );
  });

  it("should log out successfully", () => {
    cy.get('[data-testid="nav-logout"]').click();
    cy.url().should("include", "/admin/login");
  });
});
