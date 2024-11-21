// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { postRequest } from "../../services/api";

// // Async thunk for sending OTP to the phone number
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (data: any, { rejectWithValue }) => {
//     try {
//       const response = await postRequest("/api/login", data);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../services/api";

// Async thunk for sending login request
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await postRequest("/api/login", data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
