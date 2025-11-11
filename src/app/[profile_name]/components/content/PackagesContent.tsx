import { Package } from 'lucide-react';

const PackagesContent = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Packages</h2>
      <span className="text-sm text-gray-500">8 packages</span>
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Package className="w-8 h-8 text-orange-500" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">@username/package-{i}</h3>
              <p className="text-sm text-gray-600 mb-2">
                A useful npm package for developers
              </p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>v1.{i}.0</span>
                <span>📦 {Math.floor(Math.random() * 1000)} downloads</span>
                <span>Published 1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PackagesContent;

