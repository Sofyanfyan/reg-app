import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const studentValidationSlice = createSlice({
  name: "check-validation",
  initialState,
  reducers: {
    validationStart: (state) => {
      state.loading = true;
    },
    validationSuccess: (state) => {
      state.loading = true;
    },
    validationFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { validationStart, validationSuccess, validationFailure } =
  studentValidationSlice.actions;

export default studentValidationSlice.reducer;
