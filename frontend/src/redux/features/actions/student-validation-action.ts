import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { Dispatch, ThunkAction } from "@reduxjs/toolkit";
import {
  validationFailure,
  validationSuccess,
} from "../slices/student-validation-slice";
import { reqStudent } from "@/helpers/request/handleRegister";
import { error } from "console";
import Swal from "sweetalert2";

export const actionValidationStudent: any = (
  student: IStudent,
  setIdx: any,
  setForm: any,
  setError: any,
  setSubmit: any
) => {
  return (dispatch: Dispatch) =>
    axios({
      data: {
        grade_id: student.grade_id.id,
        name: student.name,
        gender: student.gender,
        religion: student.religion,
        place_birth: student.place_birth,
        date_birth: student.date_birth,
        id_or_passport: student.id_or_passport,
        nationality: student.nationality,
        place_of_issue: student.place_of_issue,
        date_exp: student.date_exp,
      },
      method: "POST",
      url: baseUrl + "/auth/checks/students",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then(() => {
        reqStudent(student);
        setIdx(2);
        setForm("mother");
        setSubmit(false);
        dispatch(validationSuccess());
      })
      .catch((error) => {
        setSubmit(false);
        dispatch(validationFailure(error));
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
