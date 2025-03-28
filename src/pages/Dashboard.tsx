
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MessageSquare, FileText } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import UpcomingShifts from "@/components/dashboard/UpcomingShifts";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import NotificationItem from "@/components/dashboard/NotificationItem";
import { Button } from "@/components/ui/button";
import { ShiftProps } from "@/components/dashboard/ShiftCard";

// Sample data for demonstration
const MOCK_SHIFTS: ShiftProps[] = [
  {
    id: "shift1",
    clientName: "John Smith",
    location: "123 Main St, Anytown",
    date: "2023-09-15",
    startTime: "9:00",
    endTime: "13:00",
    status: "scheduled",
  },
  {
    id: "shift2",
    clientName: "Sarah Johnson",
    location: "456 Oak Ave, Somecity",
    date: "2023-09-16",
    startTime: "14:00",
    endTime: "18:00",
    status: "scheduled",
  },
];

const MOCK_NOTIFICATIONS = [
  {
    id: "notif1",
    icon: <Calendar className="h-4 w-4 text-blue-500" />,
    title: "New shift available",
    description: "A new shift is available for Jane Doe on September 18",
    time: "10 minutes ago",
    isRead: false,
  },
  {
    id: "notif2",
    icon: <MessageSquare className="h-4 w-4 text-green-500" />,
    title: "New message",
    description: "You have a new message from Dr. Williams",
    time: "1 hour ago",
    isRead: true,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    setUser(JSON.parse(userData));
    setIsLoading(false);
  }, [navigate]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "shifts":
        navigate("/shifts/available");
        break;
      case "timesheet":
        navigate("/timesheets/new");
        break;
      case "messages":
        navigate("/messages");
        break;
      case "incidents":
        navigate("/incidents/new");
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Hello, {user?.name || "Caregiver"}</h1>
        <p className="text-muted-foreground">Welcome to your dashboard</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <QuickActionCard
          icon={<Calendar className="h-6 w-6 text-care-blue" />}
          title="Find Shifts"
          description="Browse available shifts"
          onClick={() => handleQuickAction("shifts")}
          className="bg-care-light-blue"
        />
        <QuickActionCard
          icon={<Clock className="h-6 w-6 text-care-teal" />}
          title="Timesheet"
          description="Submit your hours"
          onClick={() => handleQuickAction("timesheet")}
          className="bg-care-light-teal"
        />
        <QuickActionCard
          icon={<MessageSquare className="h-6 w-6 text-care-purple" />}
          title="Messages"
          description="Check your inbox"
          onClick={() => handleQuickAction("messages")}
          className="bg-care-light-purple"
        />
        <QuickActionCard
          icon={<FileText className="h-6 w-6 text-amber-600" />}
          title="Incident Report"
          description="File a new report"
          onClick={() => handleQuickAction("incidents")}
          className="bg-amber-50"
        />
      </div>

      <div className="mb-8">
        <UpcomingShifts shifts={MOCK_SHIFTS} />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </div>
        <div className="space-y-2">
          {MOCK_NOTIFICATIONS.map((notification) => (
            <NotificationItem
              key={notification.id}
              icon={notification.icon}
              title={notification.title}
              description={notification.description}
              time={notification.time}
              isRead={notification.isRead}
              onClick={() => console.log("Notification clicked:", notification.id)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
