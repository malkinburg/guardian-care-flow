import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ShiftTabs from "@/components/shifts/ShiftTabs";
import ShiftViewControls from "@/components/shifts/ShiftViewControls";
import DaySelector from "@/components/shifts/DaySelector";
import CalendarView from "@/components/shifts/CalendarView";
import { AvailabilitySelector } from "@/components/shifts/AvailabilitySelector";
import { MOCK_SHIFTS } from "@/data/mockShifts";
import { format } from "date-fns";
import { ShiftProps } from "@/components/dashboard/ShiftCard";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

// Define the structure for filtered shifts to match ShiftTabsProps requirements
interface FilteredShifts {
  upcoming: ShiftProps[];
  available: ShiftProps[];
  completed: ShiftProps[];
}

const Shifts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab = location.state?.activeTab || "upcoming";
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filteredShifts, setFilteredShifts] = useState<FilteredShifts>({
    upcoming: MOCK_SHIFTS.upcoming,
    available: MOCK_SHIFTS.available,
    completed: MOCK_SHIFTS.completed
  });
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      
      const filtered: FilteredShifts = {
        upcoming: MOCK_SHIFTS.upcoming.filter(shift => shift.date === formattedDate),
        available: MOCK_SHIFTS.available.filter(shift => shift.date === formattedDate),
        completed: MOCK_SHIFTS.completed.filter(shift => shift.date === formattedDate)
      };
      
      setFilteredShifts(filtered);
    } else {
      setFilteredShifts({
        upcoming: MOCK_SHIFTS.upcoming,
        available: MOCK_SHIFTS.available,
        completed: MOCK_SHIFTS.completed
      });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (location.state?.activeTab) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleViewDetails = (id: string) => {
    navigate(`/shifts/${id}`);
  };

  const clearDateFilter = () => {
    setSelectedDate(undefined);
    setFilteredShifts({
      upcoming: MOCK_SHIFTS.upcoming,
      available: MOCK_SHIFTS.available,
      completed: MOCK_SHIFTS.completed
    });
  };

  const toggleViewMode = () => {
    setViewMode(current => current === "list" ? "calendar" : "list");
  };

  const navigateToDashboard = () => {
    navigate("/");
  };

  return (
    <MainLayout title="Shifts">
      <ShiftViewControls 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
        clearDateFilter={clearDateFilter}
        navigateToDashboard={navigateToDashboard}
      />

      {viewMode === "calendar" && (
        <div className="mb-4">
          <DaySelector 
            selectedDate={selectedDate} 
            onDateSelect={setSelectedDate} 
          />
        </div>
      )}

      <div className="px-4 mb-4">
        <Button 
          onClick={() => setAvailabilityModalOpen(true)}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white"
        >
          <Clock className="mr-2 h-4 w-4" />
          Set My Availability
        </Button>
      </div>

      {viewMode === "list" ? (
        <ShiftTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filteredShifts={filteredShifts}
          handleViewDetails={handleViewDetails}
          selectedDate={selectedDate}
        />
      ) : (
        <div className="px-4">
          <CalendarView 
            shifts={Object.values(MOCK_SHIFTS).flat()} 
            selectedDate={selectedDate || new Date()}
            onDateSelect={setSelectedDate}
          />
        </div>
      )}

      <AvailabilitySelector 
        isOpen={availabilityModalOpen} 
        onClose={() => setAvailabilityModalOpen(false)} 
      />
    </MainLayout>
  );
};

export default Shifts;
