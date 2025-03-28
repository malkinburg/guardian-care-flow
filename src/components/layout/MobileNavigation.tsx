
import { Link, useLocation } from "react-router-dom";
import { Calendar, Clock, File, Home, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      label: "Home",
      icon: Home,
      path: "/",
    },
    {
      label: "Shifts",
      icon: Calendar,
      path: "/shifts",
    },
    {
      label: "Clients",
      icon: User,
      path: "/clients",
    },
    {
      label: "Timesheets",
      icon: Clock,
      path: "/timesheets",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/messages",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t shadow-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-gray-500 hover:text-primary"
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
