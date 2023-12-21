"use client";
import { FormEvent } from "react";

export default function RegisStudent({ ...props }) {
  const { setIdx, setForm } = props;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Next");
    setIdx(2);
    setForm("mother");
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900">Student form</h5>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Fullname
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
              id="id_or_passport"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="NIK / Passport"
              required
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value={"Female"}>Female</option>
              <option value={"Male"}>Male</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Religion
            </label>
            <select
              id="religion"
              name="religion"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value={"Islam"}>Islam</option>
              <option value={"Christianity"}>Christianity</option>
              <option value={"Catholicism"}>Catholicism</option>
              <option value={"Hinduism"}>Hinduism</option>
              <option value={"Buddhism"}>Buddhism</option>
              <option value={"Confucianism"}>Confucianism</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Grade
            </label>
            <select
              id="grade_id"
              name="grade_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value={"Nursery"}>Nursery</option>
              <option value={"Toddlers"}>Toddlers</option>
              <option value={"Primary"}>Primary</option>
              <option value={"Secondary"}>Secondary</option>
              <option value={"IGCSE"}>IGCSE</option>
            </select>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              id="nationality"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nationality"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Place of Birth
            </label>
            <input
              type="text"
              name="place_of_birth"
              id="place_of_birth"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Place of birth"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Date of birth
            </label>

            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                datepicker
                datepicker-format="mm/dd/yyyy"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
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
