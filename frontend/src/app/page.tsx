"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { GetStaticProps } from "next";

export default function Home() {
  const [isLogin, setLogin] = useState(true);
  const router = useRouter();

  return (
    <div className="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <img
                  src="https://mymsjourney.co.za/wp-content/uploads/2018/04/cropped-g_logo.png"
                  loading="lazy"
                  className="w-12"
                  alt="tailus logo"
                />
                {isLogin ? (
                  <>
                    <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                      Sign in to register
                    </h2>
                    <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                      students.
                    </h2>
                  </>
                ) : (
                  <>
                    <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                      Create an account
                    </h2>
                    <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                      parents.
                    </h2>
                  </>
                )}
              </div>

              {isLogin ? <Login /> : <Register />}

              <button
                type="button"
                className=" w-full rounded-full text-[#e4532f] hover:text-white border border-[#e4532f] hover:bg-[#e4532f] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6"
                onClick={() => setLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>

              <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
                <p className="text-xs">
                  By proceeding, you agree to our{" "}
                  <a href="#" className="underline">
                    Terms of Use
                  </a>{" "}
                  and confirm you have read our{" "}
                  <a href="#" className="underline">
                    Privacy and Cookie Statement
                  </a>
                </p>
                <p className="text-xs">
                  This site is protected by reCAPTCHA and the{" "}
                  <a href="#" className="underline">
                    Google Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
