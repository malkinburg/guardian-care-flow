
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ShiftTabs from "@/components/shifts/ShiftTabs";
import ShiftViewControls from "@/components/shifts/ShiftViewControls";
import DaySelector from "@/components/shifts/DaySelector";
import CalendarView from "@/components/shifts/CalendarView";
import { MOCK_SHIFTS } from "@/data/mockShifts";
import { format } from "date-fns";
import { ShiftProps } from "@/components/dashboard/ShiftCard";

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
    </MainLayout>
  );
};

export default Shifts;
