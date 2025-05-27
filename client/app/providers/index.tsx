"use client";

import { ReactNode } from "react";

import { QueryProvider } from "./queryClient";
import { AuthStoreProvider } from "./storeProvider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthStoreProvider>
        {children}
        <Toaster />
      </AuthStoreProvider>
    </QueryProvider>
  );
}
