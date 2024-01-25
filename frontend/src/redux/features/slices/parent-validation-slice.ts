import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const parentValidationSlice = createSlice({
  name: "parent/validation",
  initialState,
  reducers: {
    parentStart: (state) => {
      state.loading = true;
    },
    parentSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    parentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { parentStart, parentSuccess, parentFailure } =
  parentValidationSlice.actions;

export default parentValidationSlice.reducer;
