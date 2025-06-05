"use client";

import { useAuthStore } from "@/app/providers/storeProvider";
import React from "react";
import { Container } from "../shared/container";
import { capitalize } from "@/lib/utils";

const DashHeader = () => {
  const { user } = useAuthStore();
  const { firstName, lastName } = user!;

  return (
    <header>
      <Container className="flex justify-between items-center gap-6 flex-wrap">
        <h1 className="text-4xl font-bold">DashBoard</h1>
        <p className="text-gray-700 font-semibold">
          Welcome, {capitalize(firstName)} {capitalize(lastName)}
        </p>
      </Container>
    </header>
  );
};

export default DashHeader;
