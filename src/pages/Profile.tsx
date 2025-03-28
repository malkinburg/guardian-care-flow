
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <MainLayout title="Profile">
      <div className="p-4 max-w-md mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-sky-400 to-sky-500 rounded-xl p-6 shadow-md mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-300 rounded-full -mr-16 -mt-16 opacity-20" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-300 rounded-full -ml-12 -mb-12 opacity-20" />
          <div className="flex items-center relative z-10">
            <Avatar className="h-20 w-20 border-4 border-white mr-4 shadow-sm">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-sky-100 text-sky-600 text-2xl font-bold">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-white">{user?.name || "User"}</h2>
              <p className="text-sky-100">{user?.email || "email@example.com"}</p>
              <p className="text-sky-100 text-sm mt-1">{user?.role || "Support Worker"}</p>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-3">
          <MenuCard 
            icon={<User className="text-sky-500" />} 
            title="Personal Information"
            subtitle="Update your personal details"
            onClick={() => navigate("/profile/info")}
          />
          
          <MenuCard 
            icon={<Bell className="text-purple-500" />} 
            title="Notifications"
            subtitle="Manage your alerts and notifications"
            onClick={() => navigate("/profile/notifications")}
          />
          
          <MenuCard 
            icon={<Settings className="text-gray-500" />} 
            title="Settings"
            subtitle="App preferences and account settings"
            onClick={() => navigate("/profile/settings")}
          />
          
          <MenuCard 
            icon={<HelpCircle className="text-teal-500" />} 
            title="Help & Support"
            subtitle="Get assistance and FAQs"
            onClick={() => navigate("/profile/support")}
          />
          
          <MenuCard 
            icon={<LogOut className="text-red-500" />} 
            title="Logout"
            subtitle="Sign out of your account"
            onClick={handleLogout}
            textColor="text-red-500"
            showChevron={false}
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">Guardian Care Pro v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">©2023 Guardian Healthcare</p>
        </div>
      </div>
    </MainLayout>
  );
};

interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick: () => void;
  textColor?: string;
  showChevron?: boolean;
}

const MenuCard = ({ 
  icon, 
  title, 
  subtitle, 
  onClick, 
  textColor = "text-gray-800",
  showChevron = true
}: MenuCardProps) => {
  return (
    <Card 
      className="hover:shadow-md transition-all hover:translate-x-1 cursor-pointer bg-white border-0 shadow-sm"
      onClick={onClick}
    >
      <div className="p-4 flex items-center">
        <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center mr-3 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className={`font-medium ${textColor}`}>{title}</span>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{subtitle}</p>}
        </div>
        {showChevron && <ChevronRight className="h-5 w-5 text-gray-400" />}
      </div>
    </Card>
  );
};

export default Profile;
