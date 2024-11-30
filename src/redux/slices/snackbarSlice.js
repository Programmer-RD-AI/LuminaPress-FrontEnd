import { createSlice } from "@reduxjs/toolkit";

// Initial state for the snackbar
const initialState = {
  open: false,
  message: "",
  severity: "success", // default severity
};

// Create the snackbar slice
const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    // Action to show snackbar with a message and severity
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || "success"; // Default to 'success' severity
    },
    // Action to hide the snackbar
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

// Export actions and reducer
export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
