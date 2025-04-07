
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, Clock, Save } from "lucide-react";

interface ShiftNotesProps {
  shiftId: string;
  clientId: string;
  notes?: string;
  isEditing?: boolean;
  onSave?: (notes: string) => void;
}

const ShiftNotes = ({ 
  shiftId, 
  clientId, 
  notes: initialNotes = "",
  isEditing = false,
  onSave 
}: ShiftNotesProps) => {
  const [notes, setNotes] = useState(initialNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsSubmitting(true);
    // In a real implementation, this would call an API to save the notes
    setTimeout(() => {
      if (onSave) {
        onSave(notes);
      }
      toast({
        title: "Notes saved",
        description: "Your shift notes have been saved successfully."
      });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 mr-2 text-sky-500" />
          Shift Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter notes about tasks completed, client condition, or any important observations..."
          className="min-h-[120px] mb-3"
          disabled={!isEditing}
        />
        {isEditing && (
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Notes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShiftNotes;
