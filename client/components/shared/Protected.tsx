"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/app/providers/storeProvider";
import { useRouter } from "next/navigation";

type UserRole = "ADMIN" | "USER";
type AcceptedRoles = UserRole[];

const Protected = (acceptedRoles: AcceptedRoles) => {
  const WrappedComponent = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/login");
        return;
      }
      if (user && !acceptedRoles.includes(user.role)) {
        router.replace("/");
      }
    }, [user, router]);

    if (!user || (user && !acceptedRoles.includes(user.role))) return null;

    return <>{children}</>;
  };

  WrappedComponent.displayName = `Protected(${acceptedRoles.join(",")})`;
  return WrappedComponent;
};

const UserGuard = Protected(["USER", "ADMIN"]);
export { UserGuard };
export default Protected(["ADMIN"]);
