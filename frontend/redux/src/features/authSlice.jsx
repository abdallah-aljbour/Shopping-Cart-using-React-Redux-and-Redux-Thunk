import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration
export const register = createAsyncThunk("auth/register", async (userData) => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/register",
    userData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

// Async thunk for user login
export const login = createAsyncThunk("auth/login", async (userData) => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/login",
    userData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

// Async thunk for user logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.post(
    "http://localhost:3000/api/auth/logout",
    {},
    { withCredentials: true }
  );
  return;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
