import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MessageSquare, FileText, ChevronRight, Users, AlertTriangle, Calendar as CalendarIcon } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date-utils";
import { ShiftProps } from "@/components/dashboard/ShiftCard";
import { AvailabilitySelector } from "@/components/shifts/AvailabilitySelector";
import { MOCK_SHIFTS } from "@/data/mockShifts";
import CertificateComplianceCard from "@/components/certificates/CertificateComplianceCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAvailability, setShowAvailability] = useState(false);

  useEffect(() => {
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

  const todayShift = MOCK_SHIFTS.upcoming[0];
  
  return (
    <MainLayout>
      <div className="px-6 py-8 bg-gradient-to-br from-sky-500 via-sky-400 to-cyan-400 text-white rounded-b-[2rem] mb-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-4 -translate-x-4"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Hello, {user?.name || "Caregiver"}</h1>
              <div className="flex items-center">
                <span className="flex h-3 w-3 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                <p className="text-white/90 font-medium">Available</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="rounded-full p-3 bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm">
                <Clock className="h-5 w-5" />
              </button>
              <button className="rounded-full p-3 bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm">
                <MessageSquare className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex justify-between items-center text-white/90">
              <span className="font-medium">Weekly Progress</span>
              <span className="text-sm">3h 45m</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2 w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Today's Shift</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {MOCK_SHIFTS.upcoming.length} shift{MOCK_SHIFTS.upcoming.length !== 1 ? 's' : ''}
            </span>
          </div>

          {todayShift ? (
            <Card className="bg-gradient-to-br from-white to-blue-50/30 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Badge className="bg-green-100 text-green-700 font-medium rounded-full px-4 py-1">Accepted</Badge>
                </div>
                <div className="text-xl font-bold text-gray-800 mb-2">
                  {todayShift.startTime} - {todayShift.endTime}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {calculateHourDifference(todayShift.startTime, todayShift.endTime)} • {formatDate(todayShift.date)}
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4 flex justify-between items-center">
                  <span className="text-gray-500 text-sm">View Details</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-white to-blue-50/30 shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0">
              <div className="bg-sky-100 text-sky-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">No Shifts Today</h3>
              <p className="text-sm text-gray-500">
                Once you accept a shift, you will see them right here
              </p>
            </Card>
          )}
        </div>

        <div className="mb-8">
          <CertificateComplianceCard />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <QuickActionButton 
            icon={<Users className="h-6 w-6" />}
            label="Participants"
            onClick={() => navigate("/participants")}
          />
          <QuickActionButton 
            icon={<FileText className="h-6 w-6" />}
            label="Timesheets"
            onClick={() => navigate("/timesheets")}
          />
          <QuickActionButton 
            icon={<AlertTriangle className="h-6 w-6" />}
            label="Incidents"
            onClick={() => navigate("/incidents")}
          />
          <QuickActionButton 
            icon={<CalendarIcon className="h-6 w-6" />}
            label="Events"
            onClick={() => navigate("/events")}
          />
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Upcoming Shifts</h2>
            <Button variant="ghost" size="sm" className="text-sky-600 font-medium p-0 hover:bg-sky-50" onClick={() => navigate("/shifts")}>
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          {MOCK_SHIFTS.upcoming.length > 1 ? (
            <Card className="bg-gradient-to-br from-white to-blue-50/30 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0">
              <div className="text-lg font-bold text-gray-800 mb-1">
                {MOCK_SHIFTS.upcoming[1].startTime} - {MOCK_SHIFTS.upcoming[1].endTime}
              </div>
              <div className="text-sm text-gray-500 mb-3">{formatDate(MOCK_SHIFTS.upcoming[1].date)}</div>
              <div className="text-gray-700 font-medium">{MOCK_SHIFTS.upcoming[1].clientName}</div>
              <div className="text-sm text-gray-500">{MOCK_SHIFTS.upcoming[1].location}</div>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-white to-blue-50/30 shadow-lg rounded-2xl p-8 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0">
              <div className="bg-sky-100 text-sky-600 rounded-full p-4 mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">No Upcoming Shifts</h3>
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
    className="flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md p-6 relative hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 group"
    onClick={onClick}
  >
    <div className="mb-3 text-sky-600 group-hover:text-sky-700 transition-colors">
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800">{label}</span>
    
    {notificationCount && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
        {notificationCount}
      </span>
    )}
  </button>
);

const calculateHourDifference = (start: string, end: string): string => {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  
  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;
  
  let diffMinutes = totalEndMinutes - totalStartMinutes;
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }
  
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  
  return `${hours}${minutes > 0 ? `h${minutes}m` : 'hrs'}`;
};

export default Dashboard;
