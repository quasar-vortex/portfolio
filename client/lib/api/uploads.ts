import { authHeaders, axiosInstance } from ".";
import { API_URL } from "../constants";
import { AdminFile, DbFile } from "../types";
import { apiUrl } from "../utils";
// import { SearchFilesModel } from "../types";
const baseUrl = `${API_URL}/uploads`;
const url = apiUrl(baseUrl);

const uploadNewFile = async (
  f: FormData,
  token: string
): Promise<{ data: DbFile | AdminFile }> => {
  try {
    const res = await axiosInstance.post(url(), f, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

const deleteFile = async (
  id: string,
  token: string
): Promise<{ message: string }> => {
  try {
    const res = await axiosInstance.delete(url(id), {
      headers: authHeaders(token),
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

const getFileById = async (
  id: string
): Promise<{ data: DbFile | AdminFile }> => {
  try {
    const res = await axiosInstance.get(url(id), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};

/* 
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
  try {
    const searchParams = new URLSearchParams(
      q as Record<string, string>
    ).toString();
    const res = await axiosInstance.get(url(`?${searchParams}`), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    //@ts-expect-error error type issue
    const msg = error.response?.data?.message || "Request Failed";
    throw new Error(msg);
  }
};
*/

export { uploadNewFile, deleteFile, getFileById };
