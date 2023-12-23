type IStudent = {
  grade_id: string;
  is_active: boolean;
  name: string;
  gender: string;
  religion: string;
  place_birth: string;
  id_or_passport: string;
  nationality: string;
  place_of_issue: string | null;
  date_birth?: string;
  date_exp?: string;
};

export default function reqStudent(student: IStudent): Boolean {
  // lakukan axios terlebih dahulu sebelum dimasukkan local storage

  localStorage.setItem("reqStudent", JSON.stringify(student));
  return true;
}
