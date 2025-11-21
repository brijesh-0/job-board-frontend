import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Job } from "../../types";
import {
  formatSalary,
  formatRelativeTime,
  formatEmploymentType,
} from "../../utils/formatters";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";
import toast from "react-hot-toast";
import { jobService } from "../../services/job.service";

interface JobCardWithActionsProps {
  job: Job;
  onDelete?: () => void;
}

export const JobCardWithActions: React.FC<JobCardWithActionsProps> = ({
  job,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/employer/jobs/${job._id}/edit`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await jobService.deleteJob(job._id);
      toast.success("Job closed successfully");
      setShowDeleteModal(false);
      if (onDelete) onDelete();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to delete job");
    } finally {
      setDeleting(false);
    }
  };

  const statusBadge =
    job.status === "closed" ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Closed
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Open
      </span>
    );

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <Link
            to={`/employer/jobs/${job._id}/applications`}
            className="flex-1"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{job.company.name}</p>
              </div>
              {statusBadge}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {job.location}
              </span>
              {job.isRemote && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Remote
                </span>
              )}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {formatEmploymentType(job.employmentType)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-900">
                {formatSalary(
                  job.salary.min,
                  job.salary.max,
                  job.salary.currency,
                )}
              </span>
              <span className="text-gray-500">
                Posted {formatRelativeTime(job.createdAt)}
              </span>
            </div>

            {job.applicantCount !== undefined && (
              <div className="mt-2 text-xs text-gray-500">
                {job.applicantCount}{" "}
                {job.applicantCount === 1 ? "applicant" : "applicants"}
              </div>
            )}
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t flex space-x-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleEdit}
            className="flex-1"
          >
            <svg
              className="w-4 h-4 mr-1 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteClick}
            disabled={job.status === "closed"}
            className="flex-1"
          >
            <svg
              className="w-4 h-4 mr-1 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            {job.status === "closed" ? "Closed" : "Close Job"}
          </Button>
          <Link to={`/employer/jobs/${job._id}/applications`}>
            <Button size="sm">
              View Applications
              <svg
                className="w-4 h-4 ml-1 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Close Job Posting"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to close this job posting? This will prevent
            new applications, but existing applications will remain accessible.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> You can reopen this job later by editing
              it.
            </p>
          </div>
          <div className="flex space-x-3 pt-4">
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              loading={deleting}
              className="flex-1"
            >
              Yes, Close Job
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              disabled={deleting}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
