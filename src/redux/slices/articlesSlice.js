import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  articleType: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setArticleType: (state, action) => {
      state.articleType = action.payload;
    },
  },
});

export const { setArticles, setArticleType } = articlesSlice.actions;
export default articlesSlice.reducer;
