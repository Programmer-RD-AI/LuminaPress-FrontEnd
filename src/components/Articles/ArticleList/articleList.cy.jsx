describe('ArticleList Component', () => {
  // Mock articles data
  const mockArticles = [
    {
      id: '1',
      title: 'Main Article',
      Images: [
        { url: 'image1-low.jpg', resolution: 'low' },
        { url: 'image1-high.jpg', resolution: 'high' }
      ]
    },
    {
      id: '2',
      title: 'Side Article 1',
      Images: [{ url: 'image2.jpg', resolution: 'medium' }]
    },
    {
      id: '3',
      title: 'Side Article 2',
      Images: [{ url: 'image3.jpg', resolution: 'medium' }]
    }
    // Add more mock articles as needed
  ]

  beforeEach(() => {
    // Mock the custom hook
    cy.intercept('**/articles*', {
      statusCode: 200,
      body: {
        articles: mockArticles,
        articleType: 'news'
      }
    }).as('fetchArticles')

    // Mock navigation
    cy.stub('react-router-dom', 'useNavigate').returns(
      cy.spy().as('navigateSpy')
    )

    // Render the component
    cy.mount(<ArticleList />)

    // Wait for articles to load
    cy.wait('@fetchArticles')
  })

  it('renders the main article', () => {
    // Check main article section exists
    cy.get('[class*="left_side"]').should('exist')

    // Verify main article title is displayed
    cy.contains(mockArticles[0].title).should('be.visible')
  })

  it('renders side articles', () => {
    // Check side articles section exists
    cy.get('[class*="right_side"]').should('exist')

    // Verify side article titles are displayed
    cy.contains(mockArticles[1].title).should('be.visible')
    cy.contains(mockArticles[2].title).should('be.visible')
  })

  it('navigates to article detail on read more click', () => {
    // Click read more on the main article
    cy.contains('Read More').click()

    // Verify navigation was called with correct article ID
    cy.get('@navigateSpy').should(
      'have.been.calledWith',
      `/a/${mockArticles[0].id}`
    )
  })

  it('renders sub-articles', () => {
    // Check sub-articles section exists
    cy.get('[class*="sub_articles_section_wrapper"]').should('exist')
  })

  it('handles empty articles array', () => {
    // Mock empty articles
    cy.intercept('**/articles*', {
      statusCode: 200,
      body: {
        articles: [],
        articleType: 'news'
      }
    }).as('emptyArticles')

    // Remount component with empty articles
    cy.mount(<ArticleList />)

    // Wait for articles to load
    cy.wait('@emptyArticles')

    // Verify component doesn't break with empty array
    cy.get('[class*="article_list"]').should('exist')
  })
})
