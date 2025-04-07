
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Notification } from "@/data/mockNotifications";

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationItem = ({
  notification,
  onClick,
}: NotificationItemProps) => {
  const { icon, title, description, time, read } = notification;
  
  return (
    <div 
      className={cn(
        "flex items-start p-3 cursor-pointer hover:bg-muted rounded-lg transition-colors",
        !read && "bg-blue-50"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-3 mt-1">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground truncate mb-1">{description}</p>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      {!read && (
        <div className="h-2 w-2 rounded-full bg-primary mt-1"></div>
      )}
    </div>
  );
};

export default NotificationItem;
