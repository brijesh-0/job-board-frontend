import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApplicationTable } from "../components/application/ApplicationTable";
import { Loading } from "../components/common/Loading";
import { Application, ApplicationStatus } from "../types";
import { jobService } from "../services/job.service";
import { applicationService } from "../services/application.service";
import toast from "react-hot-toast";

export const ApplicationManagement: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      fetchData();
    }
  }, [jobId]);

  const fetchData = async () => {
    try {
      const [job, { applications: apps }] = await Promise.all([
        jobService.getJob(jobId!),
        jobService.getJobApplications(jobId!),
      ]);
      setJobTitle(job.title);
      setApplications(apps);
    } catch (error) {
      toast.error("Failed to load applications");
      navigate("/employer/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    applicationId: string,
    newStatus: ApplicationStatus,
  ) => {
    try {
      await applicationService.updateApplicationStatus(
        applicationId,
        newStatus,
      );
      toast.success("Application status updated");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update status");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/employer/dashboard")}
        className="mb-6 text-primary-600 hover:text-primary-700 flex items-center"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Applications for {jobTitle}
        </h1>
        <p className="text-gray-600 mt-2">
          {applications.length}{" "}
          {applications.length === 1 ? "application" : "applications"} received
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <p className="text-gray-500">No applications received yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <ApplicationTable
            applications={applications}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      )}
    </div>
  );
};
