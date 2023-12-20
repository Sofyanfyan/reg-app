"use client";

export default function Card() {
  return (
    <div className="sm:max-w-lg max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow space-y-3">
      <div className="flex flex-col space-y-1 ">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Imaservina Agustin
        </h5>
        <div className="flex space-x-2">
          <i
            className="fa-solid fa-circle-dot fa-md my-auto fa-beat-fade"
            style={{ color: "#e4dd01" }}
          ></i>

          <p className="font-semibold" style={{ color: "#e4dd01" }}>
            In progres
          </p>
        </div>
      </div>

      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Date of register <span className="italic">14 December 2023</span>
      </p>
      <a
        href="#"
        className="inline-flex items-center text-blue-600 hover:underline"
      >
        See Progress
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </a>
    </div>
  );
}
