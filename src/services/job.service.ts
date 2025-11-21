import { api } from "./api";
import { Job, ApiResponse, JobFilters } from "../types";

export interface CreateJobData {
  title: string;
  description: string;
  location: string;
  isRemote: boolean;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  employmentType: string;
  tags: string[];
  companyLogoUrl?: string; // Optional - company name comes from user profile
}

export const jobService = {
  searchJobs: async (
    filters: JobFilters = {},
  ): Promise<{ jobs: Job[]; meta: any }> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    const response = await api.get<ApiResponse<Job[]>>(
      `/jobs?${params.toString()}`,
    );
    return { jobs: response.data.data!, meta: response.data.meta };
  },

  getJob: async (id: string): Promise<Job> => {
    const response = await api.get<ApiResponse<Job>>(`/jobs/${id}`);
    return response.data.data!;
  },

  createJob: async (data: CreateJobData): Promise<Job> => {
    const response = await api.post<ApiResponse<Job>>("/jobs", data);
    return response.data.data!;
  },

  updateJob: async (id: string, data: Partial<CreateJobData>): Promise<Job> => {
    const response = await api.put<ApiResponse<Job>>(`/jobs/${id}`, data);
    return response.data.data!;
  },

  deleteJob: async (id: string): Promise<void> => {
    await api.delete(`/jobs/${id}`);
  },

  getEmployerJobs: async (page = 1): Promise<{ jobs: Job[]; meta: any }> => {
    const response = await api.get<ApiResponse<Job[]>>(
      `/jobs/employer/jobs?page=${page}`,
    );
    return { jobs: response.data.data!, meta: response.data.meta };
  },

  getJobApplications: async (
    jobId: string,
    page = 1,
  ): Promise<{ applications: any[]; meta: any }> => {
    const response = await api.get(`/jobs/${jobId}/applications?page=${page}`);
    return { applications: response.data.data!, meta: response.data.meta };
  },
};
