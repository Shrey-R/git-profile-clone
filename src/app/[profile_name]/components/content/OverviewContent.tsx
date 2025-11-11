import { GitHubUser } from '@/types/github';
import ProfileSection from './overview/ProfileSection';
import PopularRepositories from './overview/PopularRepositories';
import ContributionsSection from './overview/ContributionsSection';

interface OverviewContentProps {
  user: GitHubUser;
}

const OverviewContent = ({ user }: OverviewContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <ProfileSection user={user} />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <PopularRepositories user={user} />
          <ContributionsSection user={user} />
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;

