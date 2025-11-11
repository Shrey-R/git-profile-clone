'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GitHubUser } from '@/types/github';

interface UseGitHubUserReturn {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
}

export function useGitHubUser(): UseGitHubUserReturn {
  const pathname = usePathname();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const username = pathname.split('/')[1];

    if (!username || username === '') {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('User not found');
          }
          throw new Error('Failed to fetch user data');
        }

        const data: GitHubUser = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [pathname]);

  return { user, loading, error };
}

