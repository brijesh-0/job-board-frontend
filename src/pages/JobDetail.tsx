import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobDetails } from "../components/job/JobDetails";
import { ApplyModal } from "../components/application/ApplyModal";
import { Loading } from "../components/common/Loading";
import { useAuth } from "../hooks/useAuth";
import { jobService } from "../services/job.service";
import { applicationService } from "../services/application.service";
import { Job } from "../types";
import toast from "react-hot-toast";

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const data = await jobService.getJob(id!);
      setJob(data);
    } catch (error) {
      toast.error("Failed to load job details");
      navigate("/jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!user) {
      toast.error("Please login to apply");
      navigate("/login");
      return;
    }
    if (user.role !== "candidate") {
      toast.error("Only candidates can apply to jobs");
      return;
    }
    setShowApplyModal(true);
  };

  const handleSubmitApplication = async (
    resumeUrl: string,
    coverLetter: string,
  ) => {
    try {
      await applicationService.createApplication({
        jobId: id!,
        resumeUrl,
        coverLetter,
      });
      setShowApplyModal(false);
    } catch (error: any) {
      throw error;
    }
  };

  if (loading) return <Loading />;
  if (!job) return null;

  const canApply = user?.role === "candidate" && job.status === "open";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
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
        Back
      </button>

      <JobDetails job={job} onApply={handleApply} canApply={canApply} />

      <ApplyModal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        onSubmit={handleSubmitApplication}
        jobTitle={job.title}
      />
    </div>
  );
};
