import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosResponse } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (st: string) => {
  const letters = st.toLocaleLowerCase();
  return `${letters.charAt(0).toUpperCase()}${letters.slice(1)}`;
};
export const apiUrl = (baseUrl: string) => (path?: string) =>
  `${baseUrl}/${path || ""}`;
export type ApiRes<T> = Promise<AxiosResponse<T>>;
