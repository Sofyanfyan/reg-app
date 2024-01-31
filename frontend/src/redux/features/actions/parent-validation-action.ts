import axios, { AxiosError, AxiosProxyConfig } from "axios";
import { baseUrl } from "@/redux/baseUrl";
import { Dispatch, ThunkAction } from "@reduxjs/toolkit";
import {
  parentSuccess,
  parentFailure,
} from "../slices/parent-validation-slice";
import { reqParent } from "@/helpers/request/handleRegister";
import { RootState } from "@/redux/store";
import Swal from "sweetalert2";

export const actionValidationParent: any =
  (
    parent: IParent,
    identity: string,
    setIdx: any,
    setForm: any,
    setError: any
  ): ThunkAction<void, RootState, null, any> =>
  async (dispatch) => {
    try {
      console.log(parent);
      const response = await axios({
        url: baseUrl + "/auth/checks/parents",
        data: parent,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response);
      dispatch(parentSuccess());
      reqParent(parent, identity);
      if (identity == "father") {
        setIdx(3);
        setForm("b/s");
      } else {
        setIdx(2);
        setForm("father");
      }
    } catch (error: any) {
      // console.log(error, "<<<<<<<<<<<<MASUK ERROR");
      dispatch(parentFailure("Internal server error"));
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
    }
  };
