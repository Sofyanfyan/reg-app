"use client";

import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function status() {
  const [id, setId] = useState(0);

  // useEffect(() => {
  //   const idParams = useSearchParams();
  //   const id = idParams.get("id");
  //   setId(id);
  // }, []);

  return <h1 className="font-medium text-cyan-900">INI HALAMAN STATUS {id}</h1>;
}
