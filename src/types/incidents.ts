
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export type IncidentStatus = 'reported' | 'investigating' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  location?: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  reportedBy: string;
  involvedPersons?: string[];
  witnessNames?: string[];
  actions?: string;
  attachments?: string[];
}

export interface IncidentFormData {
  title: string;
  description: string;
  date: string;
  location?: string;
  severity: IncidentSeverity;
  witnessNames?: string;
  involvedPersons?: string;
  actions?: string;
}
