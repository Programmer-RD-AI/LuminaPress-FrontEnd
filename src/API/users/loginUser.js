// loginUser.js (API file)
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiHeader, baseUrl } from "../../config/apiConfig";

export const loginUser = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...apiHeader },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      // return {
      //   user: data.userId,
      //   isAuthenticated: true,
      // };
      return data.userId;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred during login");
    }
  }
);
