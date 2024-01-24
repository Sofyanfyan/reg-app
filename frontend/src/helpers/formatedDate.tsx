// import { Nullable } from "primereact/ts-helpers";

type Nullable<T> = T | null;

export default function formatedDate(dateString: any): string {
  // Get day, month, and year components
  let day: string = dateString.getDate().toString();
  let month: string = (dateString.getMonth() + 1).toString(); // Note: Month is zero-based, so we add 1
  let year: string = dateString.getFullYear().toString();

  // Format day and month to have leading zeros if needed
  day = +day < 10 ? "0" + day : day;
  month = +month < 10 ? "0" + month : month;

  // Create the formatted date string in dd-mm-yyyy format
  const formattedDate: string = year + "-" + month + "-" + day;

  return formattedDate;
}
