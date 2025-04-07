
import { ShiftProps } from "@/components/dashboard/ShiftCard";

export const MOCK_SHIFTS: { [key: string]: ShiftProps[] } = {
  upcoming: [
    {
      id: "shift1",
      clientName: "John Smith",
      location: "123 Main St, Anytown",
      date: "2025-04-08",
      startTime: "9:00",
      endTime: "13:00",
      status: "scheduled",
      jobTitle: "Home Care Assistant",
      payAmount: 85.00,
    },
    {
      id: "shift2",
      clientName: "Sarah Johnson",
      location: "456 Oak Ave, Somecity",
      date: "2025-04-09",
      startTime: "14:00",
      endTime: "18:00",
      status: "scheduled",
      jobTitle: "Personal Care Assistant",
      payAmount: 92.50,
    },
    {
      id: "shift3",
      clientName: "David Wilson",
      location: "789 Pine Rd, Somewhere",
      date: "2025-04-11",
      startTime: "10:00",
      endTime: "15:00",
      status: "scheduled",
      jobTitle: "Home Health Aide",
      payAmount: 110.00,
    },
  ],
  available: [
    {
      id: "shift4",
      clientName: "Emily Wilson",
      location: "321 Elm St, Somewhere",
      date: "2025-04-10",
      startTime: "10:00",
      endTime: "14:00",
      status: "scheduled",
      jobTitle: "Companion Care",
      payAmount: 75.00,
    },
    {
      id: "shift5",
      clientName: "Robert Davis",
      location: "789 Pine Rd, Anyville",
      date: "2025-04-14",
      startTime: "13:00",
      endTime: "17:00",
      status: "scheduled",
      jobTitle: "Senior Care Assistant",
      payAmount: 96.00,
    },
    {
      id: "shift6",
      clientName: "Olivia Garcia",
      location: "245 Cedar Ave, Othertown",
      date: "2025-04-15",
      startTime: "9:00",
      endTime: "12:00",
      status: "scheduled",
      jobTitle: "Home Care Specialist",
      payAmount: 65.50,
    },
  ],
  completed: [
    {
      id: "shift7",
      clientName: "Mary Thompson",
      location: "567 Cedar Lane, Othertown",
      date: "2025-04-03",
      startTime: "9:00",
      endTime: "13:00",
      status: "completed",
      jobTitle: "Personal Care Aide",
      payAmount: 85.00,
      notes: "Client was in good spirits. Completed all morning routines and medication. Blood pressure normal at 120/80."
    },
    {
      id: "shift8",
      clientName: "James Wilson",
      location: "890 Maple Ave, Somewhere",
      date: "2025-04-02",
      startTime: "14:00",
      endTime: "18:00",
      status: "completed",
      jobTitle: "Home Health Assistant",
      payAmount: 92.00,
      notes: "Assisted with physical therapy exercises. Client reported some improvement in mobility. Prepared dinner and organized medication for tomorrow."
    },
    {
      id: "shift9",
      clientName: "Patricia Moore",
      location: "432 Birch St, Anyplace",
      date: "2025-04-01",
      startTime: "10:00",
      endTime: "14:30",
      status: "completed",
      jobTitle: "Elderly Care Assistant",
      payAmount: 89.75,
      notes: "Client was feeling tired today. Helped with light housekeeping and meal preparation. Family visited during shift and were updated on client's condition."
    },
  ],
};

// Client-specific shift history data for displaying previous shift notes
export const CLIENT_SHIFT_HISTORY = {
  "John Smith": [
    {
      id: "history-js-1",
      date: "2025-04-01",
      startTime: "9:00",
      endTime: "13:00",
      notes: "Client was in good spirits. Assisted with medication, breakfast, and a short walk in the garden. Blood pressure reading: 128/82. Mentioned some mild discomfort in right knee that subsided after rest."
    },
    {
      id: "history-js-2",
      date: "2025-03-28",
      startTime: "14:00",
      endTime: "18:00",
      notes: "Helped client with grocery shopping and meal prep for the week. Made chicken soup and salad for dinner. Client reported improved appetite today and enjoyed socializing at the store. Left freezer stocked with prepared meals."
    }
  ],
  "Sarah Johnson": [
    {
      id: "history-sj-1",
      date: "2025-04-02",
      startTime: "10:00",
      endTime: "14:00",
      notes: "Client completed physical therapy exercises as prescribed. Mood was upbeat. Prepared lunch and organized medication for the week. Family visited during shift and reported satisfaction with care progress."
    },
    {
      id: "history-sj-2",
      date: "2025-03-30",
      startTime: "9:00",
      endTime: "12:00",
      notes: "Client needed extra assistance with mobility today. Pain level reported as 4/10. Contacted daughter about refilling pain medication. Helped with shower and hair washing. Client enjoyed listening to classical music during rest periods."
    },
    {
      id: "history-sj-3",
      date: "2025-03-27",
      startTime: "13:00",
      endTime: "17:00",
      notes: "Accompanied client to doctor's appointment. New prescription for blood pressure medication. Doctor recommended increasing daily walks. Client was tired after appointment but ate a good dinner. All vital signs normal."
    }
  ],
  "David Wilson": [
    {
      id: "history-dw-1",
      date: "2025-04-04",
      startTime: "11:00",
      endTime: "15:00",
      notes: "Client was restless today. Helped with range of motion exercises. Noticed slight swelling in ankles - elevated legs and applied compression socks. Read from client's favorite novel for an hour. Appetite was good."
    }
  ],
  "Mary Thompson": [
    {
      id: "history-mt-1",
      date: "2025-03-31",
      startTime: "9:00",
      endTime: "14:00",
      notes: "Client reported feeling well today. Completed all morning routines independently. Assisted with laundry and light housekeeping. Prepared lunch together as part of occupational therapy goals. Client's daughter called during shift to check in."
    },
    {
      id: "history-mt-2",
      date: "2025-03-26",
      startTime: "10:00",
      endTime: "15:00",
      notes: "Client had a great day. We went for a 20-minute walk around the neighborhood. Blood sugar was 110 before lunch. Practiced memory exercises with photo albums. Client remembered many details about family pictures from recent years."
    }
  ]
};

