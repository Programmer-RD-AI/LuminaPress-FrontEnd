import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import articlesReducer from "./slices/articlesSlice";
import navbarReducer from "./slices/navbarSlice";
import loaderReducer from "./slices/loaderSlice";
import snackbarReducer from "./slices/snackbarSlice";
import adminReducer from "./slices/adminSlice";
import themeReducer from "./slices/themeSlice";
import bookmarksReducer from "./slices/bookmarkSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
    navbar: navbarReducer,
    loader: loaderReducer,
    admin: adminReducer,
    snackbar: snackbarReducer, // Add the snackbar slice here
    theme: themeReducer,
    bookmarks: bookmarksReducer
  },
});

export default store;
