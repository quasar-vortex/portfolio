import { authHeaders, axiosInstance } from ".";
import { API_URL } from "../constants";
import {
  CreateProjectModel,
  SearchProjectsModel,
  UpdateProjectModel,
} from "../types";
import { apiUrl } from "../utils";
const BASE_URL = `${API_URL}/projects`;
const url = apiUrl(BASE_URL);

export const createProject = async (
  payload: CreateProjectModel,
  token: string
) => {
  try {
    const res = await axiosInstance.post(url(), payload, {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const updateProject = async (
  projectId: string,
  payload: UpdateProjectModel,
  token: string
) => {
  try {
    const res = await axiosInstance.put(url(projectId), payload, {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const getProjectById = async (projectId: string, token: string) => {
  try {
    const res = await axiosInstance.get(url(projectId), {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const getProjectBySlug = async (slug: string) => {
  try {
    const res = await axiosInstance.get(url(`slug/${slug}`));
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const getManyProjects = async (query: SearchProjectsModel) => {
  try {
    const searchParams = new URLSearchParams(
      query as Record<string, string>
    ).toString();
    const res = await axiosInstance.get(url(`?${searchParams}`));
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const toggleProjectFeatured = async (
  projectId: string,
  token: string
) => {
  try {
    const res = await axiosInstance.patch(url(`${projectId}/feature`), null, {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const toggleProjectPublished = async (
  projectId: string,
  token: string
) => {
  try {
    const res = await axiosInstance.patch(url(`${projectId}/publish`), null, {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

export const deleteProjectByIdHandler = async (
  projectId: string,
  token: string
) => {
  try {
    const res = await axiosInstance.delete(url(`${projectId}`), {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};
