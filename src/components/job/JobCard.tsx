import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Job } from "../../types";
import { AuthContext } from "../../context/AuthContext";
import {
  formatSalary,
  formatRelativeTime,
  formatEmploymentType,
} from "../../utils/formatters";

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link to={`/jobs/${job._id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{job.company.name}</p>
          </div>
          {job.company.logoUrl && (
            <img
              src={job.company.logoUrl}
              alt={job.company.name}
              className="h-12 w-12 rounded object-cover"
            />
          )}
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
            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
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
      </div>
    </Link>
  );
};
