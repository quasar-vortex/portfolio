import { AxiosError } from "axios";
import { authHeaders, axiosInstance } from ".";
import { API_URL } from "../constants";
import {
  AdminPost,
  CreatePostModel,
  SearchPostsModel,
  UpdatePostModel,
} from "../types";
import { apiUrl } from "../utils";
const BASE_URL = `${API_URL}/posts`;
const url = apiUrl(BASE_URL);

export const createPost = async (
  payload: CreatePostModel,
  token: string
): Promise<{ data: AdminPost }> => {
  try {
    const res = await axiosInstance.post(url(), payload, {
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

export const updatePost = async (
  postId: string,
  payload: UpdatePostModel,
  token: string
) => {
  try {
    const res = await axiosInstance.put(url(postId), payload, {
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

export const getPostById = async (
  postId: string,
  token: string
): Promise<{ data: AdminPost }> => {
  try {
    const res = await axiosInstance.get(url(postId), {
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

export const getPostBySlug = async (slug: string) => {
  try {
    const res = await axiosInstance.get(url(`slug/${slug}`));
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const searchPosts = async (query: SearchPostsModel, token?: string) => {
  try {
    const searchParams = new URLSearchParams(
      query as Record<string, string>
    ).toString();
    const res = await axiosInstance.get(url(`?${searchParams}`), {
      headers: token
        ? authHeaders(token)
        : { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    //@ts-ignore
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const deletePostById = async (postId: string, token: string) => {
  try {
    const res = await axiosInstance.delete(url(postId), {
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

export const togglePostAsFeatured = async (postId: string, token: string) => {
  try {
    const res = await axiosInstance.patch(url(`${postId}/feature`), null, {
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

export const togglePostAsPublished = async (postId: string, token: string) => {
  try {
    const res = await axiosInstance.patch(url(`${postId}/publish`), null, {
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
