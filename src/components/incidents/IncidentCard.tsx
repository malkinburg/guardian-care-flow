
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Incident } from "@/types/incidents";
import { format } from "date-fns";
import { AlertTriangle, Clock, MapPin } from "lucide-react";

interface IncidentCardProps {
  incident: Incident;
  onClick?: () => void;
}

const IncidentCard = ({ incident, onClick }: IncidentCardProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reported":
        return "bg-blue-100 text-blue-800";
      case "investigating":
        return "bg-purple-100 text-purple-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {incident.title}
          </CardTitle>
          <Badge className={getStatusColor(incident.status)}>
            {incident.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-2 mb-2">
          <AlertTriangle className={`h-4 w-4 mt-0.5 ${
            incident.severity === "critical" || incident.severity === "high" 
              ? "text-red-500" 
              : "text-amber-500"
          }`} />
          <span className="text-sm">
            <Badge className={`${getSeverityColor(incident.severity)} font-medium`}>
              {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)} Severity
            </Badge>
          </span>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-2 mb-3">
          {incident.description}
        </p>

        <div className="flex flex-col space-y-1 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {format(new Date(incident.date), "MMMM d, yyyy")}
            </span>
          </div>
          {incident.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{incident.location}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentCard;
