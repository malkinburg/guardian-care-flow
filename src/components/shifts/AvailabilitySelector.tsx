
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface AvailabilitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimeSlot {
  start: number; // 0-24 hours
  end: number; // 0-24 hours
}

interface DayAvailability {
  date: Date;
  timeSlots: TimeSlot[];
}

export const AvailabilitySelector = ({ isOpen, onClose }: AvailabilitySelectorProps) => {
  const [selectedMode, setSelectedMode] = useState<"calendar" | "daily">("calendar");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [dailyAvailability, setDailyAvailability] = useState<DayAvailability[]>([]);
  const [currentTimeRange, setCurrentTimeRange] = useState<[number, number]>([9, 17]); // Default 9am-5pm
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Updated handler to receive Date[] as expected by Calendar in multiple mode
  const handleSelectDate = (dates: Date[] | undefined) => {
    if (!dates) return;
    setSelectedDates(dates);
  };

  const handleDaySelect = (date: Date) => {
    setSelectedDay(date);
    
    // Check if we already have availability for this day
    const existingAvailability = dailyAvailability.find(
      day => format(day.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    
    if (existingAvailability && existingAvailability.timeSlots.length > 0) {
      const firstSlot = existingAvailability.timeSlots[0];
      setCurrentTimeRange([firstSlot.start, firstSlot.end]);
    } else {
      // Reset to default range
      setCurrentTimeRange([9, 17]);
    }
  };

  const handleTimeRangeChange = (values: number[]) => {
    setCurrentTimeRange([values[0], values[1]]);
  };

  const addTimeSlot = () => {
    if (!selectedDay) return;
    
    setDailyAvailability(prev => {
      const dayIndex = prev.findIndex(day => 
        format(day.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd')
      );
      
      const newTimeSlot: TimeSlot = {
        start: currentTimeRange[0],
        end: currentTimeRange[1]
      };
      
      if (dayIndex >= 0) {
        // Update existing day
        const updatedDays = [...prev];
        updatedDays[dayIndex] = {
          ...updatedDays[dayIndex],
          timeSlots: [...updatedDays[dayIndex].timeSlots, newTimeSlot]
        };
        return updatedDays;
      } else {
        // Add new day
        return [...prev, {
          date: selectedDay,
          timeSlots: [newTimeSlot]
        }];
      }
    });
    
    // Reset time range for next slot
    setCurrentTimeRange([9, 17]);
  };

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    setDailyAvailability(prev => {
      const updatedDays = [...prev];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        timeSlots: updatedDays[dayIndex].timeSlots.filter((_, index) => index !== slotIndex)
      };
      return updatedDays;
    });
  };

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:00 ${period}`;
  };

  const handleSaveAvailability = () => {
    // In a real app, you'd save this to a database
    const totalDates = selectedMode === "calendar" 
      ? selectedDates.length 
      : dailyAvailability.length;
    
    toast.success(`Availability saved for ${totalDates} days`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Set Your Availability</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="calendar" value={selectedMode} onValueChange={(v) => setSelectedMode(v as "calendar" | "daily")}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="calendar">Calendar Mode</TabsTrigger>
            <TabsTrigger value="daily">Daily Hours</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-4">
            <p className="text-sm text-gray-500">Select the dates you're available to work</p>
            
            <div className="bg-white rounded-lg p-4 border">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={handleSelectDate}
                className="rounded-md pointer-events-auto"
                disabled={{before: new Date()}}
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {selectedDates.map((date, i) => (
                <Badge key={i} variant="outline" className="bg-sky-50">
                  {format(date, 'MMM d, yyyy')}
                </Badge>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="daily" className="space-y-4">
            <p className="text-sm text-gray-500">Set specific hours for each day</p>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {Array.from({length: 7}, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                return date;
              }).map((day, index) => (
                <Card 
                  key={index} 
                  className={`flex-shrink-0 cursor-pointer ${
                    selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') 
                      ? 'border-sky-400' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleDaySelect(day)}
                >
                  <CardContent className="flex flex-col items-center justify-center py-3 px-4">
                    <span className="text-sm font-medium">{format(day, 'EEE')}</span>
                    <span className="text-xl">{format(day, 'd')}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedDay && (
              <Card className="border-sky-100">
                <CardContent className="pt-4">
                  <div className="mb-4">
                    <h3 className="font-medium mb-1">{format(selectedDay, 'EEEE, MMMM d, yyyy')}</h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-500">Select time range:</p>
                      <Badge variant="outline" className="bg-sky-50">
                        {formatHour(currentTimeRange[0])} - {formatHour(currentTimeRange[1])}
                      </Badge>
                    </div>
                    
                    <div className="px-4 py-6">
                      <Slider
                        defaultValue={[9, 17]}
                        value={currentTimeRange}
                        onValueChange={handleTimeRangeChange}
                        max={24}
                        min={0}
                        step={0.5}
                        className="mt-4"
                      />
                      
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>12 AM</span>
                        <span>6 AM</span>
                        <span>12 PM</span>
                        <span>6 PM</span>
                        <span>12 AM</span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full mt-2 bg-sky-500 hover:bg-sky-600"
                      onClick={addTimeSlot}
                    >
                      Add Time Slot
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Added Time Slots:</h4>
                    <div className="space-y-2">
                      {dailyAvailability.map((day, dayIndex) => (
                        format(day.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd') &&
                        day.timeSlots.map((slot, slotIndex) => (
                          <div key={slotIndex} className="flex justify-between items-center bg-sky-50 p-2 rounded text-sm">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-sky-500" />
                              <span>{formatHour(slot.start)} - {formatHour(slot.end)}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))
                      ))}
                      
                      {!dailyAvailability.some(day => format(day.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd')) ||
                       !dailyAvailability.find(day => format(day.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd'))?.timeSlots.length && (
                        <p className="text-center text-sm text-gray-500 py-2">
                          No time slots added yet
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-end gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveAvailability} className="bg-sky-500 hover:bg-sky-600">
            Save Availability
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

