"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Loading from "../btn/Loading";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isHide, setHide] = useState(true);
  const [isSubmit, setSubmit] = useState(false);
  const [push, setPush] = useState({
    email: "",
    password: "",
    isValid: true,
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const btnClassName =
    "text-white w-full bg-[#e4532f] hover:bg-[#e98369] focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-6 py-2.5 text-center me-2 mb-2";
  const btnDisable =
    "text-white w-full bg-[#d8907f] hover:bg-[#e98369] focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-6 py-2.5 text-center me-2 mb-2 cursor-not-allowed";
  const handleEventChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPush((prevState) => ({ ...prevState, [name]: value }));

    if (push.email && push.password)
      setPush((prevState) => ({ ...prevState, isValid: false }));
    else setPush((prevState) => ({ ...prevState, isValid: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(push.email);
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    // const isValidPassword = passwordRegex.test(push.password);

    if (!push.email || !push.password || !isValidEmail) {
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
      }
      if (!push.password) {
        setError((prevState) => ({
          ...prevState,
          password: "Please enter your password.",
        }));
      }

      return;
    }

    setSubmit(true);

    dispatch(
      logIn({
        email: push.email,
        password: push.password,
      })
    );

    if (localStorage.getItem("access_token")) {
      router.push("/users");
    }
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
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-16 grid space-y-2">
          <div>
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
              onChange={handleEventChange}
            />
            {error.email ? (
              <p className="mb-2 text-sm text-red-600">
                <span className="font-medium">Errors! </span> {error.email}
              </p>
            ) : null}
          </div>
          <div>
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
                onChange={handleEventChange}
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
              <p className="mb-2 text-sm text-red-600">
                <span className="font-medium">Errors! </span> {error.password}
              </p>
            ) : null}
          </div>
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
              Log In
            </button>
          )}

          <div className="flex items-center justify-center border-t-[1px] border-t-slate-400 w-full relative">
            <div className="-mt-1 font-bod bg-white px-5 absolute">Or</div>
          </div>
        </div>
      </form>
    </>
  );
}
