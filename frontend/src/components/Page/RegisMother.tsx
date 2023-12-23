"use client";

import { FormEvent, useState } from "react";

export default function RegisMother({ ...props }) {
  const { setIdx, setForm } = props;
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
            <input
              type="text"
              name="name"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              NIK/Passport
            </label>
            <input
              type="text"
              name="id_or_passport"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
              placeholder="NIK / Passport"
              required
            />
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
