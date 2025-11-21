import React from "react";
import { Application, ApplicationStatus, User } from "../../types";
import { formatDate } from "../../utils/formatters";
import { Button } from "../common/Button";

interface ApplicationTableProps {
  applications: Application[];
  onStatusUpdate: (applicationId: string, newStatus: ApplicationStatus) => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  onStatusUpdate,
}) => {
  const statusOptions: ApplicationStatus[] = [
    "Applied",
    "Screening",
    "Interview",
    "Offer",
    "Rejected",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Candidate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applied
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resume
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((application) => {
            const candidate = application.candidateId as User;
            return (
              <tr key={application._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {candidate.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(application.appliedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      application.status === "Offer"
                        ? "bg-green-100 text-green-800"
                        : application.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : application.status === "Interview"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {application.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a
                    href={application.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-900"
                  >
                    View Resume
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    value={application.status}
                    onChange={(e) =>
                      onStatusUpdate(
                        application._id,
                        e.target.value as ApplicationStatus,
                      )
                    }
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
