import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiHeader, baseUrl } from '../../config/apiConfig'
import { setArticles, setArticleType } from '../../redux/slices/articlesSlice'

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (
    { endpoint = 'articles', params = {}, set = true },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      // Access user from Redux state
      const state = getState()
      const user = state.auth.user
      console.log(user)
      // Append userId to params
      if (user) {
        params.userId = user // Assuming `user.id` contains the userId
      }

      const queryString = new URLSearchParams(params).toString()
      const url = `${baseUrl}/articles/${endpoint}${queryString ? `?${queryString}` : ''}`
      console.log(url)

      const response = await fetch(url, { headers: apiHeader })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (set) {
        dispatch(setArticles(data.articles))
        dispatch(setArticleType(queryString.split('=')[1]))
      }
      return data // Return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
