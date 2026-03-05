import { useEffect, useState } from "react";
import { fetchApplicants, type Applicant } from "../api/applicants.api";

export function useApplicants() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplicants()
      .then(setApplicants)
      .catch((e) => setError(e?.message ?? "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  return { applicants, loading, error };
}