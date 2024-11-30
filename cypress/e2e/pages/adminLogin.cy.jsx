describe('AdminLogin Component', () => {
  beforeEach(() => {
    // Visit the admin login page
    cy.visit('/admin/login') // Update the URL based on your app's routing
  })

  it('renders the login form correctly', () => {
    // Check if the login form and its elements are rendered
    cy.get('.admin-login-wrapper').should('be.visible')
    cy.get('.admin-login-container').should('exist')
    cy.get('h2').contains('Admin Portal')
    cy.get('p').contains('Secure Access Required')
    cy.get('input#email').should('exist')
    cy.get('input#password').should('exist')
    cy.get('button[type="submit"]').contains('Sign In')
  })

  it('displays an error message for invalid credentials', () => {
    // Enter invalid email and password
    cy.get('input#email').type('wrongemail@example.com')
    cy.get('input#password').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    // Check for the error message
    cy.get('.error-message').should('be.visible')
    cy.get('.error-message').contains('Invalid email or password')
  })

  it('redirects to admin dashboard on successful login', () => {
    // Enter valid email and password (hardcoded credentials in your component)
    cy.get('input#email').type('admin@example.com')
    cy.get('input#password').type('admin123')
    cy.get('button[type="submit"]').click()

    // Check if navigation occurs to the admin dashboard (update the URL if necessary)
    cy.url().should('include', '/admin/')
  })
})
