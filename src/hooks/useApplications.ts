import { useState, useEffect } from "react";
import { Application } from "../types";
import { applicationService } from "../services/application.service";
import { handleApiError } from "../services/api";

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getCandidateApplications();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return { applications, loading, error, refetch: fetchApplications };
};
