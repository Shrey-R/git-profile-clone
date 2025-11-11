'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { BookOpen, Package, Star, FolderGit2, LayoutGrid } from 'lucide-react';

type TabType = 'overview' | 'repositories' | 'projects' | 'packages' | 'stars';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'repositories', label: 'Repositories', icon: <FolderGit2 className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'packages', label: 'Packages', icon: <Package className="w-4 h-4" /> },
  { id: 'stars', label: 'Stars', icon: <Star className="w-4 h-4" /> },
];

export default function TabNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabType) || 'overview';

  const handleTabChange = (tabId: TabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full overflow-x-auto">
        <nav className="flex space-x-2 md:space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                flex items-center gap-2 py-4 px-2 md:px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
              title={tab.label}
            >
              {tab.icon}
              {/* Hide label on mobile, show on md and up */}
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
    </div>
  );
}

