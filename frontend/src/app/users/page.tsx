"use client";

import Navbar from "@/components/Content/Navbar";
import Card from "@/components/Content/Card";
import { useState, useCallback } from "react";

export default function Users() {
  const handleSidebar = useCallback(() => {
    // Navbar({ sideBar: false });
  }, []);

  return (
    <div className="bg-white h-full w-full">
      <Navbar />
      <div className="bg-white p-4 sm:ml-64 h-full" onClick={handleSidebar}>
        <div className="p-4 rounded-lg mt-14 h-full">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mb-4">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}
