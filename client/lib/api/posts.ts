import { authHeaders, handleResponse } from ".";
import { API_URL } from "../constants";
import {
  AdminPost,
  CreatePostModel,
  SearchPostsModel,
  UpdatePostModel,
} from "../types";

const BASE_URL = `${API_URL}/posts`;

export const createPost = async (
  payload: CreatePostModel,
  token: string
): Promise<{ data: AdminPost }> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const updatePost = async (
  postId: string,
  payload: UpdatePostModel,
  token: string
) => {
  const res = await fetch(`${BASE_URL}/${postId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const getPostById = async (
  postId: string,
  token: string
): Promise<{ data: AdminPost }> => {
  const res = await fetch(`${BASE_URL}/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};

export const getPostBySlug = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/slug/${slug}`);
  return handleResponse(res);
};

export const searchPosts = async (query: SearchPostsModel, token?: string) => {
  const searchParams = new URLSearchParams(
    query as Record<string, string>
  ).toString();
  const res = await fetch(`${BASE_URL}?${searchParams}`, {
    headers: token
      ? authHeaders(token)
      : { "Content-Type": "application/json" },
  });
  return handleResponse(res);
};

export const deletePostById = async (postId: string, token: string) => {
  const res = await fetch(`${BASE_URL}/${postId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handleResponse(res);
};

export const togglePostAsFeatured = async (postId: string, token: string) => {
  const res = await fetch(`${BASE_URL}/${postId}/feature`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};

export const togglePostAsPublished = async (postId: string, token: string) => {
  const res = await fetch(`${BASE_URL}/${postId}/publish`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};
