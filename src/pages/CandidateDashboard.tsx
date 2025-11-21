import React from "react";
import { KanbanBoard } from "../components/application/KanbanBoard";
import { Loading } from "../components/common/Loading";
import { useApplications } from "../hooks/useApplications";

export const CandidateDashboard: React.FC = () => {
  const { applications, loading } = useApplications();

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2">
          Track the status of your job applications
        </p>
      </div>

      <KanbanBoard applications={applications} />
    </div>
  );
};
