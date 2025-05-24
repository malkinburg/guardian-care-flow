
import React from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Filter, Calendar as CalendarViewIcon, ArrowLeft } from "lucide-react";

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
    <div className="px-4 mb-6">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-sky-200 hover:bg-sky-50 rounded-xl h-10 px-4"
          onClick={toggleViewMode}
        >
          {viewMode === "list" ? <CalendarViewIcon className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
          {viewMode === "list" ? "Calendar" : "List"} 
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-gray-800 text-white hover:bg-gray-900 rounded-xl h-10 px-4"
          onClick={navigateToDashboard}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </div>

      {viewMode === "list" && (
        <div className="flex items-center justify-between mb-4 bg-white rounded-2xl shadow-lg p-4">
          <DatePicker 
            date={selectedDate}
            setDate={setSelectedDate}
            label="Filter by date"
            className="flex-1"
          />
          {selectedDate && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearDateFilter}
              className="text-sky-600 hover:bg-sky-50 ml-3 rounded-xl"
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
