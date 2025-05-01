"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/app/components/Layout";
import QuotationList from "@/app/components/dashboard/QuotationList";
import MobileOnly from "@/app/components/MobileOnly";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");

    if (!isLoggedIn || !userData) {
      router.push("/pages/login");
      return;
    }

    setUser(JSON.parse(userData));
    setIsLoading(false);
  }, [router]);

  // Mock data for quotations
  const quotations = [
    {
      id: "000927",
      customer: "Jenny Wilson",
      date: "Dec 10, 2024",
      system: "5kW",
      brand: "GoodWe",
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: "000910",
      customer: "Esther Howard",
      date: "Dec 02, 2024",
      system: "10kW",
      brand: "Huawei",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "000902",
      customer: "Jenny Wilson",
      date: "Dec 01, 2024",
      system: "5kW",
      brand: "GoodWe",
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: "000896",
      customer: "Robert Fox",
      date: "Nov 28, 2024",
      system: "20kW",
      brand: "GoodWe",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "000895",
      customer: "Devon Lane",
      date: "Nov 26, 2024",
      system: "50kW",
      brand: "GoodWe",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <MobileOnly>
      {user && (
        <Layout user={user}>
          <div className="space-y-4 pb-16">
            <button className="w-full bg-[#9FE870] text-[#163300] font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 border border-green-200">
              <span className="text-lg">+</span>
              <span>Create New Quotation</span>
            </button>
            <div className="border-1 border-gray-300 "></div>

            <div className="mt-6 flex flex-col items-center justify-center text-[#163300]">
              <h2 className="text-lg font-semibold">Created Quotations</h2>
              <p className="text-sm mb-4">December 2024</p>
            </div>
            <QuotationList quotations={quotations} />
          </div>
        </Layout>
      )}
    </MobileOnly>
  );
}
