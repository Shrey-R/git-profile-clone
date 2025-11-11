'use client';

import { GitHubUser } from '@/types/github';
import TabContent from './TabContent';

interface ProfileContentProps {
  user: GitHubUser;
}

export default function ProfileContent({ user }: ProfileContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <TabContent user={user} />
    </div>
  );
}

