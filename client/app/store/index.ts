import api from "@/lib/api";
import { toast } from "sonner";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
export type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  role: "ADMIN" | "USER";
  bio: string | null;
  avatarFile: {
    id: string;
    url: string;
  } | null;
};
export type AuthState = {
  user: User | null;
  accessToken: string | null;
  createdAt: Number | null;
};
type AuthActions = {
  setUser: (p: AuthState) => void;
  clearUser: () => void;
};
export type LoginResponse = { user: User; accessToken: string };
export type AuthStoreState = AuthActions & AuthState;
export const initAuthStore = (): AuthState => {
  return {
    user: null,
    accessToken: null,
    createdAt: null,
  };
};
export const defaultInitState: AuthState = {
  user: null,
  accessToken: null,
  createdAt: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStoreState>()(
    persist(
      (set) => ({
        ...initState,
        setUser: (p) => {
          set((st) => ({
            ...st,
            user: p.user,
            accessToken: p.accessToken,
            createdAt: Date.now(),
          }));
        },
        clearUser: () =>
          set((st) => ({ user: null, accessToken: null, createdAt: null })),
      }),
      {
        name: "auth",
        partialize: (st) => ({
          user: st.user,
          accessToken: st.accessToken,
          createdAt: st.createdAt,
        }),
        onRehydrateStorage: (st) => {
          const currentTime = Date.now();
          const createdAt = st?.createdAt ?? 0;
          if (createdAt) {
            if (
              currentTime - (createdAt as unknown as number) >
              1000 * 14 * 60 // 14 minutes
            ) {
              st?.clearUser?.();
            }
          }
        },
      }
    )
  );
};

export let authStoreRef: ReturnType<typeof createAuthStore> | null = null;

export const setAuthStoreRef = (store: ReturnType<typeof createAuthStore>) => {
  authStoreRef = store;
};
