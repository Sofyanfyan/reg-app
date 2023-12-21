"use client";

export default function Steper() {
  return (
    <ol className="flex items-center justify-center w-full text-sm font-medium text-center text-gray-500 sm:text-base">
      <li className="flex md:w-full items-center text-[#e25d04ee] sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-300 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10">
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-300">
          <svg
            className="w-4 h-4 sm:w-6 sm:h-6 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          Student{" "}
          {/* <span className="hidden sm:inline-flex sm:ms-2">Info</span> */}
        </span>
      </li>
      <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-300 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10">
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-300">
          <span className="me-2">2</span>
          Parent{" "}
          {/* <span className="hidden sm:inline-flex sm:ms-2">Info</span> */}
        </span>
      </li>
      <li className="flex items-center sm:w-80">
        <span className="me-2">3</span>
        Brother sister
      </li>
    </ol>
  );
}
