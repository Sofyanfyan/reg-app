export function reqStudent(student: IStudent): void {
  // lakukan axios terlebih dahulu sebelum dimasukkan local storage

  localStorage.setItem("reqStudent", JSON.stringify(student));
}

export function reqParent(parent: IParent, side: string): void {
  localStorage.setItem("req" + side.toUpperCase(), JSON.stringify(parent));
}
