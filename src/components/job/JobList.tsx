import React from "react";
import { Job } from "../../types";
import { JobCard } from "./JobCard";
import { EmptyState } from "../common/EmptyState";
import { Button } from "../common/Button";

interface JobListProps {
  jobs: Job[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  onLoadMore,
  hasMore,
  loading,
}) => {
  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No jobs found"
        description="Try adjusting your filters or search criteria"
      />
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="mt-8 text-center">
          <Button onClick={onLoadMore} loading={loading} variant="secondary">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
