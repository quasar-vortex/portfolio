import { authHeaders, axiosInstance } from ".";
import { API_URL } from "../constants";
import { SearchTagsModel } from "../types";
import { apiUrl } from "../utils";

const BASE_URL = `${API_URL}/tags`;
const url = apiUrl(BASE_URL);

export const createTagHandler = async (
  payload: { name: string },
  token: string
) => {
  try {
    const res = await axiosInstance.post(url(), payload, {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const searchTagsHandler = async (query: SearchTagsModel) => {
  try {
    const searchParams = new URLSearchParams(
      query as Record<string, string>
    ).toString();
    const res = await axiosInstance.get(url(`?${searchParams}`), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const updateTagsHandler = async (
  tagId: string,
  payload: { name: string },
  token: string
) => {
  try {
    const res = await axiosInstance.put(url(tagId), payload, {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const getTagByIdHandler = async (tagId: string, token?: string) => {
  try {
    const res = await axiosInstance.get(url(tagId), {
      headers: token
        ? authHeaders(token)
        : { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const getTagByNameHandler = async (name: string, token?: string) => {
  try {
    const res = await axiosInstance.get(url(`name/${name}`), {
      headers: token
        ? authHeaders(token)
        : { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const deleteTagByIdHandler = async (tagId: string, token: string) => {
  try {
    const res = await axiosInstance.delete(url(tagId), {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};
