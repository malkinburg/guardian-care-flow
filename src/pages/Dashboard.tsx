
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MessageSquare, FileText, ChevronRight, Users } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date-utils";
import { ShiftProps } from "@/components/dashboard/ShiftCard";
import { AvailabilitySelector } from "@/components/shifts/AvailabilitySelector";
import ShiftNotesAccess from "@/components/dashboard/ShiftNotesAccess";
import { MOCK_PARTICIPANTS } from "@/data/mockParticipants";

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
  const [showAvailability, setShowAvailability] = useState(false);

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

  const toggleAvailabilityModal = () => {
    setShowAvailability(prev => !prev);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const todayShift = MOCK_SHIFTS[0];
  
  return (
    <MainLayout>
      <div className="px-4 py-6 bg-sky-500 text-white rounded-b-3xl mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-xl font-semibold">Hello, {user?.name || "Caregiver"}</h1>
            <div className="flex items-center">
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
              <p className="text-sm text-white/90">Available</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="rounded-full p-2 bg-white/20">
              <Clock className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 bg-white/20">
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Today's Shift</h2>
            <span className="text-sm text-gray-500">{MOCK_SHIFTS.length} shift{MOCK_SHIFTS.length !== 1 ? 's' : ''}</span>
          </div>

          {todayShift ? (
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Badge className="bg-green-100 text-green-600 font-medium rounded-full px-3">Accepted</Badge>
                </div>
                <div className="text-lg font-semibold">
                  {todayShift.startTime} - {todayShift.endTime} ({
                    calculateHourDifference(todayShift.startTime, todayShift.endTime)
                  }hrs)
                </div>
                <div className="text-sm text-gray-500 mb-2">{formatDate(todayShift.date)}</div>

                <div className="pt-2 border-t mt-3 flex justify-between">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-white shadow-md rounded-xl p-4 text-center">
              <p className="text-gray-500">No shifts scheduled for today</p>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <QuickActionButton 
            icon={<Calendar className="h-5 w-5" />}
            label="Open Shifts"
            onClick={() => navigate("/shifts/available")}
          />
          <QuickActionButton 
            icon={<Users className="h-5 w-5" />}
            label="Participants"
            onClick={() => navigate("/participants")}
            notificationCount={MOCK_PARTICIPANTS.length}
          />
          <QuickActionButton 
            icon={<FileText className="h-5 w-5" />}
            label="Timesheets"
            onClick={() => navigate("/timesheets")}
          />
        </div>
        
        <div className="mb-6">
          {/* Recent Shift Notes section */}
          <ShiftNotesAccess limit={3} />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Upcoming Shift</h2>
            <Button variant="ghost" size="sm" className="text-sky-500 font-medium p-0" onClick={() => navigate("/shifts")}>
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          {MOCK_SHIFTS.length > 1 ? (
            <Card className="bg-white shadow-md rounded-xl p-4">
              <div className="text-lg font-semibold">
                {MOCK_SHIFTS[1].startTime} - {MOCK_SHIFTS[1].endTime}
              </div>
              <div className="text-sm text-gray-500">{formatDate(MOCK_SHIFTS[1].date)}</div>
              <div className="mt-2 text-gray-700">{MOCK_SHIFTS[1].clientName}</div>
              <div className="text-sm text-gray-500">{MOCK_SHIFTS[1].location}</div>
            </Card>
          ) : (
            <Card className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
              <div className="bg-sky-500 text-white rounded-full p-4 mb-3">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-1">No Upcoming Shift</h3>
              <p className="text-sm text-gray-500 text-center">
                Once you accept a shift, you will see them right here
              </p>
            </Card>
          )}
        </div>
      </div>

      {showAvailability && (
        <AvailabilitySelector 
          isOpen={showAvailability} 
          onClose={toggleAvailabilityModal} 
        />
      )}
    </MainLayout>
  );
};

// Helper component for the action buttons
const QuickActionButton = ({ 
  icon, 
  label, 
  onClick,
  notificationCount
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
  notificationCount?: number;
}) => (
  <button 
    className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-4 relative"
    onClick={onClick}
  >
    <div className="mb-1">
      {icon}
    </div>
    <span className="text-xs font-medium">{label}</span>
    
    {notificationCount && (
      <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {notificationCount}
      </span>
    )}
  </button>
);

// Helper function to calculate hour difference
const calculateHourDifference = (start: string, end: string): string => {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  
  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;
  
  // Calculate difference in minutes
  let diffMinutes = totalEndMinutes - totalStartMinutes;
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60; // Add a day if end is on the next day
  }
  
  // Convert to hours and minutes
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  
  return `${hours}${minutes > 0 ? `h${minutes}m` : 'hrs'}`;
};

export default Dashboard;
