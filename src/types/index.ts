export type UserRole = "candidate" | "employer";

export type ApplicationStatus =
  | "Applied"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Rejected";

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string; // NEW - for employers
  profile?: {
    title?: string;
    bio?: string;
    location?: string;
    phone?: string;
  };
  resumeUrl?: string;
  emailNotifications: {
    applicationReceived: boolean;
    statusChanged: boolean;
  };
}

export interface Job {
  _id: string;
  employerId: string;
  company: {
    name: string;
    logoUrl?: string;
  };
  title: string;
  description: string;
  location: string;
  isRemote: boolean;
  salary: {
    min: number;
    max: number;
    currency: string; // Will be INR
  };
  employmentType: EmploymentType;
  tags: string[];
  status: "open" | "closed";
  applicantCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  jobId: string | Job;
  candidateId: string | User;
  employerId: string;
  coverLetter?: string;
  resumeUrl: string;
  status: ApplicationStatus;
  statusHistory: Array<{
    status: ApplicationStatus;
    changedBy: string;
    changedAt: string;
    note?: string;
  }>;
  isWithdrawn: boolean;
  withdrawnAt?: string;
  appliedAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface JobFilters {
  q?: string;
  location?: string;
  isRemote?: boolean;
  salaryMin?: number;
  employmentType?: EmploymentType;
  page?: number;
  limit?: number;
}

export interface PresignedUpload {
  uploadUrl: string;
  publicUrl: string;
  key: string;
}

// types.ts
export interface CloudinaryUploadData {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
  publicId: string;
}
