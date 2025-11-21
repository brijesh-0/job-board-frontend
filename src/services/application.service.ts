import { api } from "./api";
import { Application, ApiResponse, ApplicationStatus } from "../types";

export interface CreateApplicationData {
  jobId: string;
  coverLetter?: string;
  resumeUrl: string;
}

export const applicationService = {
  createApplication: async (
    data: CreateApplicationData,
  ): Promise<Application> => {
    const response = await api.post<ApiResponse<Application>>(
      "/applications",
      data,
    );
    return response.data.data!;
  },

  getCandidateApplications: async (): Promise<Application[]> => {
    const response = await api.get<ApiResponse<Application[]>>(
      "/applications?limit=100",
    );
    return response.data.data!;
  },

  withdrawApplication: async (id: string): Promise<Application> => {
    const response = await api.put<ApiResponse<Application>>(
      `/applications/${id}/withdraw`,
    );
    return response.data.data!;
  },

  updateApplicationStatus: async (
    id: string,
    status: ApplicationStatus,
    note?: string,
  ): Promise<Application> => {
    const response = await api.put<ApiResponse<Application>>(
      `/applications/${id}/status`,
      { status, note },
    );
    return response.data.data!;
  },
};
