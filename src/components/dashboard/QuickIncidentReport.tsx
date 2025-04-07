
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import QuickActionCard from "./QuickActionCard";
import IncidentReportForm from "../incidents/IncidentReportForm";

const QuickIncidentReport = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleReportIncident = () => {
    setIsSheetOpen(true);
  };

  const handleSubmitSuccess = () => {
    setIsSheetOpen(false);
    // Navigate to incidents page after successful submission
    setTimeout(() => navigate("/incidents"), 500);
  };

  return (
    <>
      <QuickActionCard
        icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
        title="Report Incident"
        description="Report a workplace incident or near miss"
        onClick={handleReportIncident}
      />
      
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Report an Incident</SheetTitle>
            <SheetDescription>
              Complete this form to report a workplace incident, accident, or near miss.
            </SheetDescription>
          </SheetHeader>
          <IncidentReportForm onSubmitSuccess={handleSubmitSuccess} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default QuickIncidentReport;
