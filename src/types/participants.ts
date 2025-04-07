
export interface Participant {
  id: string;
  name: string;
  image?: string;
  address: string;
  age: number;
  supportNeeds: string[];
  nextAppointment?: string;
  lastVisit?: string;
  skills?: string[]; // Added skills to match with job requirements
  availability?: string[]; // Added availability to check shift dates
  rating?: number; // Added rating for showing worker quality
}
