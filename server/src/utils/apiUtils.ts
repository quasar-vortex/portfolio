export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: any;
  pagination?: {
    totalPages: number;
    currentPage: number;
  };
}

type ApiResponseOptions<T> = {
  data?: T;
  statusCode?: number;
  message?: string;
  error?: any;
  totalPages?: number;
  currentPage?: number;
  totalRecords?: number;
};

function formatApiResponse<T>(options: ApiResponseOptions<T>): ApiResponse<T> {
  const {
    data,
    statusCode = 200,
    message = "Success",
    error,
    totalPages,
    currentPage,
    totalRecords,
  } = options;

  return {
    statusCode,
    message,
    ...(data !== undefined && { data }),
    ...(error && { error }),
    ...(totalPages !== undefined &&
      currentPage !== undefined &&
      totalRecords !== undefined && {
        pagination: { totalPages, currentPage, totalRecords },
      }),
  };
}

export default { formatApiResponse };
