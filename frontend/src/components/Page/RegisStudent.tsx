"use client";
import { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import {
  Dropdown,
  DropdownChangeEvent,
  DropdownPassThroughMethodOptions,
} from "primereact/dropdown";
import formatedDate from "@/helpers/formatedDate";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "@/redux/features/slices/grade-slice";
import { actionValidationStudent } from "@/redux/features/actions/student-validation-action";
import {
  validationStart,
  validationSuccess,
} from "@/redux/features/slices/student-validation-slice";
import Submit from "../btn/Submit";
import Loading from "../Content/LoadingSync";

export default function RegisStudent({ ...props }) {
  const { setIdx, setForm } = props;
  const [dateBirth, setDateBirth] = useState<Nullable<Date>>(null);
  const [dateExp, setDateExp] = useState<Nullable<Date>>(null);
  const [isSubmit, setSubmit] = useState<Boolean>(false);
  const [student, setStudent] = useState({
    grade_id: "",
    name: "",
    gender: "",
    religion: "",
    place_birth: "",
    date_birth: "",
    id_or_passport: "",
    nationality: "",
    place_of_issue: "",
    date_exp: "",
  });

  const [error, setError] = useState({
    grade_id: "",
    name: "",
    gender: "",
    religion: "",
    place_birth: "",
    date_birth: "",
    id_or_passport: "",
    nationality: "",
    place_of_issue: "",
    date_exp: "",
  });

  const gender: string[] = ["Female", "Male"];

  const religion: string[] = [
    "Islam",
    "Christianity",
    "Catholicism",
    "Hinduism",
    "Buddhism",
    "Confucianism",
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    let localStudent = localStorage.getItem("reqStudent");

    if (localStudent) {
      setStudent(JSON.parse(localStudent));

      setDateBirth(new Date(JSON.parse(localStudent).date_birth));
      setDateExp(new Date(JSON.parse(localStudent).date_exp));
    }

    const fetchData = async () => {
      try {
        await dispatch(fetchGrades());
      } catch (error) {
        console.error("Error fetching grade:", error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchData();
  }, [dispatch]);

  const grade = useSelector((state: any) => {
    return state.gradeReducer;
  });
  // const grade = useSelector((state: any) => {
  //   return state.gradeReducer;
  // });

  if (grade.error) {
    return <h1>Errors!</h1>;
  }

  if (grade.loading) {
    return <Loading />;
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setStudent((prevState) => ({ ...prevState, [name]: value }));
    setError((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleChangeSelect = (event: DropdownChangeEvent) => {
    const { name, value } = event.target;

    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeSelectGrade = (event: DropdownChangeEvent) => {
    const { name, value } = event.target;

    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      grade_id,
      name,
      gender,
      religion,
      place_birth,
      id_or_passport,
      nationality,
    } = student;
    if (
      !name ||
      name.length < 5 ||
      !gender ||
      !religion ||
      !grade_id ||
      !place_birth ||
      !dateBirth ||
      !id_or_passport ||
      id_or_passport.length < 6 ||
      !nationality
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
      }

      if (!gender) {
        setError((prevState) => ({
          ...prevState,
          gender: "Gender is required",
        }));
      }

      if (!religion) {
        setError((prevState) => ({
          ...prevState,
          religion: "Religion is required",
        }));
      }

      if (!grade_id) {
        setError((prevState) => ({
          ...prevState,
          grade_id: "Grade is required",
        }));
      }
      if (!place_birth) {
        setError((prevState) => ({
          ...prevState,
          place_birth: "Place of birth is required",
        }));
      }
      if (!dateBirth) {
        setError((prevState) => ({
          ...prevState,
          date_birth: "Date of birth is required",
        }));
      }
      if (id_or_passport.length < 6) {
        setError((prevState) => ({
          ...prevState,
          id_or_passport: "NIK / Passport min 6 character.",
        }));
      } else if (!id_or_passport) {
        setError((prevState) => ({
          ...prevState,
          id_or_passport: "NIK / Passport is required",
        }));
      }
      if (!nationality) {
        setError((prevState) => ({
          ...prevState,
          nationality: "Nationality is required",
        }));
      }

      return;
    }

    setError({
      grade_id: "",
      name: "",
      gender: "",
      religion: "",
      place_birth: "",
      date_birth: "",
      id_or_passport: "",
      nationality: "",
      place_of_issue: "",
      date_exp: "",
    });
    setSubmit(true);
    performValidation();
  };

  const performValidation = async () => {
    dispatch(validationStart());

    await dispatch(
      actionValidationStudent(student, setIdx, setForm, setError, setSubmit)
    );
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      <form className="space-y-6" onSubmit={onSubmit}>
        <h5 className="text-xl font-medium text-gray-900">Student form</h5>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
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
              value={student.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.name && (
              <small className="ms-1 text-red-600">{error.name}</small>
            )}
          </div>
          <div>
            <label
              htmlFor="id_or_passport"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              NIK/Passport <span style={{ color: "red" }}>*</span>{" "}
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
              value={student.id_or_passport}
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
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Gender <span style={{ color: "red" }}>*</span>{" "}
            </label>

            <Dropdown
              value={student.gender}
              onChange={handleChangeSelect}
              options={gender}
              name="gender"
              placeholder="Select a Gender"
              className={
                error.gender
                  ? "bg-gray-50 border border-red-300 text-gray-900 text-sm rounded-lg w-full"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
              }
              pt={{
                root: {
                  className:
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full",
                },
                item: ({ context }: DropdownPassThroughMethodOptions) => ({
                  className: context.selected ? "bg-primary" : undefined,
                }),
              }}
            />

            {error.gender && (
              <small className="ms-1 text-red-600">{error.gender}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Religion <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <Dropdown
              value={student.religion}
              onChange={handleChangeSelect}
              options={religion}
              name="religion"
              placeholder="Select a Religion"
              className={
                error.religion
                  ? "bg-gray-50 border border-red-300 text-gray-900 text-sm rounded-lg w-full"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
              }
              pt={{
                root: {
                  className:
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full",
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
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Grade <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <Dropdown
              value={student.grade_id}
              onChange={handleChangeSelectGrade}
              options={grade.data}
              // rules={{ required: "Grade is required." }}
              name="grade_id"
              optionLabel="name"
              placeholder="Select a Grade"
              className={
                error.grade_id
                  ? "bg-gray-50 border border-red-300 text-gray-900 text-sm rounded-lg w-full"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
              }
              pt={{
                root: {
                  className:
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full",
                },
                item: ({ context }: DropdownPassThroughMethodOptions) => ({
                  className: context.selected ? "bg-primary" : undefined,
                }),
              }}
            />
            {error.grade_id && (
              <small className="ms-1 text-red-600">Grade is required</small>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="nationality"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nationality <span style={{ color: "red" }}>*</span>{" "}
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
              value={student.nationality}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.nationality && (
              <small className="ms-1 text-red-600">
                Nationality is required
              </small>
            )}
          </div>
          <div>
            <label
              htmlFor="place_birth"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Place of Birth <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <InputText
              id="place_birth"
              name="place_birth"
              placeholder="Enter Place of Birth"
              className={
                error.place_birth
                  ? "bg-gray-50 border border-red-300 text-md text-slate-600 rounded-lg block w-full p-3"
                  : "bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              }
              value={student.place_birth}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {error.place_birth && (
              <small className="ms-1 text-red-600">
                Place Birth is required
              </small>
            )}
          </div>
          <div>
            <label
              // htmlFor="date_birth"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Date of birth <span style={{ color: "red" }}>*</span>{" "}
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
                setStudent((prevState) => ({
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
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="place_of_issue"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Place of issue ( NIK/Passport )
            </label>
            <InputText
              id="place_of_issue"
              name="place_of_issue"
              placeholder="Place of issue"
              className="bg-gray-50 border border-gray-300 text-md text-slate-600 rounded-lg block w-full p-3"
              value={student.place_of_issue}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div>
            <label
              // htmlFor="date_exp"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Date of expiry ( NIK/Passport )
            </label>
            <Calendar
              name="date_exp"
              ariaLabelledBy="date_exp"
              inputClassName="w-full bg-gray-50 border border-gray-300 text-slate-600 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3.5"
              style={{ width: "100%" }}
              value={dateExp}
              onChange={(e) => {
                const { value } = e;

                setDateExp(value);
                setStudent((prevState) => ({
                  ...prevState,
                  date_exp: value ? formatedDate(value) : "",
                }));
              }}
              placeholder="Date of expiry"
              dateFormat="dd/mm/yy"
              locale="en"
              mask="99/99/9999"
              showButtonBar
            />
          </div>
        </div>

        <div className="flex justify-end">
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
