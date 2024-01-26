import { createSlice } from "@reduxjs/toolkit";
import { register } from "module";

const initialState = {
  loading: false,
  error: null,
};

const studentRegisterSlice = createSlice({
  name: "register/student",
  initialState,
  reducers: {
    studentRegisterStart: (slice) => {
      slice.loading = true;
    },
    studentRegisterSuccess: (slice) => {
      slice.loading = false;
      slice.error = null;
    },
    studentRegisterFailure: (slice, action) => {
      slice.loading = false;
      slice.error = action.payload;
    },
  },
});

export const {
  studentRegisterStart,
  studentRegisterSuccess,
  studentRegisterFailure,
} = studentRegisterSlice.actions;

export default studentRegisterSlice.reducer;
