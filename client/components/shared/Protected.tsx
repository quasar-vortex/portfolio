"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/app/providers/storeProvider";
import { redirect, useRouter } from "next/navigation";

type UserRole = "ADMIN" | "USER";

type AcceptedRoles = UserRole[];
const Protected =
  (acceptedRoles: AcceptedRoles) =>
  ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthStore();
    const router = useRouter();
    useEffect(() => {
      if (user && !acceptedRoles.includes(user.role)) {
        redirect("/");
      }
      if (!user) {
        redirect("/login");
      }
    }, [user, router]);

    if (!user || (user && !acceptedRoles.includes(user.role))) return null;
    return <>{children}</>;
  };

const UserGuard = Protected(["USER", "ADMIN"]);
export { UserGuard };
export default Protected(["ADMIN"]);
