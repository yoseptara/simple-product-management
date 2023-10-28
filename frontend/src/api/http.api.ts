import axios from "axios";
import { AxiosError } from "axios";
import { ApiError } from "@src/api/ApiError";
import { readToken } from "@src/services/localStorage.service";

export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

httpApi.interceptors.request.use((config) => {
  config.headers.setAuthorization(`Bearer ${readToken()}`);
  // config.headers = {
  //   ...config.headers,
  //   Authorization: `Bearer ${readToken()}`,
  // };

  return config;
});

httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response) {
    const isApiErrorData = (data: any): data is ApiErrorData =>
      data && typeof data.message === "string";

    if (isApiErrorData(error.response.data)) {
      throw new ApiError<ApiErrorData>(
        error.response.data.message,
        error.response.data
      );
    } else {
      throw new ApiError<ApiErrorData>(
        "An unexpected error occurred",
        undefined
      );
    }
  } else {
    throw new ApiError<ApiErrorData>(error.message, undefined);
  }
});

export interface ApiErrorData {
  message: string;
}
