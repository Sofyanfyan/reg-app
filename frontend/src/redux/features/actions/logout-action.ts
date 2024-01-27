import axios from "axios";
import { baseUrl } from "../../baseUrl";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "../slices/logout-slice";
import { Dispatch } from "@reduxjs/toolkit";
import { removeLocalStorage } from "./auth-action";

export const actionLogout: any = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(logoutStart);

    await axios({
      method: "POST",
      url: baseUrl + "/auth/logout",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    dispatch(logoutSuccess);
    removeLocalStorage();
    window.location.href = "/";
  } catch (error) {
    dispatch(logoutFailure(error));
  }
};
