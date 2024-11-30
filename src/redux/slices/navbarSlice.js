// navbarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    activeOn: "home",
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setActive: (state, action) => {
      state.activeOn = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setActive, setIsAuthenticated, setLoading, setError } =
  navbarSlice.actions;
export default navbarSlice.reducer;
