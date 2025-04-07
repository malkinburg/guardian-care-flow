
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface QuickActionCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
  badgeCount?: number;
  badgeColor?: string;
}

const QuickActionCard = ({
  icon,
  title,
  description,
  onClick,
  className,
  badgeCount,
  badgeColor = "bg-primary",
}: QuickActionCardProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer hover:shadow-md transition-shadow", 
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-center p-4">
        <div className="flex-shrink-0 mr-4">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {typeof badgeCount !== 'undefined' && badgeCount > 0 && (
          <Badge className={cn("ml-2", badgeColor)}>
            {badgeCount}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
