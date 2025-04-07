
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ShieldCheck, ShieldAlert, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date-utils";
import { Certificate } from "@/types/certificates";

// Mock data for certificates
const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: "1",
    name: "First Aid Certificate",
    status: "valid",
    expiryDate: "2025-07-15",
    dateObtained: "2023-07-15",
    required: true
  },
  {
    id: "2",
    name: "Working with Children Check",
    status: "expiring",
    expiryDate: "2024-05-30",
    dateObtained: "2021-05-30",
    required: true
  },
  {
    id: "3",
    name: "Car Insurance",
    status: "expired",
    expiryDate: "2024-02-01",
    dateObtained: "2023-02-01",
    required: true
  },
  {
    id: "4",
    name: "Driver's License",
    status: "valid",
    expiryDate: "2026-01-20",
    dateObtained: "2022-01-20",
    required: true
  }
];

const CertificateComplianceCard = () => {
  const navigate = useNavigate();
  const certificates = MOCK_CERTIFICATES;
  
  const expired = certificates.filter(cert => cert.status === "expired").length;
  const expiring = certificates.filter(cert => cert.status === "expiring").length;
  const valid = certificates.filter(cert => cert.status === "valid").length;
  
  const getComplianceStatus = () => {
    if (expired > 0) return "critical";
    if (expiring > 0) return "warning";
    return "compliant";
  };
  
  const status = getComplianceStatus();
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate("/certificates")}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {status === "critical" ? (
              <Shield className="h-5 w-5 text-red-500" />
            ) : status === "warning" ? (
              <ShieldAlert className="h-5 w-5 text-amber-500" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-green-500" />
            )}
            <h3 className="font-medium">Compliance</h3>
          </div>
          
          <Badge
            className={`${
              status === "critical"
                ? "bg-red-100 text-red-700"
                : status === "warning"
                ? "bg-amber-100 text-amber-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {status === "critical"
              ? "Action Required"
              : status === "warning"
              ? "Attention Needed"
              : "Compliant"}
          </Badge>
        </div>
        
        <div className="space-y-1 mt-2 text-sm">
          <div className="flex justify-between items-center">
            <span>Valid</span>
            <span className="font-medium text-green-600">{valid}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Expiring Soon</span>
            <span className="font-medium text-amber-600">{expiring}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Expired</span>
            <span className="font-medium text-red-600">{expired}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t flex items-center justify-end text-sky-500 text-sm font-medium">
          View Details <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </div>
    </Card>
  );
};

export default CertificateComplianceCard;
