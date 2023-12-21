"use client";

import Steper from "@/components/Content/Steper";
import { useState, useRef } from "react";
import Navbar from "@/components/Content/Navbar";
import RegisStudent from "@/components/Page/RegisStudent";
import RegisMother from "@/components/Page/RegisMother";
import RegisFather from "@/components/Page/RegisFather";
import RegisBrotherSister from "@/components/Page/RegisBrotherSister";

export default function Register() {
  const [idx, setIdx] = useState(1);
  const [form, setForm] = useState("student");

  let display: any;

  type props = {
    idx: number;
    form: string;
    setIdx: any;
    setForm: any;
  };

  const props: props = {
    idx,
    form,
    setIdx,
    setForm,
  };

  if (form == "student" && idx == 1) {
    display = <RegisStudent {...props} />;
  } else if (form == "mother" && idx == 2) {
    display = <RegisMother {...props} />;
  } else if (form == "father" && idx == 2) {
    display = <RegisFather {...props} />;
  } else if (form == "b/s" && idx >= 3) {
    display = <RegisBrotherSister {...props} />;
  }

  return (
    <div className="h-full w-full bg-slate-600">
      <Navbar />
      <div className="bg-white p-4 sm:ml-64 h-full">
        <div className="flex justify-between shadow-inner p-4 rounded-lg mt-16 h-full bg-slate-100 border-collapse border-spacing-1 border-gray-100 mb-5">
          <Steper {...props} />
        </div>
        {display}
      </div>
    </div>
  );
}
