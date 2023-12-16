"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Loading from "./btn/Loading";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { register } from "@/redux/features/auth-slice";

export default function Register() {
  const [isHide, setHide] = useState(true);
  const [isHide1, setHide1] = useState(true);
  const [isSubmit, setSubmit] = useState(false);

  const [push, setPush] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
    relation: "mother",
    isValid: true,
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
    relation: "",
  });

  const btnClassName =
    "text-white w-full bg-[#e4532f] hover:bg-[#e98369] focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-6 py-2.5 text-center me-2 mb-2";
  const btnDisable =
    "text-white w-full bg-[#d8907f] hover:bg-[#da9b88] focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-6 py-2.5 text-center me-2 mb-2 cursor-not-allowed";

  const handleEventChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setPush((prevState) => ({ ...prevState, [name]: value }));

    if (push.email && push.password && push.re_password) {
      setPush((prevState) => ({ ...prevState, isValid: false }));
    } else setPush((prevState) => ({ ...prevState, isValid: true }));
  };

  const handleEventChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setPush((prevState) => ({ ...prevState, [name]: value }));

    if (push.email && push.password && push.re_password) {
      setPush((prevState) => ({ ...prevState, isValid: false }));
    } else setPush((prevState) => ({ ...prevState, isValid: true }));
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(push.email);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    const isValidPassword = passwordRegex.test(push.password);

    if (
      !push.name ||
      push.name.length < 3 ||
      !push.email ||
      !push.password ||
      !isValidEmail ||
      !isValidPassword ||
      !push.re_password ||
      push.password.length < 6 ||
      push.password !== push.re_password
    ) {
      //name
      if (!push.name) {
        setError((prevState) => ({
          ...prevState,
          name: "Please enter your name.",
        }));
      } else if (push.name.length < 3) {
        setError((prevState) => ({
          ...prevState,
          name: "Please enter a valid name.",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          name: "",
        }));
      }

      // email
      if (!push.email) {
        setError((prevState) => ({
          ...prevState,
          email: "Please enter your email.",
        }));
      } else if (!isValidEmail) {
        setError((prevState) => ({
          ...prevState,
          email: "Please enter a valid email address.",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          email: "",
        }));
      }

      // password
      if (!push.password) {
        setError((prevState) => ({
          ...prevState,
          password: "Please enter your password.",
        }));
      } else if (push.password.length < 6) {
        setError((prevState) => ({
          ...prevState,
          password: "Password must constain at least 6 character",
        }));
      } else if (!isValidPassword) {
        setError((prevState) => ({
          ...prevState,
          password:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          password: "",
        }));
      }

      // retype password
      if (!push.re_password) {
        setError((prevState) => ({
          ...prevState,
          re_password: "Please retype your password.",
        }));
      } else if (push.password !== push.re_password) {
        setError((prevState) => ({
          ...prevState,
          re_password: "Password not match.",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          re_password: "",
        }));
      }

      return;
    } else {
      setError((prevState) => ({
        ...prevState,
        name: "",
        email: "",
        password: "",
        re_password: "",
        relation: "",
      }));
    }

    dispatch(
      register({
        name: push.name,
        email: push.email,
        password: push.password,
        relation: push.relation,
      })
    );

    console.log("====================================");
    console.log(push);
    console.log("====================================");

    setSubmit(true);
  };

  const emailClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  const errorEmailClassName =
    "bg-red-50 border border-red-500 text-red-900 text-sm placeholder-red-700 rounded-lg focus:ring-red-500 block w-full p-2.5";

  const passwordClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  const errorPasswordClassName =
    "bg-red-50 border border-red-500 text-red-900 text-sm placeholder-red-700 rounded-l-md focus:ring-red-500 block w-full p-2.5";

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-16 grid space-y-2">
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-500">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className={error.email ? errorEmailClassName : emailClassName}
            value={push.name}
            onChange={handleEventChangeInput}
          />
          {error.name ? (
            <p className="mb-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Errors! </span> {error.name}
            </p>
          ) : null}
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            className={error.email ? errorEmailClassName : emailClassName}
            value={push.email}
            onChange={handleEventChangeInput}
          />
          {error.email ? (
            <p className="mb-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Errors! </span> {error.email}
            </p>
          ) : null}
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-500">
            Password
          </label>
          <div className="flex rounded-lg shadow-sm">
            <input
              type={isHide ? "password" : "text"}
              id="password"
              name="password"
              placeholder="Password"
              className={
                error.password ? errorPasswordClassName : passwordClassName
              }
              value={push.password}
              onChange={handleEventChangeInput}
            />
            <button
              type="button"
              className="w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border 
                        border-transparent bg-gray-300 text-white border-gray-30 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => {
                setHide(!isHide);
              }}
            >
              {isHide ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
          {error.password ? (
            <p className="mb-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Errors! </span> {error.password}
            </p>
          ) : null}
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-500">
            Retype password
          </label>
          <div className="flex rounded-lg shadow-sm">
            <input
              type={isHide1 ? "password" : "text"}
              id="re_password"
              name="re_password"
              placeholder="Retype password"
              className={
                error.re_password ? errorPasswordClassName : passwordClassName
              }
              value={push.re_password}
              onChange={handleEventChangeInput}
            />
            <button
              type="button"
              className="w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border 
                        border-transparent bg-gray-300 text-white border-gray-30 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => {
                setHide1(!isHide1);
              }}
            >
              {isHide1 ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
          {error.re_password ? (
            <p className="mb-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Errors! </span> {error.re_password}
            </p>
          ) : null}
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-500">
          As a student's parent
        </label>
        <select
          id="default"
          name="relation"
          defaultValue={push.relation}
          className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          onChange={handleEventChangeSelect}
        >
          <option value="mother">Mother</option>
          <option value="father">Father</option>
        </select>
      </div>

      <div className="flex flex-col mt-20 space-y-5">
        {isSubmit ? (
          <Loading />
        ) : (
          <button
            type="submit"
            className={!push.isValid ? btnClassName : btnDisable}
            disabled={push.isValid}
          >
            Register
          </button>
        )}

        <div className="flex items-center justify-center border-t-[1px] border-t-slate-400 w-full relative">
          <div className="-mt-1 font-bod bg-white px-5 absolute">Or</div>
        </div>
      </div>
    </form>
  );
}
