import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { JobCardWithActions } from "../components/job/JobCardWithActions";
import { Loading } from "../components/common/Loading";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";
import { jobService } from "../services/job.service";
import { Job } from "../types";
import toast from "react-hot-toast";

export const EmployerDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { jobs } = await jobService.getEmployerJobs();
      setJobs(jobs);
    } catch (error) {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleJobDeleted = () => {
    fetchJobs(); // Refresh the list
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Job Postings</h1>
          <p className="text-gray-600 mt-2">
            Manage your job listings and applications
          </p>
        </div>
        <Link to="/employer/jobs/new">
          <Button>
            <svg
              className="w-5 h-5 mr-2 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Post New Job
          </Button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          title="No jobs posted yet"
          description="Create your first job posting to start receiving applications"
          action={
            <Link to="/employer/jobs/new">
              <Button>Post Your First Job</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCardWithActions
              key={job._id}
              job={job}
              onDelete={handleJobDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};
