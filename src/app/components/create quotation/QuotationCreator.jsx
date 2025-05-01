"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { format, addMonths } from "date-fns";

// Import shadcn components
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/app/components/ui/sheet";

// Import step components
import QuotationDetails from "./QuotationDetails";
import ClientDetails from "./ClientDetails";
import PackageDetails from "./PackageDetails";

// Main component that manages the quotation creation flow
export default function QuotationCreator({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Quotation Details
    quotationId: "",
    quotationDate: format(new Date(), "yyyy-MM-dd"),
    validDate: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
    customLabel: "",
    
    // Client Details
    clientName: "",
    address: "",
    email: "",
    phoneNumber: "",
    countryCode: "+94",
    
    // Package Details
    systemType: "",
    capacity: "",
    panelCount: "",
    inverterCode: "",
    pvOutput: "",
    amount: ""
  });

  // Generate sequential quotation ID
  useEffect(() => {
    if (isOpen) {
      // Get the last ID from localStorage or start with 0
      const lastId = parseInt(localStorage.getItem("lastQuotationId") || "0");
      const newId = lastId + 1;
      
      // Update the form data with the new ID - just using the number now
      setFormData(prev => ({
        ...prev,
        quotationId: `${newId}`
      }));
    }
  }, [isOpen]);

  // Handle form data changes
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Calculate form completion percentages
  const calculateStepCompletion = (stepNumber) => {
    if (stepNumber === 1) {
      // Count filled fields in step 1
      const step1Fields = ['quotationId', 'quotationDate', 'validDate'];
      const filledFields = step1Fields.filter(field => formData[field]).length;
      return Math.round((filledFields / step1Fields.length) * 100);
    } else if (stepNumber === 2) {
      // Count filled fields in step 2
      const step2Fields = ['clientName', 'address', 'email', 'phoneNumber'];
      const filledFields = step2Fields.filter(field => formData[field]).length;
      return Math.round((filledFields / step2Fields.length) * 100);
    } else if (stepNumber === 3) {
      // Count filled fields in step 3
      const step3Fields = ['systemType', 'capacity', 'panelCount', 'inverterCode', 'pvOutput', 'amount'];
      const filledFields = step3Fields.filter(field => formData[field]).length;
      return Math.round((filledFields / step3Fields.length) * 100);
    }
    return 0;
  };

  // Calculate overall progress percentage
  const getProgressPercentage = () => {
    // Get completion percentages for each step
    const step1Completion = calculateStepCompletion(1);
    const step2Completion = step >= 2 ? calculateStepCompletion(2) : 0;
    const step3Completion = step >= 3 ? calculateStepCompletion(3) : 0;
    
    // Calculate weighted average based on current step
    if (step === 1) {
      return step1Completion;
    } else if (step === 2) {
      return Math.round((step1Completion + step2Completion) / 2);
    } else {
      return Math.round((step1Completion + step2Completion + step3Completion) / 3);
    }
  };

  // Get step title
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Quotation Details";
      case 2:
        return "Client Details";
      case 3:
        return "Package Details";
      default:
        return "";
    }
  };

  // Check if current step is complete and can proceed
  const canProceed = () => {
    if (step === 1) {
      return formData.quotationId && formData.quotationDate && formData.validDate;
    } else if (step === 2) {
      return formData.clientName && formData.address && formData.email && formData.phoneNumber;
    } else if (step === 3) {
      return formData.systemType && formData.capacity && formData.panelCount && 
             formData.inverterCode && formData.pvOutput && formData.amount;
    }
    return false;
  };

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData(prev => ({
        ...prev,
        customLabel: "",
        clientName: "",
        address: "",
        email: "",
        phoneNumber: "",
        countryCode: "+94",
        systemType: "",
        capacity: "",
        panelCount: "",
        inverterCode: "",
        pvOutput: "",
        amount: ""
      }));
    }
  }, [isOpen]);

  const getButtonText = () => {
    return step < 3 ? "Next" : "Generate";
  };

  // Handle form submission
  const handleSubmit = () => {
    // Save the current ID to localStorage for future reference
    const idNumber = parseInt(formData.quotationId);
    localStorage.setItem("lastQuotationId", idNumber.toString());
    
    // Submit the form
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="max-h-[80vh] rounded-t-xl p-0">
        <SheetHeader className="px-4 pt-4 pb-2">
          <div className="flex justify-between items-center">
            <div>
              <SheetTitle className="text-lg font-semibold text-[#163300]">
                Create Quotation
              </SheetTitle>
              <SheetDescription className="text-sm text-gray-500">
                {getStepTitle()}
              </SheetDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {/* Progress bar */}
        <div className="px-4 pt-2">
          <Progress value={getProgressPercentage()} className="h-2 bg-gray-200">
            <div 
              className="h-full bg-green-900" 
              style={{ width: `${getProgressPercentage()}%` }} 
            />
          </Progress>
          <div className="text-right text-xs text-gray-500 mt-1">
            {getProgressPercentage()}%
          </div>
        </div>

        <div className="p-4">
          {step === 1 ? (
            <QuotationDetails formData={formData} onChange={handleChange} />
          ) : step === 2 ? (
            <ClientDetails formData={formData} onChange={handleChange} />
          ) : (
            <PackageDetails formData={formData} onChange={handleChange} />
          )}
        </div>

        <SheetFooter className="flex px-4 py-4 gap-4 border-t">
          {step > 1 ? (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          ) : (
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Back
            </Button>
          )}
          
          <Button
            className="flex-1 bg-[#9FE870] text-[#163300] hover:bg-[#8FD760]"
            disabled={!canProceed()}
            onClick={() => {
              if (step < 3) {
                setStep(step + 1);
              } else {
                handleSubmit();
              }
            }}
          >
            {getButtonText()}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}