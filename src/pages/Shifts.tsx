
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ShiftCard, { ShiftProps } from "@/components/dashboard/ShiftCard";
import { DatePicker } from "@/components/ui/date-picker";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filteredShifts, setFilteredShifts] = useState<{ [key: string]: ShiftProps[] }>(MOCK_SHIFTS);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedDate) {
      // Filter shifts based on the selected date
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      
      const filtered = Object.entries(MOCK_SHIFTS).reduce((acc, [key, shifts]) => {
        acc[key] = shifts.filter(shift => shift.date === formattedDate);
        return acc;
      }, {} as { [key: string]: ShiftProps[] });
      
      setFilteredShifts(filtered);
    } else {
      setFilteredShifts(MOCK_SHIFTS);
    }
  }, [selectedDate]);

  const handleViewDetails = (id: string) => {
    navigate(`/shifts/${id}`);
  };

  const clearDateFilter = () => {
    setSelectedDate(undefined);
    setFilteredShifts(MOCK_SHIFTS);
  };

  return (
    <MainLayout title="Shifts">
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <DatePicker 
            date={selectedDate}
            setDate={setSelectedDate}
            label="Filter by date"
            className="w-full max-w-xs"
          />
          {selectedDate && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearDateFilter}
              className="text-sky-600"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      <Tabs 
        defaultValue="upcoming" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4 bg-sky-50">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="available" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
            Available
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
            Completed
          </TabsTrigger>
        </TabsList>
        
        {["upcoming", "available", "completed"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4 px-4">
            {filteredShifts[tab]?.length ? (
              filteredShifts[tab].map((shift) => (
                <ShiftCard 
                  key={shift.id} 
                  {...shift} 
                  onViewDetails={handleViewDetails} 
                />
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <CalendarIcon className="mx-auto h-12 w-12 text-sky-300 mb-3" />
                <p className="text-muted-foreground font-medium">No {tab} shifts</p>
                {selectedDate && (
                  <p className="text-sm text-gray-500 mt-1">Try a different date or clear the filter</p>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </MainLayout>
  );
};

// Add the missing format function
import { format } from "date-fns";

export default Shifts;
