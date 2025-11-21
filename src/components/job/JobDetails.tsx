import React from "react";
import { Job } from "../../types";
import {
  formatSalary,
  formatDate,
  formatEmploymentType,
} from "../../utils/formatters";

interface JobDetailsProps {
  job: Job;
  onApply?: () => void;
  canApply?: boolean;
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  job,
  onApply,
  canApply,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{job.company.name}</p>
        </div>
        {job.company.logoUrl && (
          <img
            src={job.company.logoUrl}
            alt={job.company.name}
            className="h-16 w-16 rounded object-cover"
          />
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          📍 {job.location}
        </span>
        {job.isRemote && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            💻 Remote
          </span>
        )}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {formatEmploymentType(job.employmentType)}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Salary Range</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Posted</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatDate(job.createdAt)}
          </p>
        </div>
      </div>

      {canApply && onApply && (
        <div className="mt-8">
          <button
            onClick={onApply}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Apply for this Position
          </button>
        </div>
      )}

      <div className="mt-8 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
          {job.description}
        </div>
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="mt-8 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
