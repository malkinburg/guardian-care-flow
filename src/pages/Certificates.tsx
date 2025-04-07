
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Plus,
  FileCheck,
  Upload
} from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { Certificate } from "@/types/certificates";
import MainLayout from "@/components/layout/MainLayout";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const Certificates = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    // Load certificate data
    setCertificates(MOCK_CERTIFICATES);
    setIsLoading(false);
  }, [navigate]);

  const getStatusBadge = (status: Certificate["status"]) => {
    switch (status) {
      case "valid":
        return (
          <Badge className="bg-green-100 text-green-700">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Valid
          </Badge>
        );
      case "expiring":
        return (
          <Badge className="bg-amber-100 text-amber-700">
            <ShieldAlert className="h-3 w-3 mr-1" />
            Expiring Soon
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-red-100 text-red-700">
            <Shield className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      case "missing":
        return (
          <Badge className="bg-gray-100 text-gray-700">
            Missing
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleUploadCertificate = (id: string) => {
    // In a real implementation, this would open a file upload dialog
    console.log(`Upload certificate for ID: ${id}`);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <MainLayout title="Certificates">
      <div className="px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">My Certificates</h1>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add Certificate
          </Button>
        </div>

        <Card className="overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Obtained</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.name}</TableCell>
                    <TableCell>{getStatusBadge(cert.status)}</TableCell>
                    <TableCell>
                      {cert.dateObtained ? formatDate(cert.dateObtained) : "N/A"}
                    </TableCell>
                    <TableCell>
                      {cert.expiryDate ? formatDate(cert.expiryDate) : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleUploadCertificate(cert.id)}>
                          <Upload className="h-4 w-4 mr-1" />
                          Update
                        </Button>
                        {cert.documentUrl && (
                          <Button variant="outline" size="sm">
                            <FileCheck className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="bg-sky-50 border border-sky-100 rounded-lg p-4">
          <h2 className="text-sm font-medium text-sky-800 mb-2">Certificate Requirements</h2>
          <p className="text-sm text-sky-700">
            Keep your certificates up to date to ensure compliance with regulatory requirements.
            Certificates marked as "Expiring Soon" will expire within the next 30 days.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Certificates;
