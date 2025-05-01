"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Search } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function PackageDetails({ formData, onChange }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const packages = [
    "5kW - GoodWe",
    "5kW - Huawei",
    "10kW - GoodWe",
    "10kW - Huawei",
    "20kW - GoodWe"
  ];

  const filteredPackages = packages.filter(pkg => 
    pkg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Select package and close popover
  const selectPackage = (pkg) => {
    onChange("systemType", pkg);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              role="combobox" 
              aria-expanded={open}
              className="w-full justify-between font-normal border p-3 bg-white rounded-md text-gray-600"
            >
              {formData.systemType || "Select Package"}
              <span className="text-gray-400">⌄</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-full max-w-[322px]">
            <div className="flex items-center p-3 border-b">
              <Search className="h-4 w-4 mr-2 text-gray-500" />
              <Input
                placeholder="Type a Package for search..."
                className="border-0 focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg}
                  className="px-3 py-2 cursor-pointer"
                  onClick={() => selectPackage(pkg)}
                >
                  {pkg}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <Input
          placeholder="Capacity"
          className="bg-gray-200 p-3 text-gray-500"
          value={formData.capacity}
          onChange={(e) => onChange("capacity", e.target.value)}
        />
      </div>
      
      <div>
        <Input
          placeholder="Panel Count"
          className="bg-gray-200 p-3"
          value={formData.panelCount}
          onChange={(e) => onChange("panelCount", e.target.value)}
        />
      </div>
      
      <div>
        <Input
          placeholder="Inverter Code"
          className="bg-gray-200 p-3"
          value={formData.inverterCode}
          onChange={(e) => onChange("inverterCode", e.target.value)}
        />
      </div>
      
      <div>
        <Input
          placeholder="PV Output"
          className="bg-gray-200 p-3"
          value={formData.pvOutput}
          onChange={(e) => onChange("pvOutput", e.target.value)}
        />
      </div>
      
      <div className="relative">
        <Input
          placeholder="Rs. Amount"
          className="bg-gray-200 p-3 pr-16"
          value={formData.amount}
          onChange={(e) => onChange("amount", e.target.value)}
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
          LKR
        </div>
      </div>
    </div>
  );
}