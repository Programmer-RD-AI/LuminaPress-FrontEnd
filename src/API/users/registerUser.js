// registerUser.js (API file)
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiHeader, baseUrl } from "../../config/apiConfig";

export const registerUser = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...apiHeader,
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return rejectWithValue(data.message || "Registration failed");
    }

    return data.userId;
  },
);
