import { RegisterSchema } from "@/app/(admin)/register/page";
import { authHeaders, axiosInstance } from ".";
import { API_URL } from "../constants";
import { LoginSchema } from "@/app/(admin)/login/page";
import { authStoreRef, User } from "@/app/store";
import { AxiosResponse } from "axios";
import { ApiRes, apiUrl } from "../utils";
import { toast } from "sonner";
const baseUrl = `${API_URL}/auth`;
const url = apiUrl(baseUrl);

export const registerUser = async (
  payload: RegisterSchema,
  token: string
): ApiRes<{ data: { user: User; accessToken: string } }> => {
  try {
    const res = await axiosInstance.post(url("register"), payload, {
      headers: authHeaders(token),
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const loginUser: (
  payload: LoginSchema
) => Promise<AxiosResponse<{ user: User; accessToken: string }>> = async (
  payload
) => {
  try {
    const res = await axiosInstance.post(url("login"), payload, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const logOffUser = async (token: string) => {
  try {
    const res = await axiosInstance.get(url("logoff"), {
      headers: authHeaders(token),
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

let isRefreshing = false;
export const refreshUser = async (): Promise<{
  data: { accessToken: string; user: User };
}> => {
  if (isRefreshing) throw new Error("Already Refreshing");
  isRefreshing = true;
  try {
    const res = await axiosInstance.get(url("refresh"), {
      withCredentials: true,
    });
    isRefreshing = false;
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};
