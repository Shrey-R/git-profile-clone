const ProjectsContent = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Projects</h2>
      <span className="text-sm text-gray-500">5 projects</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Project Board {i}</h3>
          <p className="text-sm text-gray-600 mb-3">
            Track progress and manage tasks
          </p>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
              {Math.floor(Math.random() * 10)} Open
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
              {Math.floor(Math.random() * 20)} Closed
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectsContent;

