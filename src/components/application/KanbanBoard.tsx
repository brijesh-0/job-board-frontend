import React from "react";
import { Application, ApplicationStatus } from "../../types";
import { ApplicationCard } from "./ApplicationCard";
import { EmptyState } from "../common/EmptyState";

interface KanbanBoardProps {
  applications: Application[];
}

const columns: { status: ApplicationStatus; label: string; color: string }[] = [
  { status: "Applied", label: "Applied", color: "bg-blue-50 border-blue-200" },
  {
    status: "Screening",
    label: "Screening",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    status: "Interview",
    label: "Interview",
    color: "bg-purple-50 border-purple-200",
  },
  { status: "Offer", label: "Offer", color: "bg-green-50 border-green-200" },
  { status: "Rejected", label: "Rejected", color: "bg-red-50 border-red-200" },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ applications }) => {
  const getApplicationsByStatus = (status: ApplicationStatus) => {
    return applications.filter(
      (app) => app.status === status && !app.isWithdrawn,
    );
  };

  if (applications.length === 0) {
    return (
      <EmptyState
        title="No applications yet"
        description="Start applying to jobs to track your applications here"
      />
    );
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="inline-flex space-x-4 min-w-full">
        {columns.map((column) => {
          const columnApplications = getApplicationsByStatus(column.status);
          return (
            <div key={column.status} className="flex-1 min-w-[280px]">
              <div
                className={`rounded-lg border-2 ${column.color} p-4 h-full min-h-[400px]`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    {column.label}
                  </h3>
                  <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {columnApplications.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {columnApplications.map((application) => (
                    <ApplicationCard
                      key={application._id}
                      application={application}
                    />
                  ))}
                  {columnApplications.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-8">
                      No applications
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
