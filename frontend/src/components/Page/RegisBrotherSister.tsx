"use client";

import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import { ChangeEvent, FormEvent, useState } from "react";

export default function RegisBrotherSister({ ...props }) {
  const { setIdx, setForm } = props;
  const [totBS, setTotBS] = useState(1);
  const [dateBirth1, setDateBirth1] = useState<Nullable<Date>>();
  const [dateBirth2, setDateBirth2] = useState<Nullable<Date>>();
  const [dateBirth3, setDateBirth3] = useState<Nullable<Date>>();
  const [dateBirth4, setDateBirth4] = useState<Nullable<Date>>();
  const [dateBirth5, setDateBirth5] = useState<Nullable<Date>>();

  const [user, setUser] = useState({
    brotherOrSisterName1: "",
    brotherOrSisterBirth_date1: "",
    brotherOrSisterGrade1: "",
    brotherOrSisterName2: "",
    brotherOrSisterBirth_date2: "",
    brotherOrSisterGrade2: "",
    brotherOrSisterName3: "",
    brotherOrSisterBirth_date3: "",
    brotherOrSisterGrade3: "",
    brotherOrSisterName4: "",
    brotherOrSisterBirth_date4: "",
    brotherOrSisterGrade4: "",
    brotherOrSisterName5: "",
    brotherOrSisterBirth_date5: "",
    brotherOrSisterGrade5: "",
  });
  const [error, setError] = useState({
    brotherOrSisterName1: "",
    brotherOrSisterBirth_date1: "",
    brotherOrSisterGrade1: "",
    brotherOrSisterName2: "",
    brotherOrSisterBirth_date2: "",
    brotherOrSisterGrade2: "",
    brotherOrSisterName3: "",
    brotherOrSisterBirth_date3: "",
    brotherOrSisterGrade3: "",
    brotherOrSisterName4: "",
    brotherOrSisterBirth_date4: "",
    brotherOrSisterGrade4: "",
    brotherOrSisterName5: "",
    brotherOrSisterBirth_date5: "",
    brotherOrSisterGrade5: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value);
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

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
        {totBS == 1 && (
          <h5 className="text-xl font-medium text-gray-900">
            Brother or sister form
          </h5>
        )}

        <div className="grid grid-row gap-20">
          {/* <<<<<<<<<<<<<<<<<<  FORM  1 >>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          {totBS >= 1 && (
            <div>
              {totBS > 1 && (
                <div className="grid gap-1 mb-7">
                  <p className="text-sm text-gray-500">
                    First brother or sister
                  </p>
                  <hr />
                </div>
              )}
              <div className="grid lg:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Fullname
                  </label>
                  <InputText
                    id="brotherOrSisterName1"
                    name="brotherOrSisterName1"
                    placeholder="Enter Fullname"
                    className={
                      error.brotherOrSisterName1
                        ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                        : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
                    }
                    value={user.brotherOrSisterName1}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error.brotherOrSisterName1 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterName1}
                    </small>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Date of Birth
                  </label>
                  <Calendar
                    id="brotherOrSisterBirth_date1"
                    name="brotherOrSisterBirth_date1"
                    ariaLabelledBy="brotherOrSisterBirth_date1"
                    inputClassName={
                      error.brotherOrSisterBirth_date1
                        ? "w-full bg-gray-50 border border-red-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                        : "w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                    }
                    style={{ width: "100%" }}
                    value={dateBirth1}
                    onChange={(e) => setDateBirth1(e.value)}
                    placeholder="Date of birth"
                    dateFormat="dd/mm/yy"
                    locale="en"
                    mask="99/99/9999"
                    showButtonBar
                  />
                  {error.brotherOrSisterBirth_date1 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterBirth_date1}
                    </small>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Grade
                  </label>
                  <InputText
                    id="brotherOrSisterGrade1"
                    name="brotherOrSisterGrade1"
                    placeholder="Enter grade"
                    className={
                      error.brotherOrSisterGrade1
                        ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                        : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
                    }
                    value={user.brotherOrSisterGrade1}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error.brotherOrSisterGrade1 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterGrade1}
                    </small>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* <<<<<<<<<<<<<<<<<<  FORM 2 >>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          {totBS >= 2 && (
            <div>
              {totBS > 1 && (
                <div className="grid gap-1 mb-7">
                  <p className="text-sm font-medium text-gray-500">
                    Second brother or sister
                  </p>
                  <hr />
                </div>
              )}
              <div className="grid lg:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Fullname
                  </label>
                  <InputText
                    id="brotherOrSisterName2"
                    name="brotherOrSisterName2"
                    placeholder="Enter Fullname"
                    className={
                      error.brotherOrSisterName2
                        ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                        : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
                    }
                    value={user.brotherOrSisterName2}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error.brotherOrSisterName2 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterName2}
                    </small>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Date of Birth
                  </label>
                  <Calendar
                    id="brotherOrSisterBirth_date2"
                    name="brotherOrSisterBirth_date2"
                    ariaLabelledBy="date_birth"
                    inputClassName={
                      error.brotherOrSisterBirth_date2
                        ? "w-full bg-gray-50 border border-red-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                        : "w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                    }
                    style={{ width: "100%" }}
                    value={dateBirth2}
                    onChange={(e) => setDateBirth2(e.value)}
                    placeholder="Date of birth"
                    dateFormat="dd/mm/yy"
                    locale="en"
                    mask="99/99/9999"
                    showButtonBar
                  />
                  {error.brotherOrSisterBirth_date2 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterBirth_date2}
                    </small>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Grade
                  </label>
                  <InputText
                    id="brotherOrSisterGrade2"
                    name="brotherOrSisterGrade2"
                    placeholder="Enter grade"
                    className={
                      error.brotherOrSisterGrade2
                        ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                        : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
                    }
                    value={user.brotherOrSisterGrade2}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error.brotherOrSisterGrade2 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterGrade2}
                    </small>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* <<<<<<<<<<<<<<<<<<  FORM 3 >>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          {totBS >= 3 && (
            <div>
              {totBS > 1 && (
                <div className="grid gap-1 mb-7">
                  <p className="text-sm font-medium text-gray-500">
                    Third brother or sister
                  </p>
                  <hr />
                </div>
              )}
              <div className="grid lg:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Fullname
                  </label>
                  <InputText
                    id="brotherOrSisterName3"
                    name="brotherOrSisterName3"
                    placeholder="Enter Fullname"
                    className={
                      error.brotherOrSisterName3
                        ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                        : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
                    }
                    value={user.brotherOrSisterName3}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error.brotherOrSisterName3 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterName3}
                    </small>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Date of Birth
                  </label>
                  <Calendar
                    id="brotherOrSisterBirth_date3"
                    name="brotherOrSisterBirth_date3"
                    ariaLabelledBy="date_birth"
                    inputClassName={
                      error.brotherOrSisterBirth_date3
                        ? "w-full bg-gray-50 border border-red-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                        : "w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                    }
                    style={{ width: "100%" }}
                    value={dateBirth3}
                    onChange={(e) => setDateBirth3(e.value)}
                    placeholder="Date of birth"
                    dateFormat="dd/mm/yy"
                    locale="en"
                    mask="99/99/9999"
                    showButtonBar
                  />
                  {error.brotherOrSisterBirth_date3 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterBirth_date3}
                    </small>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Grade
                  </label>
                  <InputText
                    id="brotherOrSisterGrade3"
                    name="brotherOrSisterGrade3"
                    placeholder="Enter grade"
                    className={
                      error.brotherOrSisterGrade3
                        ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                        : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
                    }
                    value={user.brotherOrSisterGrade3}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error.brotherOrSisterGrade3 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterGrade3}
                    </small>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* <<<<<<<<<<<<<<<<<<  FORM 4 >>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          {totBS >= 4 && (
            <div>
              {totBS > 1 && (
                <div className="grid gap-1 mb-7">
                  <p className="text-sm font-medium text-gray-500">
                    Fourth brother or sister
                  </p>
                  <hr />
                </div>
              )}
              <div className="grid lg:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Fullname
                  </label>
                  <InputText
                    id="brotherOrSisterName4"
                    name="brotherOrSisterName4"
                    placeholder="Enter Fullname"
                    className={
                      error.brotherOrSisterName4
                        ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                        : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
                    }
                    value={user.brotherOrSisterName4}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error.brotherOrSisterName4 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterName4}
                    </small>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Date of Birth
                  </label>
                  <Calendar
                    id="brotherOrSisterBirth_date4"
                    name="brotherOrSisterBirth_date4"
                    ariaLabelledBy="date_birth"
                    inputClassName={
                      error.brotherOrSisterBirth_date4
                        ? "w-full bg-gray-50 border border-red-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                        : "w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                    }
                    style={{ width: "100%" }}
                    value={dateBirth4}
                    onChange={(e) => setDateBirth4(e.value)}
                    placeholder="Date of birth"
                    dateFormat="dd/mm/yy"
                    locale="en"
                    mask="99/99/9999"
                    showButtonBar
                  />
                  {error.brotherOrSisterBirth_date4 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterBirth_date4}
                    </small>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Grade
                  </label>
                  <InputText
                    id="brotherOrSisterGrade4"
                    name="brotherOrSisterGrade4"
                    placeholder="Enter grade"
                    className={
                      error.brotherOrSisterGrade4
                        ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                        : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
                    }
                    value={user.brotherOrSisterGrade4}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error.brotherOrSisterGrade4 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterGrade4}
                    </small>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* <<<<<<<<<<<<<<<<<<  FORM 5 >>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          {totBS >= 5 && (
            <div>
              <div className="grid gap-1 mb-7">
                <p className="text-sm font-medium text-gray-500">
                  Fiveth brother or sister
                </p>
                <hr />
              </div>
              <div className="grid lg:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Fullname
                  </label>
                  <InputText
                    id="brotherOrSisterName5"
                    name="brotherOrSisterName5"
                    placeholder="Enter Fullname"
                    className={
                      error.brotherOrSisterName5
                        ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                        : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
                    }
                    value={user.brotherOrSisterName5}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error.brotherOrSisterName5 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterName5}
                    </small>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Date of Birth
                  </label>
                  <Calendar
                    id="brotherOrSisterBirth_date5"
                    name="brotherOrSisterBirth_date5"
                    ariaLabelledBy="date_birth"
                    inputClassName={
                      error.brotherOrSisterBirth_date5
                        ? "w-full bg-gray-50 border border-red-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                        : "w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                    }
                    style={{ width: "100%" }}
                    value={dateBirth5}
                    onChange={(e) => setDateBirth5(e.value)}
                    placeholder="Date of birth"
                    dateFormat="dd/mm/yy"
                    locale="en"
                    mask="99/99/9999"
                    showButtonBar
                  />
                  {error.brotherOrSisterBirth_date5 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterBirth_date5}
                    </small>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Grade
                  </label>
                  <InputText
                    id="brotherOrSisterGrade5"
                    name="brotherOrSisterGrade5"
                    placeholder="Enter grade"
                    className={
                      error.brotherOrSisterGrade5
                        ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                        : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
                    }
                    value={user.brotherOrSisterGrade5}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {error.brotherOrSisterGrade5 && (
                    <small className="ms-1 text-red-600">
                      {error.brotherOrSisterGrade5}
                    </small>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-full p-10">
          {totBS > 1 && (
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
                <i
                  className="fa-solid fa-minus"
                  style={{ color: "#5b5c5a" }}
                ></i>{" "}
              </span>
            </button>
          )}

          {totBS < 5 && (
            <button
              data-tooltip-target="tooltip-default"
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
                <i
                  className="fa-solid fa-plus"
                  style={{ color: "#5b5c5a" }}
                ></i>{" "}
              </span>
            </button>
          )}
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
