"use client";

import { Button } from "../ui/button";

export default function LogoutDialog({ onCancel, onLogout }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg text-[#163300] font-medium">Confirm Logout</h2>
        <p className="text-[#163300] mt-2 mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-[#163300]"
          >
            Cancel
          </Button>

          <Button onClick={onLogout} className="bg-[#9FE870] text-[#163300]">
            Yes, Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
