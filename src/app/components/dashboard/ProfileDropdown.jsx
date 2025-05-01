"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function ProfileDropdown({ user, onClose, onLogout }) {
  return (
    <div className="absolute right-0 left-0 top-16 mt-1 z-50">
      <div className="bg-white rounded-md shadow-lg mx-4 overflow-hidden border border-gray-200">
        <div className="p-4 flex items-center space-x-3 border-b border-gray-100">
          <Avatar>
            <AvatarImage src="/avatar.png" alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="py-1">
          <button
            className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profile</span>
          </button>

          <button
            className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100"
            onClick={onLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log out</span>
          </button>
        </div>
      </div>

      
    </div>
  );
}
