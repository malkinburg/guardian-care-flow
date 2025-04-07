
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon } from "lucide-react";
import ShiftCard, { ShiftProps } from "@/components/dashboard/ShiftCard";

interface ShiftTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  filteredShifts: { [key: string]: ShiftProps[] };
  handleViewDetails: (id: string) => void;
  selectedDate: Date | undefined;
}

const ShiftTabs = ({ 
  activeTab, 
  setActiveTab, 
  filteredShifts, 
  handleViewDetails,
  selectedDate
}: ShiftTabsProps) => {
  return (
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
  );
};

export default ShiftTabs;
