
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, Bell, HelpCircle, LogOut } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
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
      <div className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 flex items-center">
          <div className="h-16 w-16 rounded-full bg-sky-500 text-white flex items-center justify-center text-2xl font-bold mr-4">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
            <p className="text-gray-500">{user?.email || "email@example.com"}</p>
          </div>
        </div>

        <div className="space-y-3">
          <MenuCard 
            icon={<User className="text-sky-500" />} 
            title="Personal Information"
            onClick={() => navigate("/profile/info")}
          />
          
          <MenuCard 
            icon={<Bell className="text-purple-500" />} 
            title="Notifications"
            onClick={() => navigate("/profile/notifications")}
          />
          
          <MenuCard 
            icon={<Settings className="text-gray-500" />} 
            title="Settings"
            onClick={() => navigate("/profile/settings")}
          />
          
          <MenuCard 
            icon={<HelpCircle className="text-teal-500" />} 
            title="Help & Support"
            onClick={() => navigate("/profile/support")}
          />
          
          <MenuCard 
            icon={<LogOut className="text-red-500" />} 
            title="Logout"
            onClick={handleLogout}
            textColor="text-red-500"
          />
        </div>
      </div>
    </MainLayout>
  );
};

interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  textColor?: string;
}

const MenuCard = ({ icon, title, onClick, textColor = "text-gray-800" }: MenuCardProps) => {
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 flex items-center">
        <div className="h-8 w-8 flex items-center justify-center mr-3">
          {icon}
        </div>
        <span className={`flex-1 font-medium ${textColor}`}>{title}</span>
      </div>
    </Card>
  );
};

export default Profile;
