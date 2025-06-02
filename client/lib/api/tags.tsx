import { authHeaders, handleResponse } from ".";
import { API_URL } from "../constants";
import { SearchTagsModel } from "../types";

const BASE_URL = `${API_URL}/tags`;

export const createTagHandler = async (
  payload: { name: string },
  token: string
) => {
  const res = async () =>
    fetch(BASE_URL, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    });
  return await handleResponse(res);
};
export const searchTagsHandler = async (query: SearchTagsModel) => {
  const res = async () =>
    fetch(
      BASE_URL + "/?" + new URLSearchParams(query as Record<string, string>),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  return await handleResponse(res);
};
export const updateTagsHandler = async (
  tagId: string,
  payload: { name: string },
  token: string
) => {
  const res = async () =>
    fetch(`${BASE_URL}/${tagId}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    });
  return await handleResponse(res);
};
export const getTagByIdHandler = async (tagId: string, token?: string) => {
  const res = async () =>
    fetch(`${BASE_URL}/${tagId}`, {
      method: "GET",
      headers: token
        ? authHeaders(token)
        : { "Content-Type": "application/json" },
    });
  return await handleResponse(res);
};
export const getTagByNameHandler = async (name: string, token?: string) => {
  const res = async () =>
    fetch(`${BASE_URL}/name/${name}}`, {
      method: "GET",
      headers: token
        ? authHeaders(token)
        : { "Content-Type": "application/json" },
    });
  return await handleResponse(res);
};
export const deleteTagByIdHandler = async (tagId: string, token: string) => {
  const res = async () =>
    fetch(`${BASE_URL}/${tagId}}`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
  return await handleResponse(res);
};
