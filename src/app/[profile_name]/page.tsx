'use client';

import { use } from 'react';
import Header from './components/header';
import ProfileContent from './components/ProfileContent';
import { useGitHubUser } from '@/hooks/useGitHubUser';

interface ProfilePageProps {
  params: Promise<{
    profile_name: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { profile_name } = use(params);
  const { user, loading, error } = useGitHubUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">User not found</h2>
          <p className="text-gray-600">Please check the username and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Full Width Header with Topbar and Tabs */}
      <Header user={user} />

      {/* Profile Content with GitHub API Data */}
      <ProfileContent user={user} />
    </div>
  );
}

