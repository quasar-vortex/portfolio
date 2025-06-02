"use client";

import {
  AuthStoreState,
  createAuthStore,
  initAuthStore,
  setAuthStoreRef,
} from "@/app/store";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";
import { StoreApi } from "zustand/vanilla";

export type AuthStoreApi = StoreApi<AuthStoreState>;

const AuthStoreContext = createContext<AuthStoreApi | null>(null);

type AuthStoreProviderProps = {
  children: ReactNode;
};

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthStore(initAuthStore());
  }

  useEffect(() => {
    //@ts-ignore
    setAuthStoreRef(storeRef.current);
  }, []);
  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = () => {
  const store = useContext(AuthStoreContext);

  if (!store) {
    throw new Error("useAuthStore must be used within AuthStoreProvider");
  }

  return useStore(store);
};
