import { API_URL } from "@/lib/constants";

export const getFeaturedPosts = async () => {
  return fetch(API_URL + "/posts?isFeatured=true", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};
export const getFeaturedProjects = async () => {
  return fetch(API_URL + "/projects/?isFeatured=true", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
};

export type PostSearchParams = {
  term?: string;
  pageSize: number;
  pageIndex: number;
  tags?: string[];
};
export function queryParamBuilder({
  term,
  pageSize,
  pageIndex,
  tags,
}: PostSearchParams) {
  let parts = [];
  if (term) parts.push(`term=${term}`);
  parts.push(`pageSize=${pageSize}`);
  parts.push(`pageIndex=${pageIndex}`);
  if (tags) parts.push(`tags=${tags.join(",")}`);
  return `?${parts.join("&")}`;
}

export const getPaginatedPosts = ({
  pageIndex,
  pageSize,
  term,
  tags,
}: PostSearchParams) =>
  fetch(
    API_URL +
      `/posts/${queryParamBuilder({ pageIndex, pageSize, term, tags })}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => res.json());

export const getPaginatedProjects = ({
  pageIndex,
  pageSize,
  term,
  tags,
}: PostSearchParams) =>
  fetch(
    API_URL +
      `/projects/${queryParamBuilder({ pageIndex, pageSize, term, tags })}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => res.json());
