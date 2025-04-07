
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote, ChevronRight, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MOCK_SHIFTS } from "@/data/mockShifts";
import { formatDate } from "@/lib/date-utils";

interface ShiftNotesAccessProps {
  limit?: number;
}

const ShiftNotesAccess = ({ limit = 3 }: ShiftNotesAccessProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [recentShiftsWithNotes, setRecentShiftsWithNotes] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call to get recent shifts with notes
    setTimeout(() => {
      const completedShifts = [...MOCK_SHIFTS.completed]
        .filter(shift => shift.notes)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
      
      setRecentShiftsWithNotes(completedShifts);
      setIsLoading(false);
    }, 500);
  }, [limit]);

  const handleViewShift = (shiftId: string) => {
    navigate(`/shifts/${shiftId}`);
  };

  const handleViewAll = () => {
    navigate("/shifts", { state: { activeTab: "completed" } });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <StickyNote className="h-4 w-4 mr-2 text-sky-500" />
          Recent Shift Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(limit)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : recentShiftsWithNotes.length > 0 ? (
          <div className="space-y-3">
            {recentShiftsWithNotes.map(shift => (
              <div
                key={shift.id}
                className="border-l-2 border-sky-200 pl-3 py-1 cursor-pointer hover:bg-sky-50 rounded-sm"
                onClick={() => handleViewShift(shift.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{shift.clientName}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(shift.date)}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
            
            <Button
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-sky-600 border border-sky-100"
              onClick={handleViewAll}
            >
              View All Notes
            </Button>
          </div>
        ) : (
          <div className="text-center py-4 text-sm text-gray-500">
            No shift notes available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShiftNotesAccess;
