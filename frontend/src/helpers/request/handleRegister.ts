export default function reqStudent(student: IStudent): Boolean {
  // lakukan axios terlebih dahulu sebelum dimasukkan local storage

  localStorage.setItem("reqStudent", JSON.stringify(student));
  return true;
}
