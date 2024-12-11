import { createSlice } from "@reduxjs/toolkit";

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    articleIds: [],
  },
  reducers: {
    addBookmark: (state, action) => {
      // Add the article ID if it's not already in the list
      if (!state.articleIds.includes(action.payload)) {
        state.articleIds.push(action.payload);
      }
    },
    removeBookmark: (state, action) => {
      // Remove the article ID from the list
      state.articleIds = state.articleIds.filter((id) => id !== action.payload);
    },
    clearBookmarks: (state) => {
      // Clear all bookmarks
      state.articleIds = [];
    },
  },
});

// Export actions and reducer
export const { addBookmark, removeBookmark, clearBookmarks } =
  bookmarksSlice.actions;
export default bookmarksSlice.reducer;
