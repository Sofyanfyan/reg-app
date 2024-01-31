import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../baseUrl";

const initialState: any = {
  code: 102,
  data: [],
  msg: "loading",
  loading: false,
  error: null,
};

export const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logInStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    logInFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    verifyStart: (state) => {
      state.loading = true;
    },
    verifySuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    verifyFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  logInStart,
  logInSuccess,
  logInFailure,
  logOut,
  registerStart,
  registerSuccess,
  registerFailure,
  verifyStart,
  verifySuccess,
  verifyFailure,
} = auth.actions;
export default auth.reducer;
