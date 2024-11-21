import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types/reduxTypes/store.types";
import { loginUser } from "../actions/authActions";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  bearerToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNewBearerTokenAction: (state, action) => {
      state.refreshToken = action.payload;
    },
    setNewRefreshTokenAction: (state, action) => {
      state.bearerToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      });
  },
});

// Export the actions to be used in components
export const authStateAction = authSlice.actions;

// Export the reducer to be used in the store configuration
export default authSlice;
