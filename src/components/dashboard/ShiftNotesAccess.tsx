
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MOCK_SHIFTS } from "@/data/mockShifts";

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

  const handleViewAll = () => {
    navigate("/shifts", { state: { activeTab: "completed" } });
  };

  return (
    <Card className="mb-6 cursor-pointer hover:shadow-md transition-shadow" onClick={handleViewAll}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center justify-between">
          <div className="flex items-center">
            <StickyNote className="h-4 w-4 mr-2 text-sky-500" />
            Shift Notes
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-gray-500">
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : recentShiftsWithNotes.length > 0 ? (
            `${recentShiftsWithNotes.length} recent shift notes`
          ) : (
            "No shift notes available"
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export default ShiftNotesAccess;
