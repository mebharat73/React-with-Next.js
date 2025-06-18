import { createAsyncThunk } from "@reduxjs/toolkit"; // ✅ THIS LINE IS MISSING

import { login, signup } from "@/api/auth";
import { setToken } from "@/constants/authToken";

const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);
      setToken(response.data.token); // or localStorage.setItem if you prefer
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signup(data);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export { loginUser, registerUser };
