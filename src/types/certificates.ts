
export interface Certificate {
  id: string;
  name: string;
  status: "valid" | "expiring" | "expired" | "missing";
  expiryDate?: string; // ISO date string
  dateObtained?: string; // ISO date string
  documentUrl?: string;
  required: boolean;
}

export interface UserCertificates {
  userId: string;
  certificates: Certificate[];
}
