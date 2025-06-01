import { authHeaders, handleResponse } from ".";
import { API_URL } from "../constants";
import { AdminFile, DbFile, SearchFilesModel } from "../types";

const baseUrl = `${API_URL}/uploads`;

const uploadNewFile = async (
  f: FormData,
  token: string
): Promise<DbFile | AdminFile> => {
  const res = await fetch(baseUrl, {
    method: "POST",
    // form data, not json (why not using authHeaders)
    headers: { Authorization: `Bearer ${token}` },
    body: f,
  });
  return handleResponse(res);
};

const deleteFile = async (
  id: string,
  token: string
): Promise<{ message: string }> => {
  const res = await fetch(baseUrl + "/" + id, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handleResponse(res);
};

const getFileById = async (id: string): Promise<DbFile | AdminFile> => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(res);
};

const getManyFiles = async (
  q: SearchFilesModel
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
  const res = await fetch(
    `${baseUrl}/?${new URLSearchParams(q as Record<string, string>)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  return handleResponse(res);
};

export { uploadNewFile, deleteFile, getFileById, getManyFiles };
