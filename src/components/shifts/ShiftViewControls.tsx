
import React from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Filter, Calendar as CalendarViewIcon } from "lucide-react";

interface ShiftViewControlsProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  viewMode: "list" | "calendar";
  toggleViewMode: () => void;
  clearDateFilter: () => void;
  navigateToDashboard: () => void;
}

const ShiftViewControls = ({
  selectedDate,
  setSelectedDate,
  viewMode,
  toggleViewMode,
  clearDateFilter,
  navigateToDashboard,
}: ShiftViewControlsProps) => {
  return (
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
          onClick={navigateToDashboard}
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
    </div>
  );
};

export default ShiftViewControls;
