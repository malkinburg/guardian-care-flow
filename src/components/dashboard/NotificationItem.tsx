
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
  isRead?: boolean;
  onClick?: () => void;
}

const NotificationItem = ({
  icon,
  title,
  description,
  time,
  isRead = false,
  onClick,
}: NotificationItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-start p-3 cursor-pointer hover:bg-muted rounded-lg transition-colors",
        !isRead && "bg-blue-50"
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
      {!isRead && (
        <div className="h-2 w-2 rounded-full bg-primary mt-1"></div>
      )}
    </div>
  );
};

export default NotificationItem;
