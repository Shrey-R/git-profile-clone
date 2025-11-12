'use client';

import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { GitHubUser } from '@/types/github';
import Image from 'next/image';
import Link from 'next/link';

interface TopbarWithDataProps {
  user: GitHubUser;
}

export default function TopbarWithData({ user }: TopbarWithDataProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="py-3">
      {/* Mobile/Small Tablet Layout (< md / < 768px) - Toggleable search */}
      <div className="md:hidden">
        {/* Top Row: Menu, Logo, Search Icon, Profile */}
        <div className="flex items-center justify-between">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-200 rounded-md transition-colors border border-gray-400 shrink-0"
              onClick={() => {
                // TODO: Implement menu functionality
              }}
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
            <Link href='/'>
              <svg
                height="32"
                width="32"
                viewBox="0 0 16 16"
                fill="black"
                className="cursor-pointer shrink-0"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
              </Link>
              {user && (
                <span className="text-base font-semibold truncate hidden sm:inline">{user.login}</span>
              )}
            </div>
          </div>

          {/* Right: Search Icon + Profile Icon */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors shrink-0"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {user && (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all shrink-0">
                <Image
                  src={user.avatar_url}
                  alt={user.login}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Centered Floating Search - Show only when open */}
        {isSearchOpen && (
          <div className="mt-3 flex justify-center animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="relative w-[80%]">
              <input
                type="text"
                placeholder="Type / to search"
                className="w-full bg-white placeholder-gray-500 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 border border-gray-300 shadow-lg"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tablet/Desktop Layout (≥ md / ≥ 768px) - Always visible search */}
      <div className="hidden md:flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Menu Button */}
          <button
            className="p-2 hover:bg-gray-200 rounded-md transition-colors border border-gray-400 shrink-0"
            onClick={() => {
              // TODO: Implement menu functionality
            }}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* GitHub Logo */}
          <div className="flex items-center gap-2 min-w-0">
            <Link href="/">
              <svg
                height="32"
                width="32"
                viewBox="0 0 16 16"
                fill="black"
                className="cursor-pointer shrink-0"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
            </Link>
            {user && (
              <span className="text-base font-semibold truncate">{user.login}</span>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Type / to search"
              className="bg-gray-100 placeholder-gray-400 rounded-md px-3 py-1.5 pr-8 text-sm w-48 xl:w-64 focus:outline-none focus:ring-1 focus:ring-gray-700 border border-gray-400"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Profile Icon */}
          {user && (
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all shrink-0">
              <Image
                src={user.avatar_url}
                alt={user.login}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

