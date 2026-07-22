import axios from "axios";

import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:8000/api/v1";

const DEFAULT_API_TIMEOUT =
  60 * 1000;

const apiClient: AxiosInstance =
  axios.create({
    baseURL: API_BASE_URL,

    timeout: DEFAULT_API_TIMEOUT,

    headers: {
      "Content-Type": "application/json",

      Accept: "application/json",
    },
  });

apiClient.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    if (import.meta.env.DEV) {
      console.info(
        `[API Request] ${(
          config.method ?? "GET"
        ).toUpperCase()} ${config.baseURL}${
          config.url ?? ""
        }`
      );
    }

    return config;
  },

  (error: unknown) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.info(
        `[API Response] ${response.status} ${
          response.config.url ?? ""
        }`
      );
    }

    return response;
  },

  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      logApiError(error);
    }

    return Promise.reject(error);
  }
);

const logApiError = (
  error: AxiosError
): void => {
  if (error.code === "ERR_CANCELED") {
    console.info(
      "[API Cancelled]",
      error.config?.url
    );

    return;
  }

  if (error.code === "ECONNABORTED") {
    console.error(
      "[API Timeout]",
      error.config?.url
    );

    return;
  }

  if (!error.response) {
    console.error(
      "[API Network Error]",
      {
        message: error.message,

        url: error.config?.url,
      }
    );

    return;
  }

  console.error(
    "[API Error]",
    {
      status: error.response.status,

      statusText:
        error.response.statusText,

      url: error.config?.url,

      method:
        error.config?.method?.toUpperCase(),

      data: error.response.data,
    }
  );
};

export default apiClient;