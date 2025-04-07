
import { useState } from "react";
import { AlertTriangle, FileText, Filter, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Incident, IncidentStatus } from "@/types/incidents";
import MainLayout from "@/components/layout/MainLayout";
import IncidentsList from "@/components/incidents/IncidentsList";
import IncidentReportForm from "@/components/incidents/IncidentReportForm";
import { MOCK_INCIDENTS } from "@/data/mockIncidents";

const Incidents = () => {
  const [incidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<IncidentStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const filteredIncidents = incidents.filter(incident => {
    // Filter by status tab
    if (activeTab !== "all" && incident.status !== activeTab) {
      return false;
    }
    
    // Filter by severity
    if (severityFilter !== "all" && incident.severity !== severityFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !incident.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !incident.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const statusCounts = {
    all: incidents.length,
    reported: incidents.filter(i => i.status === "reported").length,
    investigating: incidents.filter(i => i.status === "investigating").length,
    resolved: incidents.filter(i => i.status === "resolved").length,
    closed: incidents.filter(i => i.status === "closed").length,
  };

  const handleCreateIncident = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <MainLayout title="Incident Reports">
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
            <h1 className="text-2xl font-bold">Incident Reports</h1>
          </div>
          
          <Button onClick={handleCreateIncident} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Report Incident
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <Tabs 
              defaultValue="all" 
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as IncidentStatus | "all")}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <TabsList className="mb-4 sm:mb-0">
                  <TabsTrigger value="all" className="relative">
                    All
                    <span className="ml-1 text-xs bg-gray-200 text-gray-800 rounded-full px-1.5 py-0.5">
                      {statusCounts.all}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="reported" className="relative">
                    Reported
                    {statusCounts.reported > 0 && (
                      <span className="ml-1 text-xs bg-blue-100 text-blue-800 rounded-full px-1.5 py-0.5">
                        {statusCounts.reported}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="investigating" className="relative">
                    Investigating
                    {statusCounts.investigating > 0 && (
                      <span className="ml-1 text-xs bg-purple-100 text-purple-800 rounded-full px-1.5 py-0.5">
                        {statusCounts.investigating}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="resolved" className="relative">
                    Resolved
                    {statusCounts.resolved > 0 && (
                      <span className="ml-1 text-xs bg-green-100 text-green-800 rounded-full px-1.5 py-0.5">
                        {statusCounts.resolved}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="closed" className="relative">
                    Closed
                    {statusCounts.closed > 0 && (
                      <span className="ml-1 text-xs bg-gray-200 text-gray-800 rounded-full px-1.5 py-0.5">
                        {statusCounts.closed}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search incidents..."
                      className="pl-8 w-full"
                    />
                    <FileText className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <Select
                      value={severityFilter}
                      onValueChange={setSeverityFilter}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <TabsContent value="all" className="mt-6">
                <IncidentsList incidents={filteredIncidents} />
              </TabsContent>
              
              <TabsContent value="reported" className="mt-6">
                <IncidentsList incidents={filteredIncidents} />
              </TabsContent>
              
              <TabsContent value="investigating" className="mt-6">
                <IncidentsList incidents={filteredIncidents} />
              </TabsContent>
              
              <TabsContent value="resolved" className="mt-6">
                <IncidentsList incidents={filteredIncidents} />
              </TabsContent>
              
              <TabsContent value="closed" className="mt-6">
                <IncidentsList incidents={filteredIncidents} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report New Incident</DialogTitle>
            <DialogDescription>
              Complete this form to report a workplace incident, accident, or near miss.
            </DialogDescription>
          </DialogHeader>
          <IncidentReportForm onSubmitSuccess={handleDialogClose} />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Incidents;
