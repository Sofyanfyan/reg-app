import axios, { AxiosProxyConfig } from "axios";
import { baseUrl } from "@/redux/baseUrl";
import { Dispatch, ThunkAction } from "@reduxjs/toolkit";
import {
  parentSuccess,
  parentFailure,
} from "../slices/parent-validation-slice";
import { reqParent } from "@/helpers/request/handleRegister";
import { RootState } from "@/redux/store";

export const actionValidationParent: any =
  (
    parent: IParent,
    identity: string,
    setIdx: any,
    setForm: any
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
      setIdx(2);
      setForm("father");
    } catch (error) {
      // console.log(error, "<<<<<<<<<<<<MASUK ERROR");
      dispatch(parentFailure("Internal server error"));
    }
  };
