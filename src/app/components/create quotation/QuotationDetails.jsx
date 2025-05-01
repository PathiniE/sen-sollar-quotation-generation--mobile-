"use client";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

export default function QuotationDetails({ formData, onChange }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="quotation-id">Quotation ID</Label>
        <Input
          id="quotation-id"
          value={formData.quotationId}
          onChange={(e) => onChange("quotationId", e.target.value)}
          className="bg-gray-50"
          readOnly
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="quotation-date">Quotation Date</Label>
        <Input
          id="quotation-date"
          type="date"
          value={formData.quotationDate}
          onChange={(e) => onChange("quotationDate", e.target.value)}
          className="bg-gray-50"
          readOnly
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="valid-date">Valid till Quotation Date</Label>
        <Input
          id="valid-date"
          type="date"
          value={formData.validDate}
          onChange={(e) => onChange("validDate", e.target.value)}
          className="bg-gray-50"
          readOnly
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="custom-label">Custom Quotation Label</Label>
        <Input
          id="custom-label"
          type="text"
          value={formData.customLabel}
          onChange={(e) => onChange("customLabel", e.target.value)}
          placeholder="Optional"
        />
      </div>
    </div>
  );
}