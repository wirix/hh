type methodType = "get" | "post" | "delete" | "put";

interface IFetchParams {
  data?: Record<string, any>;
  header?: Record<string, string>;
}

interface IfetchOptions {
  url: string;
  method?: methodType;
  body?: any;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SERVER_URL + "/api"
    : process.env.NEXT_PUBLIC_LOCALHOST_URL + "/api";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  static Error(message: string, status: number) {
    return new ApiError(`Not Found: ${message}`, status);
  }
}

export const fetchCustomTyped = async <T>(
  url: string,
  method: methodType = "get",
  { data, header }: IFetchParams = {},
): Promise<T> => {
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    ...header,
  };

  const fetchOptions: IfetchOptions = {
    url,
    method,
    headers,
    credentials: "include",
  };

  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }

  const response = await fetch(baseURL + url, fetchOptions);

  if (!response.ok) {
    throw ApiError.Error(response.statusText, response.status);
  }

  const responseData = await response.json();

  return { ...responseData, status: response.status } as T;
};
