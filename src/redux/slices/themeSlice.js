// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("appTheme");
  return savedTheme || "dark";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      const newMode = state.mode === "dark" ? "light" : "dark";
      state.mode = newMode;
      localStorage.setItem("appTheme", newMode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("appTheme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

