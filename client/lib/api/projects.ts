import { authHeaders, handleResponse } from ".";
import { API_URL } from "../constants";
import {
  CreateProjectModel,
  SearchProjectsModel,
  UpdateProjectModel,
} from "../types";

const BASE_URL = `${API_URL}/projects`;

export const createProject = async (
  payload: CreateProjectModel,
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
export const updateProject = async (
  projectId: string,
  payload: UpdateProjectModel,
  token: string
) => {
  const res = async () =>
    fetch(`${BASE_URL}/${projectId}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    });
  return await handleResponse(res);
};
export const getProjectById = async (projectId: string, token: string) => {
  const res = async () =>
    fetch(`${BASE_URL}/${projectId}`, {
      method: "GET",
      headers: authHeaders(token),
    });
  return await handleResponse(res);
};
export const getProjectBySlug = async (slug: string) => {
  const res = async () =>
    fetch(`${BASE_URL}/slug/${slug}`, {
      method: "GET",
    });
  return await handleResponse(res);
};
export const getManyProjects = async (query: SearchProjectsModel) => {
  const searchParams = new URLSearchParams(
    query as Record<string, string>
  ).toString();
  const res = async () => fetch(`${BASE_URL}?${searchParams}`);
  return await handleResponse(res);
};
export const toggleProjectFeatured = async (
  projectId: string,
  token: string
) => {
  const res = async () =>
    fetch(`${BASE_URL}/${projectId}/feature`, {
      method: "PATCH",
      headers: authHeaders(token),
    });
  return await handleResponse(res);
};
export const toggleProjectPublished = async (
  projectId: string,
  token: string
) => {
  const res = async () =>
    fetch(`${BASE_URL}/${projectId}/publish`, {
      method: "PATCH",
      headers: authHeaders(token),
    });
  return await handleResponse(res);
};
