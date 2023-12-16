"use client";
import { useState } from "react";

export default function EmailVerification() {
  const [otp, setOtp] = useState();

  const focusNextInput = (el: number, prevId: string, nextId: string) => {
    // console.log(+el.value.length);
    if (+el == 0) {
      // console.log("masuk if");
      document.getElementById(prevId)?.focus();
    } else {
      // console.log("masuk else");
      document.getElementById(nextId)?.focus();
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-r from-[#cacaca] h-screen w-screen">
      <div className="bg-white min-w-min h-screen w-screen 2xl:h-4/6 md:h-[90%] 2xl:w-7/12 xl:w-3/5 lg:w-9/12 md:w-11/12 m-auto rounded-lg shadow pb-5">
        <div className="max-w flex flex-col justify-center items-center bg-[#ee913b] h-1/2 rounded-t-lg">
          <div className="flex items-center justify-center border-t-[2px] border-t-white w-1/6">
            <div className="flex items-center justify-center absolute w-20 h-2 bg-[#ee913b]">
              <i
                className="fa-regular fa-envelope fa-2xl"
                style={{ color: "#ffffff" }}
              ></i>
            </div>
          </div>
          <div className="flex flex-col justify-items-center mt-10">
            <p className="mb-2 text-2xl tracking-tight text-white text-center">
              THANKS FOR SIGNING UP
            </p>
            <p className="mb-2 text-4xl tracking-tight text-white text-center">
              Verify Your E-Mail Address
            </p>
          </div>
        </div>
        <div className="p-5 w-full">
          <form className="max-w-md flex flex-col justify-center m-auto space-y-6">
            <p
              id="helper-text-explanation"
              className="mt-2 text-md text-gray-700 text-center"
            >
              We send you the six digit code to
              <span className="text-gray-700 font-bold">
                {" "}
                example@email.com
              </span>
              .
            </p>
            <div className="flex justify-center space-x-3 rtl:space-x-reverse">
              <div>
                <label className="sr-only">First code</label>
                <input
                  type="text"
                  maxLength={1}
                  onKeyUp={(e) =>
                    focusNextInput(
                      e.currentTarget.value.length,
                      "code-1",
                      "code-2"
                    )
                  }
                  id="code-1"
                  className="block w-9 h-9 md:w-12 md:h-12 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-[#ee913b] rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="sr-only">Second code</label>
                <input
                  type="text"
                  maxLength={1}
                  onKeyUp={(e) =>
                    focusNextInput(
                      e.currentTarget.value.length,
                      "code-1",
                      "code-3"
                    )
                  }
                  id="code-2"
                  className="block w-9 h-9 md:w-12 md:h-12 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-[#ee913b] rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="sr-only">Third code</label>
                <input
                  type="text"
                  maxLength={1}
                  onKeyUp={(e) =>
                    focusNextInput(
                      e.currentTarget.value.length,
                      "code-2",
                      "code-4"
                    )
                  }
                  id="code-3"
                  className="block w-9 h-9 md:w-12 md:h-12 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-[#ee913b] rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="sr-only">Fourth code</label>
                <input
                  type="text"
                  maxLength={1}
                  onKeyUp={(e) =>
                    focusNextInput(
                      e.currentTarget.value.length,
                      "code-3",
                      "code-5"
                    )
                  }
                  id="code-4"
                  className="block w-9 h-9 md:w-12 md:h-12 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-[#ee913b] rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="sr-only">Fivth code</label>
                <input
                  type="text"
                  maxLength={1}
                  onKeyUp={(e) =>
                    focusNextInput(
                      e.currentTarget.value.length,
                      "code-4",
                      "code-6"
                    )
                  }
                  id="code-5"
                  className="block w-9 h-9 md:w-12 md:h-12 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-[#ee913b] rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="sr-only">Sixth code</label>
                <input
                  type="text"
                  maxLength={1}
                  onKeyUp={(e) =>
                    focusNextInput(
                      e.currentTarget.value.length,
                      "code-5",
                      "code-6"
                    )
                  }
                  id="code-6"
                  className="block w-9 h-9 md:w-12 md:h-12 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-[#ee913b] rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
              <button
                role="submit"
                className="w-56 py-3 text-sm font-medium text-center text-white bg-[#ee913b] rounded-lg hover:bg-[#ee913bcb] focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Verify Now
              </button>
              <p className="mt-2 text-md text-gray-700 text-center">
                This passcode will only be valid for next <span>5 minutes</span>
                .
              </p>
              <p className="mt-2 text-md text-gray-700 text-center">
                If you haven't received the code, you can{" "}
                <span className="text-[#ee913b] font-semibold">resend it</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
