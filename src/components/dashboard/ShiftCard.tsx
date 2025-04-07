
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/date-utils";

export interface ShiftProps {
  id: string;
  clientName: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "available" | "completed" | "cancelled";
  onViewDetails?: (id: string) => void;
  jobTitle?: string;
  payAmount?: number;
  notes?: string;
}

const ShiftCard = ({ 
  id, 
  clientName, 
  location, 
  date, 
  startTime, 
  endTime, 
  status,
  onViewDetails,
  jobTitle = "Personal Care Assistant",
  payAmount
}: ShiftProps) => {
  const statusColors = {
    scheduled: "bg-blue-100 text-care-blue",
    available: "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-sky-50">
      <CardHeader className="pb-2 bg-sky-50/50">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{jobTitle}</CardTitle>
            <CardDescription className="text-sm">
              with {clientName}
            </CardDescription>
          </div>
          <Badge className={statusColors[status]}>
            {status === "available" ? "Available" : status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm">
            <MapPin className="h-3.5 w-3.5 mr-2 text-sky-500" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-3.5 w-3.5 mr-2 text-sky-500" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-3.5 w-3.5 mr-2 text-sky-500" />
            <span>{formatTime(startTime)} - {formatTime(endTime)}</span>
          </div>
          {payAmount && (
            <div className="flex items-center text-sm font-medium text-green-600">
              <DollarSign className="h-3.5 w-3.5 mr-2 text-green-500" />
              <span>${payAmount.toFixed(2)}</span>
            </div>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className={`w-full ${
            status === "available" 
              ? "border-purple-200 text-purple-700 hover:bg-purple-50" 
              : "border-sky-200 text-sky-700 hover:bg-sky-50"
          }`}
          onClick={() => onViewDetails?.(id)}
        >
          {status === "available" ? "View & Respond" : "View Details"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShiftCard;
