"use client";

import { useState } from "react";
import Image from "next/image";
import ProfileDropdown from "../components/dashboard/ProfileDropdown";
import LogoutDialog from "../components/dashboard/LogoutDialog";
import logo from "../../../public/dashboard/small-logo.png";

export default function Layout({ user, children }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}

      <header className="bg-[#9FE870] text-[#163300] px-4 py-3 rounded-b-3xl">
        {/* Top Row: Logo, Title, Notifications, Menu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-[#163300]">
            <Image src={logo} alt="SEN Solar Logo" width={50} height={50} />
            </div>
           
            <div className="leading-tight">
              <p className="text-sm font-bold">SEN SOLAR</p>
              <p className="text-xs">Wade Warren</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notification Bell with Badge */}
            <button className="relative p-1" aria-label="Notifications">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                4
              </span>
            </button>

            {/* Hamburger Menu */}
            <button
              className="flex items-center"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              aria-expanded={showProfileDropdown}
              aria-haspopup="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Row: Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-[#163300] text-[#9FE870] rounded-xl p-4 flex flex-col items-center justify-center">
            <span className="text-sm font-semibold">Total Quotations</span>
            <span className="text-4xl font-bold">30</span>
          </div>
          <div className="bg-[#163300] text-[#9FE870] rounded-xl p-4 flex flex-col items-center justify-center">
            <span className="text-sm font-semibold">Total Clients</span>
            <span className="text-4xl font-bold">30</span>
          </div>
        </div>
      </header>

      {/* Profile Dropdown */}
      {showProfileDropdown && (
        <ProfileDropdown
          user={user}
          onClose={() => setShowProfileDropdown(false)}
          onLogout={() => {
            setShowProfileDropdown(false);
            setShowLogoutDialog(true);
          }}
        />
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <LogoutDialog
          onCancel={() => setShowLogoutDialog(false)}
          onLogout={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
            window.location.href = "/pages/login";
          }}
        />
      )}

      {/* Main Content */}
      <main className="p-4">{children}</main>
    </div>
  );
}
