// File: API/users/registerUser.js
import axios from 'axios'
import { apiHeader, baseUrl } from '../../config/apiConfig'

export const registerUser = async (email, password) => {
  const response = await axios.post(`${baseUrl}/auth/register`, {
    email,
    password,
    headers: apiHeader
  })
  return response.data
}
