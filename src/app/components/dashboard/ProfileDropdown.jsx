"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User, LogOut } from "lucide-react";

export default function ProfileDropdown({ user, onClose, onLogout }) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/pages/profile");
    onClose();
  };

  return (
    <div className="absolute right-0 left-0 top-16 mt-1 z-50">
      <div className="bg-white rounded-md shadow-lg mx-4 overflow-hidden border border-gray-300">
        <div className="p-4 flex items-center space-x-3 border-b border-gray-100">
          <Avatar>
            <AvatarImage src="/avatar.png" alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-[#163300]">{user.name}</p>
            <p className="text-sm text-[#163300]">{user.email}</p>
          </div>
        </div>

        <div className="py-1 text-[#163300]">
          <button
            className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100"
            onClick={handleProfileClick}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </button>

          <button
            className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
