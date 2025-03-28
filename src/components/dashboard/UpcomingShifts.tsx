
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ShiftCard, { ShiftProps } from "./ShiftCard";

interface UpcomingShiftsProps {
  shifts: ShiftProps[];
}

const UpcomingShifts = ({ shifts }: UpcomingShiftsProps) => {
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    navigate(`/shifts/${id}`);
  };

  const handleViewAll = () => {
    navigate("/shifts");
  };

  if (!shifts.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No upcoming shifts</p>
        <Button onClick={() => navigate("/shifts/available")}>Browse Available Shifts</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upcoming Shifts</h2>
        <Button variant="ghost" size="sm" onClick={handleViewAll}>
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {shifts.map((shift) => (
          <ShiftCard 
            key={shift.id} 
            {...shift} 
            onViewDetails={handleViewDetails} 
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingShifts;
