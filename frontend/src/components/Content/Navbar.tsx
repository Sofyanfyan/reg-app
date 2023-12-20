"use state";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function Navbar({ ...stateSidebar }) {
  const [state, setState] = useState(false);
  const [username, setUsername] = useState("Unknown");
  const [initial, setInitial] = useState("?");

  useEffect(() => {
    const user: string = localStorage.getItem("name") || "Unknown";

    user ? setUsername(user) : null;

    const split = username.split(" ");

    if (split.length > 1) {
      setInitial(
        split[0].charAt(0).toLocaleUpperCase() +
          split[1].charAt(0).toLocaleUpperCase()
      );
    } else {
      setInitial(split[0].charAt(0).toLocaleUpperCase());
    }
  });

  const handleOpenSidebar = () => {
    setState(!state);
  };

  type PropsSidebar = {
    state: boolean;
    username: string;
    initial: string;
  };

  const props: PropsSidebar = {
    // make sure all required component's inputs/Props keys&types match
    state,
    username,
    initial,
  };

  const Strip3 = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  );

  const CrossIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      className="w-6 h-6"
      viewBox="0,0,256,256"
    >
      <g
        fill="#666666"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      >
        <g transform="scale(5.12,5.12)">
          <path d="M7.70703,6.29297l-1.41406,1.41406l17.29297,17.29297l-17.29297,17.29297l1.41406,1.41406l17.29297,-17.29297l17.29297,17.29297l1.41406,-1.41406l-17.29297,-17.29297l17.29297,-17.29297l-1.41406,-1.41406l-17.29297,17.29297z"></path>
        </g>
      </g>
    </svg>
  );

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={handleOpenSidebar}
                className="inline-flex items-center p-2 text-sm sm:hidden text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                {/* <span className="sr-only">Open sidebar</span> */}
                {state ? CrossIcon : Strip3}
              </button>
              <div className="flex ms-2 md:me-24">
                {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 me-3"
              alt="FlowBite Logo"
            /> */}
                <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-[#e25d04ee]">
                  Great Crystal School
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <div
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="true"
                    data-dropdown-toggle="dropdown-user"
                  >
                    {/* <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    /> */}

                    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        {initial}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar {...props} />
    </>
  );
}
