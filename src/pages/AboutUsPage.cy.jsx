import React from 'react'
import AboutUsPage from './AboutUsPage'

describe('<AboutUsPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AboutUsPage />)
  })
})