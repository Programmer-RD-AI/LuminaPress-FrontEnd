import React from 'react'
import ArticlePage from './ArticlePage'

describe('<ArticlePage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ArticlePage />)
  })
})
