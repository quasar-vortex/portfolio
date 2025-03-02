export interface ApiRespone<T> {
  error?: any;
  message: string;
  data?: T;
  totalPages?: number;
  currentPage?: number;
  statusCode: number;
}

export function formatApiRespone<T>(
  data: T,
  statusCode?: number,
  message?: string,
  totalPages?: number,
  currentPage?: number,
  error?: any
): ApiRespone<T> {
  return {
    message: message || "Success",
    data,
    totalPages,
    currentPage,
    statusCode: statusCode || 200,
    error,
  };
}
