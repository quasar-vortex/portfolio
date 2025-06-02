import { RegisterSchema } from "@/app/(admin)/register/page";
import { authHeaders, handleResponse } from ".";
import { API_URL } from "../constants";
import { LoginSchema } from "@/app/(admin)/login/page";
import { User } from "@/app/store";
const baseUrl = `${API_URL}/auth`;

export const registerUser = async (payload: RegisterSchema, token: string) => {
  const res = async () =>
    fetch(baseUrl + "/register", {
      method: "POST",
    });
  return await handleResponse(res);
};
export const loginUser = async (payload: LoginSchema, tokn: string) => {
  const res = async () =>
    fetch(baseUrl + "/login", {
      method: "POST",
    });
  return await handleResponse(res);
};
// clears refresh cookie
export const logOffUser = async (token: string) => {
  const res = async () =>
    fetch(baseUrl + "/logoff", {
      method: "GET",
      headers: authHeaders(token),
      credentials: "include",
    });
  return await handleResponse(res);
};

export const refreshUser = async (): Promise<{
  data: { accessToken: string; user: User };
}> => {
  const res = async () =>
    fetch(baseUrl + "/refresh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  return await handleResponse(res);
};
