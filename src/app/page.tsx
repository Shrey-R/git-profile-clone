'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [username, setUsername] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const updated = [
        username.trim(),
        ...recentSearches.filter(s => s !== username.trim())
      ].slice(0, 5);
      
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      router.push(`/${username.trim()}`);
    }
  };

  const handleProfileClick = (profileName: string) => {
    const updated = [
      profileName,
      ...recentSearches.filter(s => s !== profileName)
    ].slice(0, 5);
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const popularProfiles = ['torvalds', 'gaearon', 'tj', 'sindresorhus'];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            GitHub Profile Explorer
          </h1>
          <p className="text-gray-600 text-lg">
            Discover and explore GitHub profiles with ease
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
            />
            <button
              type="submit"
              disabled={!username.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </form>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mb-10 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Searches
              </h2>
              <button
                onClick={clearRecentSearches}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((profile) => (
                <Link
                  key={profile}
                  href={`/${profile}`}
                  onClick={() => handleProfileClick(profile)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors border border-gray-200 text-sm font-medium"
                >
                  {profile}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Popular Profiles */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Popular Profiles
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularProfiles.map((profile) => (
              <Link
                key={profile}
                href={`/${profile}`}
                onClick={() => handleProfileClick(profile)}
                className="flex items-center px-4 py-3 bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 rounded-lg transition-all border border-gray-200 hover:border-gray-300 hover:shadow-md group"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 group-hover:bg-gray-300 transition-colors"></div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {profile}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Built by 💁🏻 Shrey</p>
        </div>
      </div>
    </div>
  );
}
