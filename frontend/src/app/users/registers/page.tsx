"use client";

import Steper from "@/components/Content/Steper";
import { useState, useRef } from "react";
import Navbar from "@/components/Content/Navbar";
import RegisStudent from "@/components/Page/RegisStudent";

export default function Register() {
  const [activeIndex, setActiveIndex] = useState(1);
  const toast = useRef(null);

  return (
    <div className="h-full w-full bg-slate-600">
      <Navbar />
      <div className="bg-white p-4 sm:ml-64 h-full">
        <div className="flex justify-between shadow-inner p-4 rounded-lg mt-14 h-full bg-slate-100 border-collapse border-spacing-1 border-gray-100">
          <Steper />
        </div>

        <div className="mt-4">
          <RegisStudent />
        </div>
      </div>
    </div>
  );
}
