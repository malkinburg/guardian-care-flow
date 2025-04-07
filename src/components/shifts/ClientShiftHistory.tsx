
import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatTime } from "@/lib/date-utils";
import { Clock, Calendar, FileText } from "lucide-react";

interface ShiftHistoryEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
}

interface ClientShiftHistoryProps {
  clientId: string;
  clientName: string;
  shiftHistory: ShiftHistoryEntry[];
}

const ClientShiftHistory = ({ 
  clientId, 
  clientName, 
  shiftHistory 
}: ClientShiftHistoryProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 mr-2 text-sky-500" />
          Previous Shift Notes for {clientName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {shiftHistory.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {shiftHistory.map((shift) => (
              <AccordionItem key={shift.id} value={shift.id}>
                <AccordionTrigger className="hover:bg-sky-50 px-3 rounded-md">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{formatDate(shift.date)}</span>
                    <span className="text-sm text-gray-500">
                      {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-3 pb-3">
                  <div className="border-l-2 border-sky-200 pl-4 py-2 text-sm whitespace-pre-wrap">
                    {shift.notes}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No previous shift notes for {clientName}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientShiftHistory;
