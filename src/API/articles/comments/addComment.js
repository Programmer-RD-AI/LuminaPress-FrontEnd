import { apiHeader, baseUrl } from '../../../config/apiConfig'

// Add a new comment to an article
export const addComment = async (articleId, userId, comment) => {
  try {
    const response = await fetch(`${baseUrl}/articles/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...apiHeader
      },
      body: JSON.stringify({
        articleId,
        userId,
        comment
      })
    })
    return response
  } catch (error) {
    console.error('Error adding comment:', error)
    throw error
  }
}
