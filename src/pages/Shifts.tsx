import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Filter, Calendar as CalendarViewIcon } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ShiftCard, { ShiftProps } from "@/components/dashboard/ShiftCard";
import { DatePicker } from "@/components/ui/date-picker";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import CalendarView from "@/components/shifts/CalendarView";

const MOCK_SHIFTS: { [key: string]: ShiftProps[] } = {
  upcoming: [
    {
      id: "shift1",
      clientName: "John Smith",
      location: "123 Main St, Anytown",
      date: "2025-04-08",
      startTime: "9:00",
      endTime: "13:00",
      status: "scheduled",
    },
    {
      id: "shift2",
      clientName: "Sarah Johnson",
      location: "456 Oak Ave, Somecity",
      date: "2025-04-09",
      startTime: "14:00",
      endTime: "18:00",
      status: "scheduled",
    },
    {
      id: "shift3",
      clientName: "David Wilson",
      location: "789 Pine Rd, Somewhere",
      date: "2025-04-11",
      startTime: "10:00",
      endTime: "15:00",
      status: "scheduled",
    },
  ],
  available: [
    {
      id: "shift4",
      clientName: "Emily Wilson",
      location: "321 Elm St, Somewhere",
      date: "2025-04-10",
      startTime: "10:00",
      endTime: "14:00",
      status: "scheduled",
    },
    {
      id: "shift5",
      clientName: "Robert Davis",
      location: "789 Pine Rd, Anyville",
      date: "2025-04-14",
      startTime: "13:00",
      endTime: "17:00",
      status: "scheduled",
    },
    {
      id: "shift6",
      clientName: "Olivia Garcia",
      location: "245 Cedar Ave, Othertown",
      date: "2025-04-15",
      startTime: "9:00",
      endTime: "12:00",
      status: "scheduled",
    },
  ],
  completed: [
    {
      id: "shift7",
      clientName: "Mary Thompson",
      location: "567 Cedar Lane, Othertown",
      date: "2025-04-03",
      startTime: "9:00",
      endTime: "13:00",
      status: "completed",
    },
    {
      id: "shift8",
      clientName: "James Wilson",
      location: "890 Maple Ave, Somewhere",
      date: "2025-04-02",
      startTime: "14:00",
      endTime: "18:00",
      status: "completed",
    },
    {
      id: "shift9",
      clientName: "Patricia Moore",
      location: "432 Birch St, Anyplace",
      date: "2025-04-01",
      startTime: "10:00",
      endTime: "14:30",
      status: "completed",
    },
  ],
};

const Shifts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filteredShifts, setFilteredShifts] = useState<{ [key: string]: ShiftProps[] }>(MOCK_SHIFTS);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedDate) {
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

  const toggleViewMode = () => {
    setViewMode(current => current === "list" ? "calendar" : "list");
  };

  const generateWeekDays = () => {
    const days = [];
    for (let i = -3; i <= 3; i++) {
      const date = i === 0 ? new Date() : i > 0 ? addDays(new Date(), i) : subDays(new Date(), Math.abs(i));
      days.push(date);
    }
    return days;
  };
  
  const weekDays = generateWeekDays();

  return (
    <MainLayout title="Shifts">
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-sky-200 hover:bg-sky-50"
            onClick={toggleViewMode}
          >
            {viewMode === "list" ? <CalendarViewIcon className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
            {viewMode === "list" ? "Calendar View" : "List View"} 
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="bg-sky-500 text-white hover:bg-sky-600"
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </Button>
        </div>

        {viewMode === "list" && (
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
        )}

        {viewMode === "calendar" && (
          <div className="mb-4">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {weekDays.map((day, index) => (
                  <CarouselItem key={index} className="pl-1 basis-1/5 sm:basis-1/7">
                    <div className="p-1">
                      <Card 
                        className={`rounded-lg ${isSameDay(day, selectedDate || new Date()) ? 'bg-sky-100 border-sky-300' : 'bg-white'}`}
                        onClick={() => setSelectedDate(day)}
                      >
                        <CardContent className="flex flex-col items-center justify-center p-2">
                          <span className="font-medium">
                            {format(day, 'EEE')}
                          </span>
                          <span className={`text-xl font-bold ${isSameDay(day, new Date()) ? 'text-sky-600' : ''}`}>
                            {format(day, 'd')}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>

      {viewMode === "list" ? (
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
      ) : (
        <div className="px-4">
          <CalendarView 
            shifts={Object.values(MOCK_SHIFTS).flat()} 
            selectedDate={selectedDate || new Date()}
            onDateSelect={setSelectedDate}
          />
        </div>
      )}
    </MainLayout>
  );
};

export default Shifts;
