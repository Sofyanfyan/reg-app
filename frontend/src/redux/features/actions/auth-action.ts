import axios from "axios";
import { baseUrl } from "@/redux/baseUrl";
import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import {
  logInStart,
  logInSuccess,
  logInFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} from "../slices/auth-slice";

const setLocalStorage = (
  access_token: string,
  email: string,
  name: string,
  relation: string
) => {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
  localStorage.setItem("relation", relation);
};

export const removeLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("relation");
};

export const actionLogin: any = (
  credentials: payloadLogin,
  dispatch: Dispatch,
  redirect: any,
  setSubmit: any,
  setError: any
) => {
  return axios
    .post(baseUrl + "/login", credentials)
    .then(({ data }) => {
      dispatch(logInStart);

      setLocalStorage(
        data.access_token,
        data.user.email,
        data.user.name,
        data.user.relation
      );

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

      dispatch(logInSuccess);

      if (data.user.email_verified_at) {
        redirect("/users");
        return;
      }

      redirect("email-verifications");
    })
    .catch((error) => {
      setSubmit(false);
      logInFailure(error);
      removeLocalStorage();

      const { code, msg } = error.response.data;

      if (code == 400) {
        for (const key in msg) {
          setError((prevState: payloadRegister) => ({
            ...prevState,
            [key]: msg[key],
          }));
        }
        return;
      }

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
        title: msg,
      });
    });
};

export const actionRegister = (
  credential: payloadRegister,
  dispatch: Dispatch,
  redirect: any,
  setSubmit: any,
  setError: any
) => {
  setSubmit(true);
  dispatch(registerStart);
  axios
    .post(baseUrl + "/register", credential)
    .then(({ data }) => {
      setLocalStorage(
        data.access_token,
        data.user.email,
        data.user.name,
        data.user.relation
      );
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
        title: "Register successfully",
      });

      redirect("/email-verifications");
      setSubmit(false);
      dispatch(registerSuccess);
    })
    .catch((error) => {
      removeLocalStorage();
      dispatch(registerFailure);
      setSubmit(false);
      const { code, msg } = error.response.data;

      if (code == 400) {
        for (const key in msg) {
          setError((prevState: payloadRegister) => ({
            ...prevState,
            [key]: msg[key],
          }));
        }
        return;
      }

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
        title: msg,
      });
    });
};

export const fetchGetExpire: any = createAsyncThunk("get/otp", async () => {
  try {
    const response = await axios({
      method: "GET",
      url: baseUrl + "/users/get-expire",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
});
