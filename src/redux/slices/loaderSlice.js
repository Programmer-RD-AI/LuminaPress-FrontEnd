import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: { loading: false },
  reducers: {
    setLoaderLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoaderLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
