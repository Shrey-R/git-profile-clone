'use client';

import { useSearchParams } from 'next/navigation';
import { GitHubUser } from '@/types/github';
import OverviewContent from './content/OverviewContent';
import RepositoriesContent from './content/RepositoriesContent';
import ProjectsContent from './content/ProjectsContent';
import PackagesContent from './content/PackagesContent';
import StarsContent from './content/StarsContent';

type TabType = 'overview' | 'repositories' | 'projects' | 'packages' | 'stars';

interface TabContentProps {
  user: GitHubUser;
}

export default function TabContent({ user }: TabContentProps) {
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabType) || 'overview';

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent user={user} />;
      case 'repositories':
        return <RepositoriesContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'packages':
        return <PackagesContent />;
      case 'stars':
        return <StarsContent />;
      default:
        return <OverviewContent user={user} />;
    }
  };

  return <div>{renderContent()}</div>;
}

