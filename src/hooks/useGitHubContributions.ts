'use client';

import { useState, useEffect } from 'react';
import { ContributionCalendar } from '@/types/contributions';

interface UseGitHubContributionsReturn {
  contributions: ContributionCalendar | null;
  loading: boolean;
  error: string | null;
}

export function useGitHubContributions(username: string): UseGitHubContributionsReturn {
  const [contributions, setContributions] = useState<ContributionCalendar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/contributions/${username}`);

        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setContributions(data.data.user.contributionsCollection.contributionCalendar);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setContributions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  return { contributions, loading, error };
}

