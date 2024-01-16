"use client";

import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import { ChangeEvent, FormEvent, useState } from "react";

export default function RegisBrotherSister({ ...props }) {
  const { setIdx, setForm } = props;
  const [totBS, setTotBS] = useState(1);
  const [dateBirth, setDateBirth] = useState<Nullable<Date>>();

  const [user, setUser] = useState({
    name: "",
    date_birth: "",
    grade: "",
  });
  const [error, setError] = useState({
    name: "",
    date_birth: "",
    grade: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {};

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIdx(4);
    console.log("Submit");
  };

  const handlePrev = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("prev");
    setIdx(2);
    setForm("father");
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900">
          Brother or sister form
        </h5>

        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Fullname <span style={{ color: "red" }}>*</span>
            </label>
            <InputText
              id="name"
              name="name"
              placeholder="Enter Fullname"
              className={
                error.name
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={user.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.name && (
              <small className="ms-1 text-red-600">{error.name}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Date of Birth <span style={{ color: "red" }}>*</span>
            </label>
            <Calendar
              id="date_birth"
              name="date_birth"
              ariaLabelledBy="date_birth"
              inputClassName={
                error.date_birth
                  ? "w-full bg-gray-50 border border-red-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                  : "w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
              }
              style={{ width: "100%" }}
              value={dateBirth}
              onChange={(e) => setDateBirth(e.value)}
              placeholder="Date of birth"
              dateFormat="dd/mm/yy"
              locale="en"
              mask="99/99/9999"
              showButtonBar
              required
            />
            {error.date_birth && (
              <small className="ms-1 text-red-600">{error.date_birth}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Grade <span style={{ color: "red" }}>*</span>
            </label>
            <InputText
              id="grade"
              name="grade"
              placeholder="Enter grade"
              className={
                error.name
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={user.grade}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.grade && (
              <small className="ms-1 text-red-600">{error.grade}</small>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            type="button"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100"
            onClick={() => {
              if (totBS >= 2) {
                setTotBS(totBS - 1);
              }
              console.log(totBS);
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              <i className="fa-solid fa-minus" style={{ color: "#5b5c5a" }}></i>{" "}
              <i className="fa-solid fa-1" style={{ color: "#5b5c5a" }}></i>
            </span>
          </button>
          <button
            type="button"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100"
            onClick={() => {
              if (totBS <= 4) {
                setTotBS(totBS + 1);
              }
              console.log(totBS);
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              <i className="fa-solid fa-plus" style={{ color: "#5b5c5a" }}></i>{" "}
              <i className="fa-solid fa-1" style={{ color: "#5b5c5a" }}></i>
            </span>
          </button>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className={
              "max-w-lg text-white bg-[#e07c39] hover:bg-[#e25d04ee] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            }
          >
            <i className="fa-solid fa-chevron-right fa-rotate-180 me-2"></i>
            Previous
          </button>
          <button
            type="submit"
            className={
              "max-w-lg text-white bg-[#e07c39] hover:bg-[#e25d04ee] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            }
          >
            <i className="fa-solid fa-cloud-arrow-up me-2"></i>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
