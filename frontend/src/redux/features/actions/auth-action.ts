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
  verifyStart,
  verifySuccess,
  verifyFailure,
} from "../slices/auth-slice";
import exp from "constants";

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

export const actionVerify: any = (
  code: string,
  dispatch: Dispatch,
  redirect: any
) => {
  dispatch(verifyStart());
  const token = localStorage.getItem("access_token");
  axios
    .post(
      baseUrl + "/users/email-verifications",
      { otp: code },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(({ data }) => {
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
      redirect("/users");

      dispatch(verifySuccess());
    })
    .catch((error) => {
      dispatch(verifyFailure(error));
      const { code, msg } = error.response.data;

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

export const resendToken = (
  dispatch: Dispatch,
  redirect: any,
  setLoading: any
) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "focus:outline-none text-white bg-[#ee913b] hover:bg-[#ee913b] focus:ring-4 focus:ring-[#facb9fcb] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2",
      cancelButton:
        "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Code has Expired!",
      text: "Resend email with new otp code?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, resend otp!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        actionResendToken(dispatch, redirect, setLoading);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Canceled!",
          text: "Your otp code isn't updated :)",
          icon: "error",
        });
      }
    });
};

const actionResendToken = (
  dispatch: Dispatch,
  redirect: any,
  setLoading: any
) => {
  axios({
    method: "POST",
    url: baseUrl + "/users/resend-emails",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  })
    .then(() => {
      dispatch(fetchGetExpire());
      redirect("/email-verifications");
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
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
        title: "Resend email failure!",
      });
    });
};
