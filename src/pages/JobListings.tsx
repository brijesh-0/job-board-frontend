import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { JobList } from "../components/job/JobList";
import { JobFilters } from "../components/job/JobFilters";
import { Loading } from "../components/common/Loading";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { jobService } from "../services/job.service";
import { Job, JobFilters as JobFiltersType } from "../types";
import toast from "react-hot-toast";

export const JobListings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState<JobFiltersType>({
    q: searchParams.get("q") || undefined,
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { jobs } = await jobService.searchJobs(filters);
      console.log(jobs);
      setJobs(jobs);
    } catch (error) {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters, q: searchQuery || undefined };
    setFilters(newFilters);
    setSearchParams(searchQuery ? { q: searchQuery } : {});
  };

  const handleFilterChange = (newFilters: JobFiltersType) => {
    setFilters(newFilters); // Full replace
  };

  const handleResetFilters = () => {
    const reset: JobFiltersType = { q: filters.q }; // Keep search query if needed
    setFilters(reset);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Jobs</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Search by title, company, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <JobFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Found {jobs.length} jobs
              </div>
              <JobList jobs={jobs} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
