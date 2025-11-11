'use client';

import { useState, useEffect } from 'react';
import { GitHubRepository } from '@/types/repository';

interface UseGitHubRepositoriesReturn {
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
}

export function useGitHubRepositories(reposUrl: string): UseGitHubRepositoriesReturn {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reposUrl) {
      setLoading(false);
      return;
    }

    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);

        const urlWithParams = `${reposUrl}`;
        const response = await fetch(urlWithParams);

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data: GitHubRepository[] = await response.json();
        
        setRepositories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setRepositories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [reposUrl]);

  return { repositories, loading, error };
}

