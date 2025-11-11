'use client';

import { Menu, Search } from 'lucide-react';

interface TopbarProps {
  profileName: string;
}

export default function Topbar({ profileName }: TopbarProps) {
  return (
      <div className="py-3 flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Button */}
          <button
            className="p-2 hover:bg-gray-800 rounded-md transition-colors border border-gray-700"
            onClick={() => {
            }}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* GitHub Logo */}
          <div className="flex items-center gap-2">
            <svg
              height="32"
              width="32"
              viewBox="0 0 16 16"
              fill="black"
              className="cursor-pointer"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            <span className="text-base font-semibold">{profileName}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="absolute right-2 top-1/2 translate-y-1/2">
              <Search className="w-4 h-4 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Type / to search"
              className="bg-gray-100 placeholder-gray-400 rounded-md px-3 py-1.5 pr-8 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-700 border border-gray-400"
            />
            
          </div>

          {/* Profile Icon */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all">
            {profileName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
  );
}

