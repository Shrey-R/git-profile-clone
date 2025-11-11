const RepositoriesContent = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Repositories</h2>
      <span className="text-sm text-gray-500">24 results</span>
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-blue-600 mb-1">
                awesome-repository-{i}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                This is a sample repository description that explains what the project does
              </p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  TypeScript
                </span>
                <span>⭐ {Math.floor(Math.random() * 1000)}</span>
                <span>🔱 {Math.floor(Math.random() * 100)}</span>
                <span>Updated 2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RepositoriesContent;

