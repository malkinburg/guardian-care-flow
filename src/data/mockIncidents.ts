
import { Incident } from "@/types/incidents";

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: "INC-2025-001",
    title: "Client fall during transfer",
    description: "Client slipped during bathroom transfer. No major injuries, but client complained of mild pain in left wrist.",
    date: "2025-04-05T14:30:00Z",
    location: "Client's home - 123 Main St",
    severity: "medium",
    status: "resolved",
    reportedBy: "Jane Smith",
    involvedPersons: ["Client: John Doe", "Support worker: Jane Smith"],
    witnessNames: ["Family member: Mary Doe"],
    actions: "Immediately assisted client back to seated position. Applied ice pack to wrist. Contacted supervisor and family member. Client declined medical attention but situation was monitored for remainder of shift."
  },
  {
    id: "INC-2025-002",
    title: "Medication administration error",
    description: "Evening medication was given 2 hours later than scheduled time due to miscommunication between staff members during shift change.",
    date: "2025-04-02T20:15:00Z",
    location: "Residential facility - North Wing",
    severity: "high",
    status: "investigating",
    reportedBy: "Michael Brown",
    involvedPersons: ["Client: Sarah Johnson", "Support workers: Michael Brown, Lisa Chen"],
    actions: "Notified nurse on call and facility manager. Monitored client for any adverse reactions. Documented the error in medication log."
  },
  {
    id: "INC-2025-003",
    title: "Vehicle breakdown during client transport",
    description: "Company vehicle experienced engine failure while transporting client to medical appointment. Client arrived 45 minutes late to scheduled appointment.",
    date: "2025-03-28T09:20:00Z",
    location: "Highway 101, mile marker 45",
    severity: "low",
    status: "closed",
    reportedBy: "David Wilson",
    involvedPersons: ["Client: Robert Taylor", "Driver: David Wilson"],
    actions: "Called roadside assistance. Notified office to reschedule appointment. Arranged alternative transportation for client."
  },
  {
    id: "INC-2025-004",
    title: "Aggressive behavior from client",
    description: "Client became verbally aggressive and threatened staff during morning routine. Situation was de-escalated but caused distress to other clients present.",
    date: "2025-04-01T08:10:00Z",
    location: "Group home - 456 Cedar Ave",
    severity: "medium",
    status: "reported",
    reportedBy: "Amanda Garcia",
    involvedPersons: ["Client: James Wilson", "Support worker: Amanda Garcia"],
    witnessNames: ["Other clients: [names withheld for privacy]", "Support worker: Thomas Lee"],
    actions: "Followed de-escalation protocol. Gave client space and time to calm down. Documented behavior in client notes. Scheduled follow-up with behavioral specialist."
  },
  {
    id: "INC-2025-005",
    title: "Critical allergic reaction",
    description: "Client developed severe allergic reaction after lunch. Symptoms included hives and difficulty breathing. Emergency services were called.",
    date: "2025-04-06T13:45:00Z",
    location: "Day program center - 789 Oak Street",
    severity: "critical",
    status: "investigating",
    reportedBy: "Kevin Park",
    involvedPersons: ["Client: Emily Chen", "Staff members: Kevin Park, Sophia Rodriguez"],
    witnessNames: ["Program participants: [names withheld for privacy]"],
    actions: "Administered EpiPen as per client's care plan. Called 911. Notified family and supervisor. Client was transported to hospital and is in stable condition."
  }
];
