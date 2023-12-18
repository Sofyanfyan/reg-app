import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl: string = "http://127.0.0.1:8000/api";

type payloadLogin = {
  email: string;
  password: string;
};

type payloadRegister = {
  name: string;
  email: string;
  password: string;
  relation: string;
};

type payloadVerify = {
  otp: number;
};

const initialState: any = {
  code: 500,
  data: {},
};

export const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<payloadLogin>) => {
      axios
        .post(baseUrl + "/login", action.payload)
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("name", data.user.name);
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
            title: "Signed in successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("access_token");
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
            title: error.response.data.msg,
          });
        });
    },
    register: (state, action: PayloadAction<payloadRegister>) => {
      axios.post(baseUrl + "/register", action.payload).then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", data.user.name);
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
          title: "Signed up successfully",
        });
      });
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

export const { logIn, logOut, register, verify } = auth.actions;
export default auth.reducer;
