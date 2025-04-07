
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShiftCard, { ShiftProps } from "@/components/dashboard/ShiftCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Users } from "lucide-react";

interface ShiftTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  filteredShifts: {
    upcoming: ShiftProps[];
    available: ShiftProps[];
    completed: ShiftProps[];
  };
  handleViewDetails: (id: string) => void;
  selectedDate?: Date;
}

const ShiftTabs = ({ 
  activeTab,
  setActiveTab,
  filteredShifts,
  handleViewDetails,
  selectedDate
}: ShiftTabsProps) => {
  const isMobile = useIsMobile();

  // Count of available shifts (could be used for notification badge)
  const availableShiftCount = filteredShifts.available.length;
  
  return (
    <Tabs 
      defaultValue={activeTab} 
      value={activeTab}
      onValueChange={setActiveTab}
      className="px-4"
    >
      <TabsList className="w-full grid grid-cols-3 mb-4">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="available" className="relative">
          Available
          {availableShiftCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {availableShiftCount}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upcoming" className="space-y-4 mt-0 pb-20">
        {filteredShifts.upcoming.length > 0 ? (
          filteredShifts.upcoming.map(shift => (
            <ShiftCard
              key={shift.id}
              {...shift}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No upcoming shifts{selectedDate ? ' for the selected date' : ''}</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="available" className="space-y-4 mt-0 pb-20">
        {filteredShifts.available.length > 0 ? (
          <>
            {!selectedDate && (
              <div className="bg-purple-50 p-3 rounded-md text-purple-700 text-sm mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <p>These shifts are available for your participants. Respond quickly before they're taken!</p>
              </div>
            )}
            {filteredShifts.available.map(shift => (
              <ShiftCard
                key={shift.id}
                {...shift}
                onViewDetails={handleViewDetails}
              />
            ))}
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No available shifts{selectedDate ? ' for the selected date' : ''}</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="completed" className="space-y-4 mt-0 pb-20">
        {filteredShifts.completed.length > 0 ? (
          filteredShifts.completed.map(shift => (
            <ShiftCard
              key={shift.id}
              {...shift}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No completed shifts{selectedDate ? ' for the selected date' : ''}</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ShiftTabs;
