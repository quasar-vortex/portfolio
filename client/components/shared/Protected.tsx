"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/app/providers/storeProvider";
import { redirect, useRouter } from "next/navigation";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!user || (user && user.role !== "ADMIN")) {
      redirect("/login");
    }
  }, [user, router]);

  if (!user || (user && user.role !== "ADMIN")) return null;
  return <>{children}</>;
};

export default Protected;
