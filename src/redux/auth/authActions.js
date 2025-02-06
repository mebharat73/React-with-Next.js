import { login, signup } from "@/api/auth";

const { createAsyncThunk } = require("@reduxjs/toolkit");

const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);

      localStorage.setItem("authToken", response.data.token);

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

      localStorage.setItem("authToken", response.data.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export { loginUser, registerUser };

// Function => Sync function, async function (api call)
// Function => actions, thunk actions