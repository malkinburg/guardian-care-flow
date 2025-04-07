
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Plus, Clock, FileText, Download } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import InvoiceGenerator from "@/components/invoices/InvoiceGenerator";

// Sample data for timesheet entries
const CURRENT_WEEK_ENTRIES = [
  {
    id: "entry1",
    title: "Personal Care Session",
    clientName: "Sarah Johnson",
    date: "2025-04-07",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    totalHours: "2.0 hrs",
    activities: "Morning routine, medication administration, light housekeeping",
    status: "completed"
  }
];

const PENDING_APPROVALS = [
  {
    id: "pending1",
    date: "March 23, 2025",
    hours: "3 hours",
    status: "awaiting"
  }
];

const RECENT_ACTIVITY = [
  {
    id: "recent1",
    date: "March 22, 2025",
    hours: "4.5 hours",
    status: "approved"
  },
  {
    id: "recent2",
    date: "March 21, 2025",
    hours: "3.0 hours",
    status: "approved"
  }
];

const Timesheets = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("timesheet");
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleToggleSelectEntry = (entryId: string) => {
    setSelectedEntries(prev => 
      prev.includes(entryId) 
        ? prev.filter(id => id !== entryId)
        : [...prev, entryId]
    );
  };

  const handleViewInvoices = () => {
    navigate('/invoices');
  };

  const filteredEntries = CURRENT_WEEK_ENTRIES.filter(entry => 
    selectedEntries.length === 0 || selectedEntries.includes(entry.id)
  );

  return (
    <MainLayout title="Timesheet & Billing">
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger 
              value="timesheet" 
              className={cn(
                "text-base py-3 border-b-2", 
                activeTab === "timesheet" 
                  ? "border-sky-500 text-sky-600" 
                  : "border-transparent text-gray-500"
              )}
            >
              Timesheet
            </TabsTrigger>
            <TabsTrigger 
              value="billing"
              className={cn(
                "text-base py-3 border-b-2", 
                activeTab === "billing" 
                  ? "border-sky-500 text-sky-600" 
                  : "border-transparent text-gray-500"
              )}
            >
              Billing
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="timesheet" className="mt-0">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold">Current Week</h2>
                  <span className="text-sm font-normal text-gray-500">March 24-30, 2025</span>
                </div>
                
                {CURRENT_WEEK_ENTRIES.map((entry) => (
                  <Card key={entry.id} className="bg-white shadow-sm rounded-xl mb-3">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center">
                          <input 
                            type="checkbox"
                            className="mr-2 h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
                            checked={selectedEntries.includes(entry.id)}
                            onChange={() => handleToggleSelectEntry(entry.id)}
                          />
                          <h3 className="font-medium text-gray-800">{entry.title}</h3>
                        </div>
                        <span className="text-green-600 text-sm font-medium">Completed</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3 ml-6">with {entry.clientName}</p>
                      
                      <div className="flex justify-between text-sm mb-2 ml-6">
                        <div>
                          <p className="text-gray-500">Start Time</p>
                          <p className="font-medium">{entry.startTime}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">End Time</p>
                          <p className="font-medium">{entry.endTime}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total Hours</p>
                          <p className="font-medium">{entry.totalHours}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 ml-6">
                        <p className="text-sm text-gray-500">Activities:</p>
                        <p className="text-sm">{entry.activities}</p>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-white border border-sky-500 text-sky-600 hover:bg-sky-50" 
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Time Entry
                  </Button>
                  
                  <InvoiceGenerator timesheetEntries={filteredEntries.length > 0 ? filteredEntries : CURRENT_WEEK_ENTRIES} />
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-bold mb-3">Pending Approvals</h2>
                
                {PENDING_APPROVALS.map((item) => (
                  <Card key={item.id} className="bg-amber-50 border-amber-100 shadow-sm rounded-xl mb-3">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="flex h-2 w-2 bg-amber-500 rounded-full mr-2"></span>
                          <span className="font-medium text-amber-700">Awaiting Supervisor Approval</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{item.date} - {item.hours}</p>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div>
                <h2 className="text-lg font-bold mb-3">Recent Activity</h2>
                
                {RECENT_ACTIVITY.map((item) => (
                  <Card key={item.id} className="bg-white shadow-sm rounded-xl mb-3">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{item.date}</p>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500">{item.hours} - Approved</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="billing" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-sky-100 p-3 rounded-full mb-3">
                      <FileText className="h-6 w-6 text-sky-600" />
                    </div>
                    <h3 className="font-medium mb-2">Generate Invoices</h3>
                    <p className="text-sm text-gray-500 mb-4">Create invoices from your approved timesheets</p>
                    <InvoiceGenerator timesheetEntries={CURRENT_WEEK_ENTRIES} />
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 p-3 rounded-full mb-3">
                      <Download className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-medium mb-2">Invoice History</h3>
                    <p className="text-sm text-gray-500 mb-4">View and manage all your previous invoices</p>
                    <Button 
                      onClick={handleViewInvoices}
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      View All Invoices
                    </Button>
                  </div>
                </Card>
              </div>
              
              <Card className="p-4">
                <h3 className="font-medium mb-4">Billing Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-medium">$690.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Month</span>
                    <span className="font-medium">$1,240.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year to Date</span>
                    <span className="font-medium">$5,820.00</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Timesheets;
