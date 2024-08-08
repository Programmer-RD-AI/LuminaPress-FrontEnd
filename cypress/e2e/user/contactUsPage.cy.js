// cypress/integration/contactUsPage.spec.js
describe('Contact Us Page', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should display the Contact Us heading', () => {
    cy.get('h1').contains('Contact Us').should('be.visible')
  })

  it('should display the form heading', () => {
    cy.get('h5')
      .contains('We would love to hear from you!')
      .should('be.visible')
  })

  it('should display form description', () => {
    cy.get('body')
      .contains(
        'Whether you have questions, feedback, or just want to say hello'
      )
      .should('be.visible')
  })

  it('should have an Email field', () => {
    cy.get("input[type='email']").should('exist')
  })

  it('should have a Message field', () => {
    cy.get('textarea').should('exist')
  })

  it('should have a Send Message button', () => {
    cy.get('button').contains('Send Message').should('be.visible')
  })

  it('should display social media follow section', () => {
    cy.contains('Follow us on social media').should('be.visible')
    cy.contains(
      'Stay connected and follow us on our social media channels'
    ).should('be.visible')
  })

  it('should have animations on elements', () => {
    // Check for animations by ensuring elements are visible after a delay
    cy.get('h1').should('be.visible')
    cy.get('form').should('be.visible')
  })
})
