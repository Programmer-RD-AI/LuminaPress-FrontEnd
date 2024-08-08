import React from 'react'
import SignUpPage from './SignUpPage'

describe('<SignUpPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignUpPage />)
  })
})
