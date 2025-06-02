import { useAuthStore } from "@/app/providers/storeProvider";
import * as postService from "./posts";
import * as projectService from "./projects";
import * as uploadService from "./uploads";
import * as userService from "./users";
import * as authService from "./auth";

export const handleResponse = async (r: () => Promise<Response>) => {
  const res = await r();

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }

  return res.json();
};

export const authHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export default {
  postService,
  projectService,
  uploadService,
  userService,
  authService,
};
