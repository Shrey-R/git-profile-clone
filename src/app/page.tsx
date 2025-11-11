import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-white">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Git Profile Clone</h1>
        <p className="text-gray-600 mb-8">
          Enter a profile name in the URL to view their profile
        </p>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Example Profiles:</h2>
          <div className="flex flex-col space-y-2">
            <Link 
              href="/Shrey-R" 
              className="text-blue-600 hover:underline"
            >
              → View profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
