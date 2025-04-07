
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Lock, 
  Mail, 
  FileText,
  PhoneCall
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

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
    <MainLayout title="Settings & Support">
      <div className="p-4 max-w-md mx-auto mb-20">
        {/* Profile Header */}
        <div className="flex items-center mb-6 px-2">
          <Avatar className="h-16 w-16 mr-4 border-2 border-white shadow-sm">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-sky-100 text-sky-600 text-xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{user?.name || "User"}</h2>
            <p className="text-gray-500 text-sm">{user?.role || "Support Worker"}</p>
          </div>
        </div>
        
        {/* Personal Information Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 px-2 mb-2">Personal Information</h3>
          
          <Card className="overflow-hidden border-0 shadow-sm mb-2">
            <MenuLink 
              icon={<User className="text-sky-500" />} 
              title="Edit Profile"
              onClick={() => navigate("/profile/info")}
              showChevron
            />
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-sm">
            <MenuLink 
              icon={<Lock className="text-sky-500" />} 
              title="Change Password"
              onClick={() => navigate("/profile/password")}
              showChevron
            />
          </Card>
        </div>

        {/* Notifications Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 px-2 mb-2">Notifications</h3>
          
          <Card className="overflow-hidden border-0 shadow-sm mb-2">
            <MenuLink 
              icon={<Bell className="text-sky-500" />} 
              title="Push Notifications"
              rightElement={
                <Switch 
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                  className="ml-auto"
                />
              }
            />
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-sm">
            <MenuLink 
              icon={<Mail className="text-sky-500" />} 
              title="Email Notifications"
              rightElement={
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              }
            />
          </Card>
        </div>

        {/* Support Section */}
        <div className="mb-10">
          <h3 className="text-sm font-medium text-gray-500 px-2 mb-2">Support</h3>
          
          <Card className="overflow-hidden border-0 shadow-sm mb-2">
            <MenuLink 
              icon={<HelpCircle className="text-sky-500" />} 
              title="Help Center"
              onClick={() => navigate("/profile/help")}
              showChevron
            />
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-sm mb-2">
            <MenuLink 
              icon={<FileText className="text-sky-500" />} 
              title="Terms & Privacy"
              onClick={() => navigate("/profile/terms")}
              showChevron
            />
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-sm">
            <MenuLink 
              icon={<PhoneCall className="text-sky-500" />} 
              title="Contact Support"
              onClick={() => navigate("/profile/support")}
              showChevron
            />
          </Card>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 flex items-center justify-center text-red-500 bg-red-50 rounded-lg font-medium hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </button>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">Guardian Care Pro v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">©2023 Guardian Healthcare</p>
        </div>
      </div>
    </MainLayout>
  );
};

interface MenuLinkProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

const MenuLink = ({ 
  icon, 
  title, 
  subtitle, 
  onClick, 
  rightElement,
  showChevron = false
}: MenuLinkProps) => {
  return (
    <div 
      className={`p-4 flex items-center ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      onClick={onClick}
    >
      <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-medium text-gray-800">{title}</span>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{subtitle}</p>}
      </div>
      {rightElement}
      {showChevron && <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />}
    </div>
  );
};

export default Profile;
