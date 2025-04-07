
// Update the import section to include the necessary components
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import UpcomingShifts from "@/components/dashboard/UpcomingShifts";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import { notificationsData } from "@/data/mockNotifications";
import NotificationItem from "@/components/dashboard/NotificationItem";
import { Badge } from "@/components/ui/badge";
import { MOCK_SHIFTS } from "@/data/mockShifts";
import { MOCK_PARTICIPANTS } from "@/data/mockParticipants";
import { CalendarDays, Clock, MessageSquare, Calendar, Users, UserCheck } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [availableShiftsCount, setAvailableShiftsCount] = useState(0);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    }
    
    // Count unread notifications
    const unreadNotifications = notificationsData.filter(n => !n.read).length;
    setUnreadCount(unreadNotifications);
    
    // Count available shifts
    setAvailableShiftsCount(MOCK_SHIFTS.available.length);
  }, [navigate]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "shifts":
        navigate("/shifts");
        break;
      case "messages":
        navigate("/messages");
        break;
      case "availability":
        navigate("/shifts");
        break;
      case "participants":
        navigate("/participants");
        break;
      case "available-shifts":
        navigate("/shifts", { state: { activeTab: "available" } });
        break;
      default:
        break;
    }
  };

  return (
    <MainLayout title="Dashboard">
      <div className="p-4 space-y-6 pb-20">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-gray-500">Here's what's happening today</p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickActionCard 
              title="My Shifts" 
              icon={<CalendarDays className="h-6 w-6" />} 
              onClick={() => handleQuickAction("shifts")}
            />
            <QuickActionCard 
              title="Messages" 
              icon={<MessageSquare className="h-6 w-6" />} 
              badgeCount={unreadCount}
              onClick={() => handleQuickAction("messages")}
            />
            <QuickActionCard 
              title="My Availability" 
              icon={<Clock className="h-6 w-6" />} 
              onClick={() => handleQuickAction("availability")}
            />
            <QuickActionCard 
              title="My Participants" 
              icon={<Users className="h-6 w-6" />} 
              badgeCount={MOCK_PARTICIPANTS.length}
              onClick={() => handleQuickAction("participants")}
            />
            {availableShiftsCount > 0 && (
              <QuickActionCard 
                title="Available Shifts"
                description="New opportunities"
                icon={<UserCheck className="h-6 w-6" />}
                className="col-span-2 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100"
                badgeCount={availableShiftsCount}
                badgeColor="bg-purple-500"
                onClick={() => handleQuickAction("available-shifts")}
              />
            )}
          </div>
        </div>

        {/* Upcoming Shifts */}
        <div>
          <UpcomingShifts shifts={MOCK_SHIFTS.upcoming.slice(0, 3)} />
        </div>

        {/* Recent Notifications */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-2">
            {notificationsData.slice(0, 3).map((notification) => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
