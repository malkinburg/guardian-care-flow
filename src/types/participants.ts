
export interface Participant {
  id: string;
  name: string;
  image?: string;
  address: string;
  age: number;
  supportNeeds: string[];
  nextAppointment?: string;
  lastVisit?: string;
}
