import { authHeaders, axiosInstance } from ".";
import { API_URL } from "../constants";
import {
  AdminFile,
  DbFile,
  PaginatedUserResponse,
  SearchUsersPayload,
  UpdateUserPayload,
} from "../types";
import { apiUrl } from "../utils";

const BASE_URL = `${API_URL}/users`;
const url = apiUrl(BASE_URL);

export const updateUserProfile = async (
  userId: string,
  payload: UpdateUserPayload,
  token: string
) => {
  try {
    const res = await axiosInstance.put(url(`${userId}`), payload, {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const toggleUserRole = async (userId: string, token: string) => {
  try {
    const res = await axiosInstance.put(url(`${userId}/role`), {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const getManyUsersHandler = async (
  payload: SearchUsersPayload,
  token: string
): Promise<PaginatedUserResponse> => {
  try {
    const res = await axiosInstance.get(
      url(`?${new URLSearchParams(payload as Record<string, string>)}`),
      {
        headers: authHeaders(token),
      }
    );
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const getUploadsByUserId = async (
  userId: string,
  token: string
): Promise<{ data: (DbFile | AdminFile)[] }> => {
  try {
    const res = await axiosInstance.get(url(`${userId}/uploads`), {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const getPostsByUserId = async (userId: string, token: string) => {
  try {
    const res = await axiosInstance.get(url(`${userId}/posts`), {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const getProjecstByUserId = async (userId: string, token: string) => {
  try {
    const res = await axiosInstance.get(url(`${userId}/posts`), {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};
