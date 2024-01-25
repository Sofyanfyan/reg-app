import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const studentValidationSlice = createSlice({
  name: "student/validation",
  initialState,
  reducers: {
    validationStart: (state) => {
      state.loading = true;
    },
    validationSuccess: (state) => {
      state.loading = false;
    },
    validationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { validationStart, validationSuccess, validationFailure } =
  studentValidationSlice.actions;

export default studentValidationSlice.reducer;
