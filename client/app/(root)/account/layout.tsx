import { UserGuard } from "@/components/shared/Protected";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <UserGuard>{children}</UserGuard>;
};

export default Layout;
