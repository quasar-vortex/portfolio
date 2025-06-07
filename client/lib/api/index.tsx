import * as postService from "./posts";
import * as projectService from "./projects";
import * as uploadService from "./uploads";
import * as userService from "./users";
import * as authService from "./auth";
import * as tagService from "./tags";

import axios from "axios";
import { API_URL } from "../constants";

import { authStoreRef } from "@/app/store";

type CustomRequestConf = Parameters<typeof axios.request>[0] & {
  isRetryRequest?: boolean;
  retryCount?: number;
};
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 4000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomRequestConf;

    // Do not retry if refresh endpoint itself failed
    if (originalRequest?.url?.includes("/refresh")) {
      return Promise.reject(error);
    }

    // Only retry on 401 Unauthorized
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite retry loops
    if (originalRequest.isRetryRequest) {
      return Promise.reject(error);
    }

    // Limit to 1 retry
    originalRequest.retryCount = originalRequest.retryCount ?? 0;
    if (originalRequest.retryCount > 0) {
      console.warn("Request retried and failed");
      return Promise.reject(error);
    }

    originalRequest.retryCount++;
    originalRequest.isRetryRequest = true;

    try {
      const res = await authService.refreshUser(); // must include credentials
      const { accessToken, user } = res.data;

      authStoreRef?.getState().setUser({
        accessToken,
        user,
        createdAt: Date.now(),
      });

      // Set Authorization header and credentials on retry
      originalRequest.headers = {
        ...(originalRequest.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      };
      originalRequest.withCredentials = true;

      return await axiosInstance(originalRequest);
    } catch (refreshError) {
      console.log("Unable to refresh user", refreshError);
      return Promise.reject(refreshError);
    }
  }
);

export const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});
export { axiosInstance };

const defaults = {
  postService,
  projectService,
  uploadService,
  userService,
  authService,
  tagService,
};

export default defaults;
