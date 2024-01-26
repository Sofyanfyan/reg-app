import axios from "axios";
import { baseUrl } from "@/redux/baseUrl";
import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import {
  studentRegisterStart,
  studentRegisterSuccess,
  studentRegisterFailure,
} from "../slices/student-register-slice";
import Swal from "sweetalert2";

export const studentRegisterAction: any = (bs: IBs, redirect: any) => {
  const storedStudent: string | null = localStorage.getItem("reqStudent");
  const storedMother: string | null = localStorage.getItem("reqMOTHER");
  const storedFather: string | null = localStorage.getItem("reqFATHER");

  if (storedStudent && storedFather && storedMother) {
    const student: IStudent = JSON.parse(storedStudent);
    const mother: IParent = JSON.parse(storedMother);
    const father: IParent = JSON.parse(storedFather);

    const register = {
      studentName: student.name,
      gradeId: student.grade_id.id,
      studentGender: student.gender,
      studentReligion: student.religion,
      studentPlace_birth: student.place_birth,
      studentDate_birth: student.date_birth,
      studentId_or_passport: student.id_or_passport,
      studentNationality: student.nationality,
      studentPlace_of_issue: student.place_of_issue,
      studentDate_exp: student.date_exp,
      // Father rules
      fatherName: father.name,
      fatherReligion: father.religion,
      fatherPlace_birth: father.place_birth,
      fatherBirth_date: father.date_birth,
      fatherId_or_passport: father.id_or_passport,
      fatherNationality: father.nationality,
      fatherOccupation: father.occupation,
      fatherCompany_name: father.company_name,
      fatherCompany_address: father.company_address,
      fatherCompany_phone: father.phone,
      fatherHome_address: father.home_address,
      fatherTelephhone: father.telephone,
      fatherMobilephone: father.mobilephone,
      fatherEmail: father.email,
      // Mother rules
      motherName: mother.name,
      motherReligion: mother.religion,
      motherPlace_birth: mother.place_birth,
      motherBirth_date: mother.date_birth,
      motherId_or_passport: mother.id_or_passport,
      motherNationality: mother.nationality,
      motherOccupation: mother.occupation,
      motherCompany_name: mother.company_name,
      motherCompany_address: mother.company_address,
      motherCompany_phone: mother.phone,
      motherHome_address: mother.home_address,
      motherTelephhone: mother.telephone,
      motherMobilephone: mother.mobilephone,
      motherEmail: mother.email,

      //brother and sister

      brotherOrSisterName1: bs.brotherOrSisterName1,
      brotherOrSisterBirth_date1: bs.brotherOrSisterBirth_date1,
      brotherOrSisterGrade1: bs.brotherOrSisterGrade1,
      brotherOrSisterName2: bs.brotherOrSisterName2,
      brotherOrSisterBirth_date2: bs.brotherOrSisterBirth_date2,
      brotherOrSisterGrade2: bs.brotherOrSisterGrade2,
      brotherOrSisterName3: bs.brotherOrSisterName3,
      brotherOrSisterBirth_date3: bs.brotherOrSisterBirth_date3,
      brotherOrSisterGrade3: bs.brotherOrSisterGrade3,
      brotherOrSisterName4: bs.brotherOrSisterName4,
      brotherOrSisterBirth_date4: bs.brotherOrSisterBirth_date4,
      brotherOrSisterGrade4: bs.brotherOrSisterGrade4,
      brotherOrSisterName5: bs.brotherOrSisterName5,
      brotherOrSisterBirth_date5: bs.brotherOrSisterBirth_date5,
      brotherOrSisterGrade5: bs.brotherOrSisterGrade5,
    };

    return axios({
      url: baseUrl + "/auth/registers/students",
      method: "POST",
      data: register,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then((response) => {
      if (response.data.code !== 201) {
        throw response.data;
      }

      console.log("====================================");
      console.log("LEWATTTTTTTTTTTT");
      console.log("====================================");
    });
  }
};
