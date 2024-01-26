import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logoutStart, logoutSuccess, logoutFailure } =
  logoutSlice.actions;

export default logoutSlice.reducer;
