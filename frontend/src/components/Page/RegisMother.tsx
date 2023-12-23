"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import {
  Dropdown,
  DropdownChangeEvent,
  DropdownPassThroughMethodOptions,
} from "primereact/dropdown";

export default function RegisMother({ ...props }) {
  const { setIdx, setForm } = props;
  const [dateBirth, setDateBirth] = useState<Nullable<Date>>();

  const religion: string[] = [
    "Islam",
    "Christianity",
    "Catholicism",
    "Hinduism",
    "Buddhism",
    "Confucianism",
  ];

  const [mother, setMother] = useState({
    name: "",
    place_birth: "",
    religion: "",
    date_birth: "",
    occupation: "",
    company_name: "",
    company_address: "",
    home_address: "",
    telephone: "",
    mobilephone: "",
    id_or_passport: "",
    nationality: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState({
    name: "",
    place_birth: "",
    religion: "",
    date_birth: "",
    occupation: "",
    company_name: "",
    company_address: "",
    home_address: "",
    telephone: "",
    mobilephone: "",
    id_or_passport: "",
    nationality: "",
    phone: "",
    email: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;

    setMother((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeSelect = (event: DropdownChangeEvent) => {
    event.preventDefault();
    const { value, name } = event.target;

    setMother((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Next");
    setIdx(2);
    setForm("father");
  };

  const handlePrev = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("prev");
    setIdx(1);
    setForm("student");
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900">Mother form</h5>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Fullname
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
              value={mother.name}
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
              NIK/Passport
            </label>
            <InputText
              id="id_or_passport"
              name="id_or_passport"
              placeholder="Enter NIK/Passport"
              className={
                error.name
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.id_or_passport}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.name && (
              <small className="ms-1 text-red-600">
                {error.id_or_passport}
              </small>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nationality
            </label>
            <InputText
              id="nationality"
              name="nationality"
              placeholder="Enter Nationality"
              className={
                error.name
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.nationality}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.name && (
              <small className="ms-1 text-red-600">{error.nationality}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Place of Birth
            </label>
            <InputText
              id="place_birth"
              name="place_birth"
              placeholder="Enter place of Birth"
              className={
                error.name
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.place_birth}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.name && (
              <small className="ms-1 text-red-600">{error.place_birth}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Place of Birth
            </label>
            <Calendar
              id="date_birth"
              name="date_birth"
              ariaLabelledBy="date_birth"
              inputClassName={
                error.date_birth
                  ? "w-full bg-gray-50 border border-red-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3.5"
                  : "w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3.5"
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
            {error.name && (
              <small className="ms-1 text-red-600">{error.place_birth}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Religion
            </label>
            <Dropdown
              value={mother.religion}
              onChange={handleChangeSelect}
              options={religion}
              name="religion"
              placeholder="Select a Religion"
              className={
                error.religion
                  ? "bg-gray-50 border border-red-300 text-gray-900 text-sm rounded-lg w-full p-1"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1"
              }
              pt={{
                root: {
                  className:
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1",
                },
                item: ({ context }: DropdownPassThroughMethodOptions) => ({
                  className: context.selected ? "bg-primary" : undefined,
                }),
              }}
            />
            {error.religion && (
              <small className="ms-1 text-red-600">{error.religion}</small>
            )}
          </div>
        </div>
        <br />
        <br />
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              NIK/Passport
            </label>
            <InputText
              id="id_or_passport"
              name="id_or_passport"
              placeholder="Enter NIK/Passport"
              className={
                error.name
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.id_or_passport}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.name && (
              <small className="ms-1 text-red-600">
                {error.id_or_passport}
              </small>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className="max-w-lg text-white bg-[#e07c39] hover:bg-[#e25d04ee] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <i className="fa-solid fa-chevron-right fa-rotate-180 me-2"></i>
            Previous
          </button>
          <button
            type="submit"
            className="max-w-lg text-white bg-[#e07c39] hover:bg-[#e25d04ee] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Next
            <i className="ms-2 fa-solid fa-angle-right"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
