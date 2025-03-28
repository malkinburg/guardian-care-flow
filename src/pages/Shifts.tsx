
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import ShiftCard, { ShiftProps } from "@/components/dashboard/ShiftCard";

// Sample data for demonstration
const MOCK_SHIFTS: { [key: string]: ShiftProps[] } = {
  upcoming: [
    {
      id: "shift1",
      clientName: "John Smith",
      location: "123 Main St, Anytown",
      date: "2023-09-15",
      startTime: "9:00",
      endTime: "13:00",
      status: "scheduled",
    },
    {
      id: "shift2",
      clientName: "Sarah Johnson",
      location: "456 Oak Ave, Somecity",
      date: "2023-09-16",
      startTime: "14:00",
      endTime: "18:00",
      status: "scheduled",
    },
  ],
  available: [
    {
      id: "shift3",
      clientName: "Emily Wilson",
      location: "321 Elm St, Somewhere",
      date: "2023-09-17",
      startTime: "10:00",
      endTime: "14:00",
      status: "scheduled",
    },
    {
      id: "shift4",
      clientName: "Robert Davis",
      location: "789 Pine Rd, Anyville",
      date: "2023-09-18",
      startTime: "13:00",
      endTime: "17:00",
      status: "scheduled",
    },
  ],
  completed: [
    {
      id: "shift5",
      clientName: "Mary Thompson",
      location: "567 Cedar Lane, Othertown",
      date: "2023-09-10",
      startTime: "9:00",
      endTime: "13:00",
      status: "completed",
    },
    {
      id: "shift6",
      clientName: "James Wilson",
      location: "890 Maple Ave, Somewhere",
      date: "2023-09-12",
      startTime: "14:00",
      endTime: "18:00",
      status: "completed",
    },
  ],
};

const Shifts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    }
  }, [navigate]);

  const handleViewDetails = (id: string) => {
    navigate(`/shifts/${id}`);
  };

  return (
    <MainLayout title="Shifts">
      <Tabs 
        defaultValue="upcoming" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        {["upcoming", "available", "completed"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {MOCK_SHIFTS[tab]?.length ? (
              MOCK_SHIFTS[tab].map((shift) => (
                <ShiftCard 
                  key={shift.id} 
                  {...shift} 
                  onViewDetails={handleViewDetails} 
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No {tab} shifts</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </MainLayout>
  );
};

export default Shifts;
