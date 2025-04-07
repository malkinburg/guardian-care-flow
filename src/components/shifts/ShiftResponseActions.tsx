
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ShiftResponseActionsProps {
  shiftId: string;
  onAccept: () => void;
  onDecline: () => void;
}

const ShiftResponseActions = ({
  shiftId,
  onAccept,
  onDecline
}: ShiftResponseActionsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleAccept = () => {
    setIsSubmitting(true);
    // In a real implementation, this would call an API
    setTimeout(() => {
      onAccept();
      toast({
        title: "Shift accepted",
        description: "You have successfully accepted this shift"
      });
      setIsSubmitting(false);
    }, 500);
  };
  
  const handleDecline = () => {
    setIsSubmitting(true);
    // In a real implementation, this would call an API
    setTimeout(() => {
      onDecline();
      toast({
        title: "Shift declined",
        description: "You have declined this shift"
      });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="flex gap-2 w-full">
      <Button
        onClick={handleAccept}
        disabled={isSubmitting}
        className="flex-1 bg-green-500 hover:bg-green-600"
      >
        <Check className="h-4 w-4 mr-2" />
        Accept
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            disabled={isSubmitting}
            className="flex-1 border-red-300 text-red-500 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            Decline
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Once you decline this shift, it will be offered to other caregivers and may no longer be available to you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDecline}
              className="bg-red-500 hover:bg-red-600"
            >
              Yes, decline shift
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ShiftResponseActions;
