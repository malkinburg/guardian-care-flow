
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
}

const QuickActionCard = ({
  icon,
  title,
  description,
  onClick,
  className,
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
        <div>
          <h3 className="font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
