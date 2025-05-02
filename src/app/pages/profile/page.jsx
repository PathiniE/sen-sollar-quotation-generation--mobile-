"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { ArrowLeft, Camera, Upload, Plus, PenLine, Check } from "lucide-react";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({});

  // Add keyframe animation for fade-in effect
  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");

    if (!isLoggedIn || !userData) {
      router.push("/pages/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser({
      ...parsedUser,
      firstName: parsedUser.name?.split(" ")[0] || "Wade",
      lastName: parsedUser.name?.split(" ")[1] || "Warren",
      phoneNumber: parsedUser.phone || "+94 123456789",
      joinedDate: parsedUser.joinedDate || "Dec 20, 2024",
      lastLogin: parsedUser.lastLogin || "Dec 01, 2024",
    });

    setFormData({
      firstName: parsedUser.name?.split(" ")[0] || "Wade",
      lastName: parsedUser.name?.split(" ")[1] || "Warren",
      email: parsedUser.email || "wadewarren@gmail.com",
      phoneNumber: parsedUser.phone || "+94 123456789",
    });

    setIsLoading(false);
  }, [router]);

  const handleGoBack = () => {
    router.push("/pages/dashboard");
  };

  const handleSave = () => {
    // Update the user data
    const updatedUser = {
      ...user,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phoneNumber,
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    setUser(updatedUser);

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setIsEditSheetOpen(false);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Photo Upload Dialog Component
  const PhotoUploadDialog = ({ children }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="w-64 p-0 rounded-lg">
          <DialogTitle className="sr-only">Upload Profile Photo</DialogTitle>
          <div className="p-4 space-y-3">
            <button className="w-full py-2 flex items-center gap-2 text-[#163300] hover:bg-gray-100 rounded">
              <Camera size={18} />
              <span>Use Camera</span>
            </button>
            <button className="w-full py-2 flex items-center gap-2 text-[#163300] hover:bg-gray-100 rounded">
              <Upload size={18} />
              <span>Upload Photo</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-[#9FE870] px-3 py-4 h-50 flex items-center rounded-b-3xl">
        <button onClick={handleGoBack} className="text-[#163300]">
          <ArrowLeft size={26} />
        </button>
        <h1 className="ml-4 text-2xl font-medium text-[#163300]">Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="p-4 flex flex-col">
        {/* Avatar with User Info */}
        <div className="flex items-start mb-6 mt-2">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-[#9FE870]">
              <AvatarImage src="/avatar.png" alt="Profile" />
              <AvatarFallback className="bg-[#9FE870] text-[#163300] text-xl">
                {user?.firstName?.[0] || ""}
                {user?.lastName?.[0] || ""}
              </AvatarFallback>
            </Avatar>
            <PhotoUploadDialog>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-300">
                <Plus size={16} className="text-[#163300]" />
              </button>
            </PhotoUploadDialog>
          </div>

          {/* User Info */}
          <div className="ml-4 flex-1 flex flex-col">
            <h2 className="font-semibold text-xl text-[#163300]">
              {user?.name || "Wade Warren"}
            </h2>
            <div className="mt-1">
              <p className="text-sm text-[#163300]/70">
                Joined login: {user?.joinedDate || "Dec 20, 2024"}
              </p>
              <p className="text-sm text-[#163300]/70">
                Last login: {user?.lastLogin || "Dec 01, 2024"}
              </p>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-4 mb-6">
          {/* Edit Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-black border-0 no-underline"
              onClick={() => setIsEditSheetOpen(true)}
            >
              <PenLine size={16} />
              <span className="underline text-lg">Edit</span>
            </Button>
          </div>
          <div>
            <label className="text-lg text-black">First Name</label>
            <div className="bg-gray-200 p-3 rounded-md mt-1 text-[#163300]">
              {user?.firstName || "Wade"}
            </div>
          </div>

          <div>
            <label className="text-lg text-black">Last Name</label>
            <div className="bg-gray-200 p-3 rounded-md mt-1 text-[#163300]">
              {user?.lastName || "Warren"}
            </div>
          </div>

          <div>
            <label className="text-lg text-black">Email</label>
            <div className="bg-gray-200 p-3 rounded-md mt-1 text-[#163300]">
              {user?.email || "wadewarren@gmail.com"}
            </div>
          </div>

          <div>
            <label className="text-lg text-black">Phone number</label>
            <div className="bg-gray-200 p-3 rounded-md mt-1 text-[#163300]">
              {user?.phoneNumber || "+94 123456789"}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent side="bottom" className="h-[65vh] rounded-t-xl p-0">
          <SheetHeader className="p-4 relative">
            <div className="flex justify-center relative items-center">
              <SheetTitle className="text-[#163300] absolute left-1/2 transform -translate-x-1/2 text-lg">
                Edit Profile
              </SheetTitle>
              <button
                onClick={() => setIsEditSheetOpen(false)}
                className="text-[#163300] font-semibold ml-auto"
              >
                ✕
              </button>
            </div>
          </SheetHeader>
          <div className="p-4 space-y-6">
            <div>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
            <div>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="flex gap-2">
              <Input className="w-16" value="+94" disabled />
              <Input
                name="phoneNumber"
                value={formData.phoneNumber.replace("+94 ", "")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber: "+94 " + e.target.value,
                  })
                }
                placeholder="Phone Number"
                type="tel"
              />
            </div>
            <Button
              className="w-full h-12 bg-[#9FE870] text-[#163300] mt-16"
              onClick={handleSave}
            >
              <span className="text-lg">Save</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Success Alert */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <Alert className="bg-white border-green-200 shadow-lg max-w-xs w-full animate-fade-in">
            <Check className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-lg text-[#163300]">Success!</AlertTitle>
            <AlertDescription className="text-[#163300]">
              Details successfully Changed!
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
