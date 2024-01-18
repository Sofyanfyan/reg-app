"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Content/Navbar";

export default function status() {
  const [id, setId] = useState("");
  const pathName = usePathname();
  useEffect(() => {
    const path = pathName.split("/");
    setId(path[2]);
  }, [setId]);

  return (
    <>
      <div className="h-full w-full bg-slate-600">
        <Navbar />
        <div className="bg-white p-4 sm:ml-64 h-full">
          <ol className="relative border-s border-gray-200 mt-16 lg:me-32">
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-[#e97b3b] rounded-full -start-3 ring-8 ring-white">
                {/* <svg
                  className="w-2.5 h-2.5 text-blue-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg> */}
                <i className="fa-solid fa-check fa-xs"></i>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                Registration request received
                <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                  Latest
                </span>
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                Released on January 13th, 2022
              </time>
              <p className="mb-4 text-base font-normal text-gray-500">
                A student registration request has been received. The individual
                has submitted their details for enrollment, and the information
                is currently awaiting response from admin.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700"
              >
                <i className="fa-solid fa-circle-info me-2 fa-lg"></i>
                Details
              </a>
            </li>
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-[#e97b3b] rounded-full -start-3 ring-8 ring-white ">
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                Awaiting Response From Administrator
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                Released on December 7th, 2021
              </time>
              <p className="text-base font-normal text-gray-500">
                Awaiting response from the school administrator. The current
                school enrollment application is pending a response from the
                school administration. Upon receiving feedback from the
                administration, they will assess the provided student data.
              </p>
            </li>
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-[#fad7c3] rounded-full -start-3 ring-8 ring-white ">
                <i className="fa-solid fa-calendar text-[#b36539] fa-xs"></i>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                Data Seen By Administrator
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                Released on December 7th, 2021
              </time>
              <p className="text-base font-normal text-gray-500">
                The administrator has reviewed the submitted data for school
                enrollment. The information is now under assessment to determine
                eligibility. Further communication regarding the status
                enrollment will be provided shortly.
              </p>
            </li>
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-[#fad7c3] rounded-full -start-3 ring-8 ring-white ">
                <i className="fa-solid fa-calendar text-[#b36539] fa-xs"></i>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                Student Data Is Approved By Administrator
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                Released on December 2nd, 2021
              </time>
              <p className="text-base font-normal text-gray-500">
                Student data has been approved by the administrator. The school
                admin will contact the registered phone number regarding the
                school fees and provide further instructions for the enrollment
                process.
              </p>
            </li>
            <li className="ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-[#fad7c3] rounded-full -start-3 ring-8 ring-white ">
                <i className="fa-solid fa-calendar text-[#b36539] fa-xs"></i>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                Students Have Been Enrolled In Great Crystal School
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                Released on December 2nd, 2021
              </time>
              <p className="text-base font-normal text-gray-500">
                Student data has been registered in the school database
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
