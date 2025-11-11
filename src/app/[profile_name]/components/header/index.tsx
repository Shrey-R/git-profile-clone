'use client';

import TopbarWithData from './TopbarWithData';
import TabNavigation from './TabNavigation';
import { GitHubUser } from '@/types/github';

interface HeaderProps {
  user: GitHubUser;
}

export default function Header({ user }: HeaderProps) {
  return (
    <div className="w-full bg-gray-100 border-b-2 border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <TopbarWithData user={user} />
        </div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <TabNavigation />
        </div>
    </div>
  );
}

