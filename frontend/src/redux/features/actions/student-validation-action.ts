import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { Dispatch, ThunkAction } from "@reduxjs/toolkit";
import {
  validationFailure,
  validationSuccess,
} from "../slices/student-validation-slice";
import { reqStudent } from "@/helpers/request/handleRegister";

export const actionValidationStudent: any = (student: IStudent) => {
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
    }).then((response) => {
      console.log("masuk");

      console.log(response.data);

      reqStudent(student);
      dispatch(validationSuccess());
    });
};
