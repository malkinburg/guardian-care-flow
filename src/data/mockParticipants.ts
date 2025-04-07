
import { Participant } from "@/types/participants";

export const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: "p1",
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    address: "42 Maple Street, Cityville",
    age: 67,
    supportNeeds: ["Mobility assistance", "Medication management"],
    nextAppointment: "2023-09-18",
    lastVisit: "2023-09-10",
    skills: ["Home Care", "Personal Care", "Medication Management"],
    availability: ["2025-04-08", "2025-04-10", "2025-04-14"],
    rating: 4.8
  },
  {
    id: "p2",
    name: "Robert Davis",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=256&q=80",
    address: "15 Oak Avenue, Townsburg",
    age: 72,
    supportNeeds: ["Personal care", "Meal preparation"],
    nextAppointment: "2023-09-19",
    lastVisit: "2023-09-12",
    skills: ["Meal Preparation", "Senior Care", "Home Health"],
    availability: ["2025-04-09", "2025-04-14", "2025-04-15"],
    rating: 4.5
  },
  {
    id: "p3",
    name: "Emily Wilson",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    address: "8 Pine Road, Villageton",
    age: 65,
    supportNeeds: ["Companionship", "Light housekeeping"],
    nextAppointment: "2023-09-20",
    lastVisit: "2023-09-11",
    skills: ["Companion Care", "Light Housekeeping", "Social Activities"],
    availability: ["2025-04-08", "2025-04-10", "2025-04-11"],
    rating: 4.9
  },
  {
    id: "p4",
    name: "Michael Brown",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    address: "23 Cedar Lane, Hamletville",
    age: 78,
    supportNeeds: ["Transportation", "Shopping assistance"],
    nextAppointment: "2023-09-21",
    lastVisit: "2023-09-13",
    skills: ["Transportation", "Shopping Assistance", "Personal Care"],
    availability: ["2025-04-10", "2025-04-14", "2025-04-15"],
    rating: 4.6
  },
  {
    id: "p5",
    name: "Patricia Martinez",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=256&q=80",
    address: "56 Elm Street, Boroughburg",
    age: 70,
    supportNeeds: ["Cognitive support", "Social activities"],
    nextAppointment: "2023-09-22",
    lastVisit: "2023-09-14",
    skills: ["Cognitive Support", "Social Activities", "Home Care"],
    availability: ["2025-04-09", "2025-04-11", "2025-04-15"],
    rating: 4.7
  }
];
