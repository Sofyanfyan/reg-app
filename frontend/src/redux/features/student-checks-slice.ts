import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../baseUrl";
import { METHODS } from "http";

export const registerStudent = createAsyncThunk(
  "register/registerStudent",
  async (newStudent: IStudent, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        data: newStudent,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data; // You can modify this based on your API response structure
    } catch (error: any) {
      // You can handle specific error cases or just pass the error message
      return rejectWithValue(
        error.response.data.message || "Failed to register"
      );
    }
  }
);

export const checkStudentReducer: any = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
  } as RegisterState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state) => {
        state.loading = false;
        // You can update the state as needed upon successful registration
      })
      .addCase(
        registerStudent.rejected,
        (state, action: PayloadAction<string | any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
