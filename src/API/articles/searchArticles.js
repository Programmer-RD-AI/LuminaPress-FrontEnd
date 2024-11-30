import axios from 'axios'
import {
  setArticles,
  setArticleType,
  setLoading
} from '../../redux/slices/articlesSlice'
import { apiHeader, baseUrl } from '../../config/apiConfig'

// Search articles based on user query
export const searchArticles = (query) => async (dispatch) => {
  try {
    // Dispatch loading state as true before the request is made
    dispatch(setLoading(true))

    // Make the API request to search articles by query
    const response = await axios.get(`${baseUrl}/articles/search?q=${query}`, {
      headers: apiHeader
    })

    // Dispatch actions to update the store with fetched articles and set article type to 'Search Results'
    dispatch(setArticles(response.data.articles))
    dispatch(setArticleType('Search Results'))
  } catch (error) {
    console.error('Error searching articles:', error)
    // Handle or log error in the Redux state if needed
  } finally {
    // Dispatch loading state as false after the request completes (whether successful or not)
    dispatch(setLoading(false))
  }
}
