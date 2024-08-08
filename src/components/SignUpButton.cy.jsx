import React from 'react'
import SignUpButton from './SignUpButton'

describe('<SignUpButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignUpButton />)
  })
})