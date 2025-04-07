
import { Calendar, MessageSquare, Bell, UserCheck } from "lucide-react";
import { ReactNode } from "react";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: ReactNode;
}

export const notificationsData: Notification[] = [
  {
    id: "1",
    title: "Shift Reminder",
    description: "You have a shift with Sarah tomorrow at 9:00 AM",
    time: "1 hour ago",
    read: false,
    icon: <Calendar className="h-4 w-4 text-blue-500" />,
  },
  {
    id: "2",
    title: "New Message",
    description: "Emma sent you a message about tomorrow's appointment",
    time: "3 hours ago",
    read: false,
    icon: <MessageSquare className="h-4 w-4 text-green-500" />,
  },
  {
    id: "3",
    title: "Shift Approved",
    description: "Your shift on Friday has been approved",
    time: "5 hours ago",
    read: true,
    icon: <UserCheck className="h-4 w-4 text-purple-500" />,
  },
  {
    id: "4",
    title: "Schedule Change",
    description: "Your shift on Thursday has been rescheduled",
    time: "Yesterday",
    read: true,
    icon: <Calendar className="h-4 w-4 text-orange-500" />,
  },
  {
    id: "5",
    title: "Timesheet Reminder",
    description: "Please submit your timesheet for last week",
    time: "2 days ago",
    read: true,
    icon: <Bell className="h-4 w-4 text-red-500" />,
  }
];
