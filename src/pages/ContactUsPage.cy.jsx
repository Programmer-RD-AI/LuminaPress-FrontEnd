import React from 'react'
import ContactUsPage from './ContactUsPage'

describe('<ContactUsPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ContactUsPage />)
  })
})