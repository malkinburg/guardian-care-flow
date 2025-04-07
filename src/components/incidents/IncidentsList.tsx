
import { useState } from "react";
import { Incident, IncidentStatus } from "@/types/incidents";
import IncidentCard from "./IncidentCard";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AlertTriangle, Calendar, Clock, MapPin, UserCircle, Users, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface IncidentsListProps {
  incidents: Incident[];
}

const IncidentsList = ({ incidents }: IncidentsListProps) => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsDialogOpen(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  if (incidents.length === 0) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="mx-auto h-10 w-10 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No incidents reported</h3>
        <p className="mt-1 text-sm text-gray-500">
          There are no incidents to display at this time.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {incidents.map((incident) => (
          <IncidentCard 
            key={incident.id} 
            incident={incident} 
            onClick={() => handleCardClick(incident)}
          />
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedIncident && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center justify-between">
                {selectedIncident.title}
                <Badge className={getStatusColor(selectedIncident.status)}>
                  {selectedIncident.status}
                </Badge>
              </DialogTitle>
              <DialogDescription className="flex items-center space-x-2 pt-2">
                <AlertTriangle className="h-4 w-4" />
                <Badge className={getSeverityColor(selectedIncident.severity)}>
                  {selectedIncident.severity.charAt(0).toUpperCase() + selectedIncident.severity.slice(1)} Severity
                </Badge>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>
                    {format(new Date(selectedIncident.date), "MMMM d, yyyy")}
                  </span>
                </div>
                {selectedIncident.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{selectedIncident.location}</span>
                  </div>
                )}
              </div>

              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm whitespace-pre-line">
                  {selectedIncident.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedIncident.involvedPersons?.length ? (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" /> Persons Involved
                    </h4>
                    <p className="text-sm">
                      {selectedIncident.involvedPersons.join(", ")}
                    </p>
                  </div>
                ) : null}

                {selectedIncident.witnessNames?.length ? (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Eye className="h-4 w-4 mr-2" /> Witnesses
                    </h4>
                    <p className="text-sm">
                      {selectedIncident.witnessNames.join(", ")}
                    </p>
                  </div>
                ) : null}
              </div>

              {selectedIncident.actions && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Actions Taken</h4>
                    <p className="text-sm whitespace-pre-line">
                      {selectedIncident.actions}
                    </p>
                  </div>
                </>
              )}
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <UserCircle className="h-4 w-4 mr-2" /> Reported By
                </h4>
                <p className="text-sm">{selectedIncident.reportedBy}</p>
                <p className="text-xs text-gray-500">
                  Incident ID: {selectedIncident.id}
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default IncidentsList;
