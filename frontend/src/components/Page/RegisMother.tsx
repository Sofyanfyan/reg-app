"use client";

import {
  ChangeEvent,
  FormEvent,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import {
  Dropdown,
  DropdownChangeEvent,
  DropdownPassThroughMethodOptions,
} from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import formatedDate from "@/helpers/formatedDate";
import { actionValidationParent } from "@/redux/features/actions/parent-validation-action";
import { useDispatch, useSelector } from "react-redux";
import { parentStart } from "@/redux/features/slices/parent-validation-slice";
import Submit from "../btn/Submit";

export default function RegisMother({ ...props }) {
  const { setIdx, setForm } = props;
  const [dateBirth, setDateBirth] = useState<Nullable<Date>>(null);
  const [isSubmit, setSubmit] = useState<Boolean>(false);

  const religionOption: string[] = [
    "Islam",
    "Christianity",
    "Catholicism",
    "Hinduism",
    "Buddhism",
    "Confucianism",
  ];

  const [mother, setMother] = useState({
    relation: "mother",
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

  useEffect(() => {
    let localMother = localStorage.getItem("reqMOTHER");

    if (localMother) {
      setMother(JSON.parse(localMother));

      console.log(JSON.parse(localMother));

      setDateBirth(new Date(JSON.parse(localMother).date_birth));
    }
  }, []);

  const dispatch = useDispatch();

  //input field =============================================
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;

    setMother((prevState) => ({ ...prevState, [name]: value }));
  };

  //options field ==========================================
  const handleChangeSelect = (event: DropdownChangeEvent) => {
    event.preventDefault();
    const { value, name } = event.target;

    setMother((prevState) => ({ ...prevState, [name]: value }));
  };

  //text area field ========================================
  const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const { value, name } = event.target;
    setMother((prevState) => ({ ...prevState, [name]: value }));
  };

  //handle submit ==============================================
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      name,
      place_birth,
      religion,
      date_birth,
      home_address,
      mobilephone,
      id_or_passport,
      nationality,
      phone,
      email,
    } = mother;

    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(email);

    if (
      !name ||
      !place_birth ||
      !religion ||
      !date_birth ||
      !home_address ||
      !mobilephone ||
      !id_or_passport ||
      !nationality ||
      !email ||
      !isValidEmail ||
      name.length < 5 ||
      id_or_passport.length < 6
    ) {
      if (!name) {
        setError((prevState) => ({
          ...prevState,
          name: "Fullname is required",
        }));
      } else if (name.length < 5) {
        setError((prevState) => ({
          ...prevState,
          name: "Fullname min 5 character.",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          name: "",
        }));
      }

      if (!place_birth) {
        setError((prevState) => ({
          ...prevState,
          place_birth: "Place birth is required",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          place_birth: "",
        }));
      }

      if (!religion) {
        setError((prevState) => ({
          ...prevState,
          religion: "Religion is required",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          religion: "",
        }));
      }
      if (!date_birth) {
        setError((prevState) => ({
          ...prevState,
          date_birth: "Date birth is required",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          date_birth: "",
        }));
      }
      if (!home_address) {
        setError((prevState) => ({
          ...prevState,
          home_address: "Home address is required",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          home_address: "",
        }));
      }
      if (!mobilephone) {
        setError((prevState) => ({
          ...prevState,
          mobilephone: "Mobile phone is required",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          mobilephone: "",
        }));
      }
      if (!id_or_passport) {
        setError((prevState) => ({
          ...prevState,
          id_or_passport: "NIK/Passport is required",
        }));
      } else if (id_or_passport.length < 6) {
        setError((prevState) => ({
          ...prevState,
          id_or_passport: "NIK/Passport min 5 character",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          id_or_passport: "",
        }));
      }
      if (!nationality) {
        setError((prevState) => ({
          ...prevState,
          nationality: "Nationality is required",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          nationality: "",
        }));
      }
      if (!email) {
        setError((prevState) => ({
          ...prevState,
          email: "Email is required",
        }));
      } else if (!isValidEmail) {
        setError((prevState) => ({
          ...prevState,
          email: "Please enter a valid email address",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
      return;
    }

    setSubmit(true);
    performValidation();
  };

  const performValidation = async () => {
    dispatch(parentStart());
    await dispatch(actionValidationParent(mother, "mother", setIdx, setForm));
    // setIdx(2);
    // setForm("father");
  };

  // handle previous ==========================================
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
              NIK/Passport <span style={{ color: "red" }}>*</span>
            </label>
            <InputText
              id="id_or_passport"
              name="id_or_passport"
              placeholder="Enter NIK/Passport"
              className={
                error.id_or_passport
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.id_or_passport}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.id_or_passport && (
              <small className="ms-1 text-red-600">
                {error.id_or_passport}
              </small>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nationality <span style={{ color: "red" }}>*</span>
            </label>
            <InputText
              id="nationality"
              name="nationality"
              placeholder="Enter Nationality"
              className={
                error.nationality
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.nationality}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.nationality && (
              <small className="ms-1 text-red-600">{error.nationality}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Place of Birth <span style={{ color: "red" }}>*</span>
            </label>
            <InputText
              id="place_birth"
              name="place_birth"
              placeholder="Enter place of Birth"
              className={
                error.place_birth
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.place_birth}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.place_birth && (
              <small className="ms-1 text-red-600">{error.place_birth}</small>
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
                  ? "w-full bg-gray-50 border border-red-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3.5"
                  : "w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3.5"
              }
              style={{ width: "100%" }}
              value={dateBirth}
              onChange={(e) => {
                const { value } = e;

                setDateBirth(value);
                setMother((prevState) => ({
                  ...prevState,
                  date_birth: value ? formatedDate(value) : "",
                }));
              }}
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
              Religion <span style={{ color: "red" }}>*</span>
            </label>
            <Dropdown
              value={mother.religion}
              onChange={handleChangeSelect}
              options={religionOption}
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
        <br className="hidden lg:block" />
        <br className="hidden lg:block" />
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Company Name
            </label>
            <InputText
              id="company_name"
              name="company_name"
              placeholder="Enter Company Name"
              className={
                error.company_name
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.company_name}
              onChange={handleChange}
              autoComplete="off"
            />
            {error.company_name && (
              <small className="ms-1 text-red-600">{error.company_name}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Company Phone
            </label>
            <InputText
              id="phone"
              name="phone"
              placeholder="Enter Company Phone"
              className={
                error.phone
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.phone}
              onChange={handleChange}
              autoComplete="off"
            />
            {error.phone && (
              <small className="ms-1 text-red-600">{error.phone}</small>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-1 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Company Address
            </label>
            <InputTextarea
              id="company_address"
              name="company_address"
              placeholder="Enter Company Address"
              className={
                error.company_address
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.company_address}
              onChange={handleChangeTextArea}
              autoComplete="off"
              rows={5}
              autoResize
            />
            {error.company_address && (
              <small className="ms-1 text-red-600">
                {error.company_address}
              </small>
            )}
          </div>
        </div>

        <br className="hidden lg:block" />
        <br className="hidden lg:block" />

        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Telephone
            </label>
            <InputText
              id="telephone"
              name="telephone"
              placeholder="Enter Telephone"
              className={
                error.telephone
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.telephone}
              onChange={handleChange}
              autoComplete="off"
            />
            {error.telephone && (
              <small className="ms-1 text-red-600">{error.telephone}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Mobilephone <span style={{ color: "red" }}>*</span>
            </label>
            <InputText
              id="mobilephone"
              name="mobilephone"
              placeholder="Enter mobilephone"
              className={
                error.mobilephone
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.mobilephone}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.mobilephone && (
              <small className="ms-1 text-red-600">{error.mobilephone}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon bg-gray-200">
                <i className="fa-regular fa-envelope"></i>
              </span>
              <InputText
                id="email"
                name="email"
                placeholder="Enter email"
                className={
                  error.email
                    ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-e-lg block w-full p-3"
                    : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-e-lg block w-full p-3"
                }
                value={mother.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
            {error.email && (
              <small className="ms-1 text-red-600">{error.email}</small>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-1 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Home Address <span style={{ color: "red" }}>*</span>
            </label>
            <InputTextarea
              id="home_address"
              name="home_address"
              placeholder="Enter Home Address"
              className={
                error.home_address
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={mother.home_address}
              onChange={handleChangeTextArea}
              autoComplete="off"
              rows={5}
              autoResize
              required
            />
            {error.home_address && (
              <small className="ms-1 text-red-600">{error.home_address}</small>
            )}
          </div>
        </div>
        {/* button */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className="max-w-lg text-white bg-[#e07c39] hover:bg-[#e25d04ee] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <i className="fa-solid fa-chevron-right fa-rotate-180 me-2"></i>
            Previous
          </button>

          {isSubmit ? (
            <Submit />
          ) : (
            <button
              type="submit"
              className="max-w-lg text-white bg-[#e07c39] hover:bg-[#e25d04ee] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Next
              <i className="ms-2 fa-solid fa-angle-right"></i>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
