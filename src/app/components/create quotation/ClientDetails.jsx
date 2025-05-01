"use client";

import { Input } from "@/app/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export default function ClientDetails({ formData, onChange }) {
  return (
    <div className="space-y-4">
      <Input
        id="client-name"
        type="text"
        placeholder="Client Name"
        value={formData.clientName}
        onChange={(e) => onChange("clientName", e.target.value)}
        required
      />

      <Input
        id="address"
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => onChange("address", e.target.value)}
        required
      />

      <Input
        id="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => onChange("email", e.target.value)}
        required
      />

      <div className=" flex items-center border border-gray-300 rounded-md overflow-hidden">
        
          <Select
            value={formData.countryCode}
            onValueChange={(value) => onChange("countryCode", value)}
          >
            <SelectTrigger className="w-24 border-none focus:ring-0 focus:outline-none">
              <SelectValue placeholder="+94" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+94">+94</SelectItem>
              <SelectItem value="+1">+1</SelectItem>
              <SelectItem value="+44">+44</SelectItem>
              <SelectItem value="+91">+91</SelectItem>
            </SelectContent>
          </Select>
          <Input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            className="flex-1 border-none focus:ring-0 focus:outline-none"
            required
          />
        
      </div>
    </div>
  );
}
