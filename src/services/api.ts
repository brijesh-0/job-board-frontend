import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Prevent duplicate requests
const pendingRequests = new Map<string, Promise<any>>();

// Request interceptor to deduplicate identical requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const requestKey = `${config.method}-${config.url}`;

    // If this exact request is already pending, return the existing promise
    if (pendingRequests.has(requestKey)) {
      const controller = new AbortController();
      config.signal = controller.signal;
      controller.abort("Duplicate request cancelled");
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.method}-${response.config.url}`;
    pendingRequests.delete(requestKey);
    return response;
  },
  (error: AxiosError<{ error?: string }>) => {
    if (error.config) {
      const requestKey = `${error.config.method}-${error.config.url}`;
      pendingRequests.delete(requestKey);
    }

    if (error.response?.status === 401) {
      console.log("Unauthorized request - authentication required");
    }

    return Promise.reject(error);
  },
);

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.message || "An error occurred";
  }
  return "An unexpected error occurred";
};
