import { useState, useEffect } from "react";
import { Job, JobFilters } from "../types";
import { jobService } from "../services/job.service";
import { handleApiError } from "../services/api";

export const useJobs = (filters: JobFilters = {}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { jobs, meta } = await jobService.searchJobs(filters);
        setJobs(jobs);
        setMeta(meta);
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [JSON.stringify(filters)]);

  return { jobs, loading, error, meta };
};
