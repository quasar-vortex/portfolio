"use client";
import DashHeader from "@/components/dash/DashHeader";
import Protected from "@/components/shared/Protected";
import React from "react";

const DashBoard = () => {
  return (
    <Protected>
      <DashHeader />
      <section></section>
    </Protected>
  );
};

export default DashBoard;
