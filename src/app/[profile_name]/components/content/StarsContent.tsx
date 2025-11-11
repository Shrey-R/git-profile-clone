import { Star } from 'lucide-react';

const StarsContent = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Starred Repositories</h2>
      <span className="text-sm text-gray-500">142 stars</span>
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <h3 className="font-semibold text-blue-600">
                  user/starred-repo-{i}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                An interesting repository that caught your attention
              </p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  JavaScript
                </span>
                <span>⭐ {Math.floor(Math.random() * 5000)}</span>
                <span>Starred 1 month ago</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StarsContent;

