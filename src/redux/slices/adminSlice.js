import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  userData: {}
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.userData = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.userData = {}
    }
  }
})

export const { login, logout } = adminSlice.actions
export default adminSlice.reducer
