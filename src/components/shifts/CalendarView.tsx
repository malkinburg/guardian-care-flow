
import { useState } from "react";
import { ShiftProps } from "@/components/dashboard/ShiftCard";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

interface CalendarViewProps {
  shifts: ShiftProps[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarView = ({ shifts, selectedDate, onDateSelect }: CalendarViewProps) => {
  // Get unique dates with shifts
  const shiftDates = shifts.map(shift => new Date(shift.date));
  
  // Function to check if a date has shifts
  const hasShiftsOnDate = (date: Date) => {
    return shiftDates.some(shiftDate => isSameDay(shiftDate, date));
  };

  // Get shifts for the selected date
  const shiftsForSelectedDate = shifts.filter(shift => 
    isSameDay(new Date(shift.date), selectedDate)
  );

  // Helper function to safely format time
  const safeFormatTime = (timeString: string): string => {
    try {
      // Create a valid date object using the current day but with the specified time
      const [hours, minutes] = timeString.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return format(date, "h:mm a");
    } catch (error) {
      console.error("Error formatting time:", error, timeString);
      return timeString; // Return the original string if formatting fails
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onDateSelect(date)}
          className="rounded-md pointer-events-auto"
          modifiers={{
            hasShift: shiftDates
          }}
          modifiersStyles={{
            hasShift: {
              backgroundColor: "#e0f2fe",
              fontWeight: "bold",
              color: "#0284c7"
            }
          }}
        />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">
            Shifts on {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
            {shiftsForSelectedDate.length} shifts
          </Badge>
        </div>
        
        <div className="space-y-3">
          {shiftsForSelectedDate.length > 0 ? (
            shiftsForSelectedDate.map(shift => (
              <Card key={shift.id} className="border-sky-100">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{shift.clientName}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-sky-500" />
                        {shift.location}
                      </p>
                    </div>
                    <Badge className={
                      shift.status === "completed" ? "bg-green-100 text-green-700" : 
                      shift.status === "scheduled" ? "bg-blue-100 text-blue-700" : 
                      "bg-red-100 text-red-700"
                    }>
                      {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm flex justify-between">
                    <span className="text-sky-700 flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1 text-sky-500" />
                      {safeFormatTime(shift.startTime)} - {safeFormatTime(shift.endTime)}
                    </span>
                    <Button variant="link" className="h-auto p-0 text-sky-600">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No shifts scheduled for this date
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
