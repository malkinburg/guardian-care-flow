
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, ArrowLeft, User, DollarSign, AlertCircle } from "lucide-react";
import { formatDate, formatTime } from "@/lib/date-utils";
import { ShiftProps } from "@/components/dashboard/ShiftCard";
import { MOCK_SHIFTS, CLIENT_SHIFT_HISTORY } from "@/data/mockShifts";
import ShiftActions from "@/components/shifts/ShiftActions";
import ShiftNotes from "@/components/shifts/ShiftNotes";
import ClientShiftHistory from "@/components/shifts/ClientShiftHistory";

const ShiftDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shift, setShift] = useState<ShiftProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [shiftStatus, setShiftStatus] = useState<"scheduled" | "in_progress" | "completed" | "cancelled">("scheduled");
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [shiftHistory, setShiftHistory] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true);
    
    // Simulate a short loading time
    setTimeout(() => {
      const allShifts = Object.values(MOCK_SHIFTS).flat();
      const foundShift = allShifts.find(shift => shift.id === id);
      
      if (foundShift) {
        setShift(foundShift);
        setShiftStatus(foundShift.status);
        
        // Get shift history for this client
        const clientHistory = CLIENT_SHIFT_HISTORY[foundShift.clientName as keyof typeof CLIENT_SHIFT_HISTORY] || [];
        setShiftHistory(clientHistory);
        
        // If this is a completed shift, we might have some notes already
        if (foundShift.status === "completed") {
          setNotes("Client was in good spirits today. Completed all scheduled activities and took medication as prescribed. Blood pressure was normal at 120/80.");
        }
      }
      setLoading(false);
    }, 300);
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleStartShift = () => {
    setShiftStatus("in_progress");
    setIsEditing(true);
  };

  const handleEndShift = () => {
    setShiftStatus("completed");
    // Keep in editing mode so they can finish their notes
  };

  const handleSaveNotes = (newNotes: string) => {
    setNotes(newNotes);
    setIsEditing(false);
    // In a real app, this would save to the backend
  };

  if (loading) {
    return (
      <MainLayout title="Shift Detail">
        <div className="flex items-center justify-center h-[70vh]">
          <div className="animate-pulse text-sky-600 flex flex-col items-center">
            <Clock className="h-10 w-10 mb-2" />
            <p>Loading shift details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!shift) {
    return (
      <MainLayout title="Shift Detail">
        <div className="p-4">
          <Button 
            variant="ghost" 
            className="mb-4 pl-0 text-sky-700" 
            onClick={handleBackClick}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shifts
          </Button>
          
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Shift Not Found</h2>
            <p className="text-gray-500 mb-4">The shift you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/shifts')}>
              View All Shifts
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Shift Detail">
      <div className="p-4">
        <Button 
          variant="ghost" 
          className="mb-4 pl-0 text-sky-700" 
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shifts
        </Button>

        <div className="space-y-4 mb-20">
          {/* Shift Header */}
          <Card className="bg-white rounded-xl overflow-hidden">
            <div className="bg-sky-50 p-4 border-b border-sky-100">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-semibold">{shift.jobTitle || "Personal Care Assistant"}</h1>
                  <div className="flex items-center mt-1">
                    <User className="h-4 w-4 text-sky-500 mr-1" />
                    <span className="text-sm text-gray-600">with {shift.clientName}</span>
                  </div>
                </div>
                <Badge className={
                  shiftStatus === "completed" ? "bg-green-100 text-green-700" : 
                  shiftStatus === "in_progress" ? "bg-amber-100 text-amber-700" : 
                  shiftStatus === "scheduled" ? "bg-blue-100 text-blue-700" :
                  "bg-red-100 text-red-700"
                }>
                  {shiftStatus.charAt(0).toUpperCase() + shiftStatus.slice(1).replace('_', ' ')}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="grid gap-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-sky-500" />
                  <span className="text-sm">{shift.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-sky-500" />
                  <span className="text-sm">{formatDate(shift.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-sky-500" />
                  <span className="text-sm">{formatTime(shift.startTime)} - {formatTime(shift.endTime)}</span>
                </div>
                {shift.payAmount && (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm font-medium text-green-600">${shift.payAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Shift Actions */}
          <ShiftActions 
            shiftId={shift.id}
            shiftStatus={shiftStatus}
            onStartShift={handleStartShift}
            onEndShift={handleEndShift}
          />

          {/* Current Shift Notes */}
          <ShiftNotes
            shiftId={shift.id}
            clientId="client1" // In a real app, this would be the client ID
            notes={notes}
            isEditing={isEditing || shiftStatus === "in_progress"}
            onSave={handleSaveNotes}
          />

          {/* Previous Shift Notes */}
          <ClientShiftHistory
            clientId="client1" // In a real app, this would be the client ID
            clientName={shift.clientName}
            shiftHistory={shiftHistory}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ShiftDetail;
