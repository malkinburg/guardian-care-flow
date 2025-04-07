
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StickyNote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MOCK_SHIFTS } from "@/data/mockShifts";
import QuickActionCard from "./QuickActionCard";

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

  const handleViewNotes = () => {
    navigate("/shifts", { state: { activeTab: "completed" } });
  };

  return (
    <QuickActionCard
      icon={<StickyNote className="h-5 w-5 text-sky-500" />}
      title="Shift Notes"
      description={isLoading ? 
        <Skeleton className="h-4 w-20" /> : 
        `${recentShiftsWithNotes.length} recent notes`
      }
      onClick={handleViewNotes}
    />
  );
};

export default ShiftNotesAccess;
