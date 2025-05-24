
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

interface ShiftsProps {
  initialTab?: string;
}

const Shifts = ({ initialTab }: ShiftsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locStateTab = location.state?.activeTab;
  
  const [activeTab, setActiveTab] = useState(initialTab || locStateTab || "upcoming");
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
      <div className="bg-gradient-to-br from-sky-500 via-sky-400 to-cyan-400 text-white mx-4 rounded-2xl p-6 mb-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-2 -translate-x-2"></div>
        
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Your Schedule</h2>
          <p className="text-white/80">Manage your shifts and availability</p>
        </div>
      </div>

      <ShiftViewControls 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
        clearDateFilter={clearDateFilter}
        navigateToDashboard={navigateToDashboard}
      />

      {viewMode === "calendar" && (
        <div className="mb-6 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <DaySelector 
              selectedDate={selectedDate} 
              onDateSelect={setSelectedDate} 
            />
          </div>
        </div>
      )}

      <div className="px-4 mb-6">
        <Button 
          onClick={() => setAvailabilityModalOpen(true)}
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white h-12 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Clock className="mr-2 h-5 w-5" />
          Set My Availability
        </Button>
      </div>

      {viewMode === "list" ? (
        <div className="px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <ShiftTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              filteredShifts={filteredShifts}
              handleViewDetails={handleViewDetails}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      ) : (
        <div className="px-4">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <CalendarView 
              shifts={Object.values(MOCK_SHIFTS).flat()} 
              selectedDate={selectedDate || new Date()}
              onDateSelect={setSelectedDate}
            />
          </div>
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
