import React from "react";
import { Application, Job } from "../../types";
import { formatRelativeTime } from "../../utils/formatters";

interface ApplicationCardProps {
  application: Application;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
}) => {
  const job = application.jobId as Job;

  const statusColors = {
    Applied: "bg-blue-100 text-blue-800",
    Screening: "bg-yellow-100 text-yellow-800",
    Interview: "bg-purple-100 text-purple-800",
    Offer: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-gray-900">{job.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{job.company.name}</p>
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusColors[application.status]
          }`}
        >
          {application.status}
        </span>
        <span className="text-xs text-gray-500">
          {formatRelativeTime(application.appliedAt)}
        </span>
      </div>
    </div>
  );
};
