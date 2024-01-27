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
    verify: (state, action: PayloadAction<payloadVerify>) => {
      const token = localStorage.getItem("access_token");
      axios
        .post(baseUrl + "/users/email-verifications", action.payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          console.log(data);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Your account verified!",
          });
        })
        .catch((error) => {
          console.log(error);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: error,
          });
        });
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
  verify,
} = auth.actions;
export default auth.reducer;
