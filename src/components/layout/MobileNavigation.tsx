
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, MessageSquare, User } from "lucide-react";
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
      label: "Bookings",
      icon: Calendar,
      path: "/shifts",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/messages",
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center w-full h-full relative"
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-sky-500 rounded-b-full" />
              )}
              <item.icon 
                className={cn(
                  "w-5 h-5 mb-1 transition-colors",
                  isActive ? "text-sky-500" : "text-gray-400"
                )} 
              />
              <span 
                className={cn(
                  "text-xs transition-colors",
                  isActive ? "text-sky-500 font-medium" : "text-gray-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
