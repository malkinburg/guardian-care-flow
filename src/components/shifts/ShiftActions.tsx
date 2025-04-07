
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlayCircle, StopCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface ShiftActionsProps {
  shiftId: string;
  shiftStatus: "scheduled" | "in_progress" | "completed" | "cancelled";
  onStartShift: () => void;
  onEndShift: () => void;
}

const ShiftActions = ({ 
  shiftId,
  shiftStatus, 
  onStartShift, 
  onEndShift 
}: ShiftActionsProps) => {
  const [isStarting, setIsStarting] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const { toast } = useToast();
  
  const handleStartShift = () => {
    setIsStarting(true);
    // In a real implementation, this would call an API
    setTimeout(() => {
      onStartShift();
      toast({
        title: "Shift started",
        description: `Shift started at ${format(new Date(), "h:mm a")}`
      });
      setIsStarting(false);
    }, 500);
  };
  
  const handleEndShift = () => {
    setIsEnding(true);
    // In a real implementation, this would call an API
    setTimeout(() => {
      onEndShift();
      toast({
        title: "Shift ended",
        description: `Shift ended at ${format(new Date(), "h:mm a")}`
      });
      setIsEnding(false);
    }, 500);
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-sky-500" />
            <div>
              <p className="font-medium text-sky-700">Shift Status</p>
              <p className={`text-sm ${
                shiftStatus === "scheduled" ? "text-blue-500" :
                shiftStatus === "in_progress" ? "text-amber-500" :
                shiftStatus === "completed" ? "text-green-500" : "text-red-500"
              }`}>
                {shiftStatus === "scheduled" ? "Scheduled" :
                 shiftStatus === "in_progress" ? "In Progress" :
                 shiftStatus === "completed" ? "Completed" : "Cancelled"}
              </p>
            </div>
          </div>
          
          {shiftStatus === "scheduled" && (
            <Button
              onClick={handleStartShift}
              disabled={isStarting}
              className="bg-green-500 hover:bg-green-600"
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Start Shift
            </Button>
          )}
          
          {shiftStatus === "in_progress" && (
            <Button
              onClick={handleEndShift}
              disabled={isEnding}
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-50"
            >
              <StopCircle className="h-4 w-4 mr-2" />
              End Shift
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftActions;
