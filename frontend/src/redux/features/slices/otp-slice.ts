import {
  AsyncThunk,
  CaseReducerActions,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchGetExpire } from "../actions/auth-action";

export const otp = createSlice({
  name: "get/auth/otp",
  initialState: {
    loading: true,
    data: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetExpire.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchGetExpire.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // Check if the payload is not null and assign it to state.data
          if (action.payload !== null) {
            state.data = action.payload;
          } else {
            // If the payload is null, assign an empty array to state.data
            state.data = {};
          }
        }
      )
      .addCase(fetchGetExpire.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default otp.reducer;
