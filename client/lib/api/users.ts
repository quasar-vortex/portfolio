import { authHeaders, handleResponse } from ".";
import { API_URL } from "../constants";
import { AdminFile, DbFile } from "../types";

const BASE_URL = `${API_URL}/users`;

export const updateUserProfile = async (
  payload: Record<string, string>,
  token: string
) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const getManyUsersHandler = async (
  payload: Record<string, string>,
  token: string
) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const getUploadsByUserId = async (
  userId: string,
  token: string
): Promise<{ data: (DbFile | AdminFile)[] }> => {
  const res = await fetch(`${BASE_URL}/${userId}/uploads`, {
    method: "GET",
    headers: authHeaders(token),
  });
  return handleResponse(res);
};

export const getPostsByUserId = async (userId: string, token: string) => {
  const res = await fetch(`${BASE_URL}/${userId}/posts`, {
    method: "GET",
    headers: authHeaders(token),
  });
  return handleResponse(res);
};

export const getProjecstByUserId = async (userId: string, token: string) => {
  const res = await fetch(`${BASE_URL}/${userId}/posts`, {
    method: "GET",
    headers: authHeaders(token),
  });
  return handleResponse(res);
};
