
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/date-utils";

export interface ShiftProps {
  id: string;
  clientName: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "completed" | "cancelled";
  onViewDetails?: (id: string) => void;
}

const ShiftCard = ({ 
  id, 
  clientName, 
  location, 
  date, 
  startTime, 
  endTime, 
  status,
  onViewDetails
}: ShiftProps) => {
  const statusColors = {
    scheduled: "bg-blue-100 text-care-blue",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-sky-50">
      <CardHeader className="pb-2 bg-sky-50/50">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{clientName}</CardTitle>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="flex items-center mt-1">
          <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
          {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center text-sm bg-sky-50 p-2 rounded-lg">
            <Calendar className="h-3.5 w-3.5 mr-1 text-sky-500" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center text-sm justify-end bg-sky-50 p-2 rounded-lg">
            <Clock className="h-3.5 w-3.5 mr-1 text-sky-500" />
            <span>{formatTime(startTime)} - {formatTime(endTime)}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-sky-200 text-sky-700 hover:bg-sky-50"
          onClick={() => onViewDetails?.(id)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShiftCard;
