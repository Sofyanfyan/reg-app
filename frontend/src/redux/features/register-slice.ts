import {
  CaseReducerActions,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl: string = "http://127.0.0.1:8000/api/auth";

type IGrade = {
  id: number;
  name: string;
  class: string | null;
  created_at: string;
  updated_at: string | null;
};

type IError = {
  code: number;
  msg: any;
};

export const fetchGrades: any = createAsyncThunk(
  "register/fetchGrades",
  async () => {
    try {
      const response = await axios({
        method: "GET",
        url: baseUrl + "/grades",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data: IGrade[] = response.data.data;
      return data.map((e) => ({
        id: e.id,
        name: e.class ? `${e.name} - ${e.class}` : e.name,
      }));
    } catch (error) {
      throw error;
    }
  }
);

export const grade: any = createSlice({
  name: "register",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGrades.fulfilled, (state, action: PayloadAction<[]>) => {
        state.loading = false;
        // Check if the payload is not null and assign it to state.data
        if (action.payload !== null) {
          state.data = action.payload;
        } else {
          // If the payload is null, assign an empty array to state.data
          state.data = [];
        }
      })
      .addCase(
        fetchGrades.rejected,
        (state, action: PayloadAction<string | null>) => {
          state.loading = false;
          if (action.payload !== null) {
            state.error = action.payload;
          } else {
            // Handle the case where payload is null (if needed)
            state.error = "Some default error message or null";
          }
        }
      );
  },
});

// export const { fetchGrades } = register.actions;
export default grade.reducer;
