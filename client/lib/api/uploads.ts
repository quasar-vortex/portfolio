import { authHeaders, handleResponse } from ".";
import { API_URL } from "../constants";
import { AdminFile, DbFile, SearchFilesModel } from "../types";

const baseUrl = `${API_URL}/uploads`;

const uploadNewFile = async (
  f: FormData,
  token: string
): Promise<{ data: DbFile | AdminFile }> => {
  const res = async () =>
    fetch(baseUrl, {
      method: "POST",
      // form data, not json (why not using authHeaders)
      headers: { Authorization: `Bearer ${token}` },
      body: f,
    });
  return await handleResponse(res);
};

const deleteFile = async (
  id: string,
  token: string
): Promise<{ message: string }> => {
  const res = async () =>
    fetch(baseUrl + "/" + id, {
      method: "DELETE",
      headers: authHeaders(token),
    });
  return await handleResponse(res);
};

const getFileById = async (
  id: string
): Promise<{ data: DbFile | AdminFile }> => {
  const res = async () =>
    fetch(`${baseUrl}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  return await handleResponse(res);
};

const getManyFiles = async (
  q: SearchFilesModel,
  token: string
): Promise<{
  data: (DbFile | AdminFile)[];
  message: string;
  meta: {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
}> => {
  const res = async () =>
    fetch(`${baseUrl}/?${new URLSearchParams(q as Record<string, string>)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  return await handleResponse(res);
};

export { uploadNewFile, deleteFile, getFileById, getManyFiles };
