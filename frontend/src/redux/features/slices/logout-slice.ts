import {
  CaseReducerActions,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
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
