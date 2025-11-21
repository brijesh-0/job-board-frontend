import { api } from "./api";
import { User, ApiResponse } from "../types";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "candidate" | "employer";
  company?: string; // NEW
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

// Cache to prevent multiple simultaneous calls
let currentUserPromise: Promise<User> | null = null;

export const authService = {
  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      data,
    );
    return response.data.data!.user;
  },

  login: async (data: LoginData): Promise<User> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      data,
    );
    return response.data.data!.user;
  },

  logout: async (): Promise<void> => {
    currentUserPromise = null;
    await api.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<User> => {
    if (currentUserPromise) {
      return currentUserPromise;
    }

    currentUserPromise = api
      .get<ApiResponse<{ user: User }>>("/auth/me")
      .then((response) => response.data.data!.user)
      .catch((error) => {
        currentUserPromise = null;
        throw error;
      });

    return currentUserPromise;
  },
};
