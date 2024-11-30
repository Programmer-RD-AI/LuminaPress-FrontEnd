describe('MainArticle Component', () => {
  beforeEach(() => {
    // Set up the props for the component
    const article = {
      id: '12345',
      title: 'An amazing article about technology',
      description: 'This is a brief description of the article...'
    }
    const highestResImage = 'https://via.placeholder.com/150'
    const handleReadMore = cy.stub().as('handleReadMore')

    // Mount the component using Cypress's React testing library
    cy.mount(
      <MainArticle
        article={article}
        highestResImage={highestResImage}
        handleReadMore={handleReadMore}
      />
    )
  })

  it('renders the article title and description', () => {
    cy.get('.main_article .title').should(
      'contain',
      'An amazing article about technology...'
    )
    cy.get('.main_article .text p').should(
      'contain',
      'This is a brief description of the article...'
    )
  })

  it('renders the image with the correct source and alt attribute', () => {
    cy.get('.main_article img')
      .should('have.attr', 'src', 'https://via.placeholder.com/150')
      .and('have.attr', 'alt', 'thumbnail')
  })

  it('calls handleReadMore with the correct article ID when the title is clicked', () => {
    cy.get('.main_article .title').click()
    cy.get('@handleReadMore').should('have.been.calledWith', '12345')
  })

  it('calls handleReadMore with the correct article ID when the "READ MORE" button is clicked', () => {
    cy.get('.main_article .btn').click()
    cy.get('@handleReadMore').should('have.been.calledWith', '12345')
  })
})
