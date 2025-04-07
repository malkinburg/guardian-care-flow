
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, ArrowLeft, User, DollarSign, AlertCircle, Users } from "lucide-react";
import { formatDate, formatTime } from "@/lib/date-utils";
import { ShiftProps } from "@/components/dashboard/ShiftCard";
import { MOCK_SHIFTS, CLIENT_SHIFT_HISTORY } from "@/data/mockShifts";
import ShiftActions from "@/components/shifts/ShiftActions";
import ShiftNotes from "@/components/shifts/ShiftNotes";
import ClientShiftHistory from "@/components/shifts/ClientShiftHistory";
import ShiftResponseActions from "@/components/shifts/ShiftResponseActions";
import PotentialWorkers from "@/components/shifts/PotentialWorkers";
import { useToast } from "@/hooks/use-toast";
import { MOCK_PARTICIPANTS } from "@/data/mockParticipants";
import { Participant } from "@/types/participants";

const ShiftDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shift, setShift] = useState<ShiftProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [shiftStatus, setShiftStatus] = useState<"scheduled" | "in_progress" | "completed" | "cancelled">("scheduled");
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [shiftHistory, setShiftHistory] = useState<any[]>([]);
  const [linkedParticipants, setLinkedParticipants] = useState<Participant[]>([]);
  const [potentialWorkers, setPotentialWorkers] = useState<Participant[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true);
    
    // Simulate a short loading time
    setTimeout(() => {
      // Get all shifts from all categories (upcoming, available, completed)
      const allShifts = [
        ...MOCK_SHIFTS.upcoming,
        ...MOCK_SHIFTS.available,
        ...MOCK_SHIFTS.completed
      ];
      
      const foundShift = allShifts.find(shift => shift.id === id);
      
      if (foundShift) {
        setShift(foundShift);
        setShiftStatus(foundShift.status as "scheduled" | "in_progress" | "completed" | "cancelled");
        
        // Get shift history for this client
        const clientHistory = CLIENT_SHIFT_HISTORY[foundShift.clientName as keyof typeof CLIENT_SHIFT_HISTORY] || [];
        setShiftHistory(clientHistory);
        
        // If this is a completed shift, we might have some notes already
        if (foundShift.status === "completed" && foundShift.notes) {
          setNotes(foundShift.notes);
        }

        // Find matching participant for this client
        const matchingParticipant = MOCK_PARTICIPANTS.find(
          participant => participant.name === foundShift.clientName
        );
        
        // If found, set as the primary linked participant
        if (matchingParticipant) {
          setLinkedParticipants([matchingParticipant]);
        } else {
          // Otherwise show a sample of participants they might assist
          setLinkedParticipants(MOCK_PARTICIPANTS.slice(0, 1));
        }

        // For available shifts, find potential workers based on skills and availability
        if (foundShift.status === "available") {
          // Filter workers who are available on the shift date
          const availableWorkers = MOCK_PARTICIPANTS.filter(worker => 
            worker.availability?.includes(foundShift.date)
          );
          setPotentialWorkers(availableWorkers);
        }
      }
      setLoading(false);
    }, 500);
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

  const handleAcceptShift = () => {
    if (shift) {
      setShiftStatus("scheduled");
      // In a real app, this would update the backend
      toast({
        title: "Shift accepted",
        description: `You've successfully signed up for the shift with ${shift.clientName}.`
      });
      
      // Navigate to participants page
      setTimeout(() => {
        navigate("/participants");
      }, 1500);
    }
  };

  const handleDeclineShift = () => {
    // In a real app, this would update the backend
    toast({
      title: "Shift declined",
      description: "You've declined this shift opportunity."
    });
    
    // Navigate back to available shifts
    setTimeout(() => {
      navigate("/shifts", { state: { activeTab: "available" } });
    }, 1500);
  };

  const handleViewParticipantDetails = (participantId: string) => {
    // In a real app, this would navigate to the participant detail page
    toast({
      title: "Feature coming soon",
      description: "The participant detail view is coming soon."
    });
  };

  const handleContactWorker = (workerId: string) => {
    toast({
      title: "Worker contacted",
      description: "The worker has been notified about this shift opportunity."
    });
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
                  "bg-blue-100 text-blue-700"
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

          {/* Linked Participants Section */}
          {linkedParticipants.length > 0 && (
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-medium text-sky-700 flex items-center mb-3">
                  <Users className="h-4 w-4 mr-2" />
                  Linked Participants
                </h3>
                <div className="space-y-3">
                  {linkedParticipants.map(participant => (
                    <div 
                      key={participant.id}
                      className="flex items-center justify-between p-3 bg-sky-50 rounded-lg"
                      onClick={() => handleViewParticipantDetails(participant.id)}
                    >
                      <div className="flex items-center">
                        {participant.image ? (
                          <img 
                            src={participant.image} 
                            alt={participant.name} 
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-sky-700" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-xs text-gray-500">Age: {participant.age}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate('/participants')}
                        className="text-sky-700"
                      >
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Potential Workers for Available Shifts */}
          {shift.status === "available" && potentialWorkers.length > 0 && (
            <PotentialWorkers
              date={shift.date}
              jobTitle={shift.jobTitle || "Personal Care Assistant"}
              potentialWorkers={potentialWorkers}
              onContactWorker={handleContactWorker}
            />
          )}

          {/* Accept/Decline Actions for Available Shifts */}
          {shift.status === "available" && (
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-medium text-sky-700 mb-3">Respond to Shift Request</h3>
                <ShiftResponseActions
                  shiftId={shift.id}
                  onAccept={handleAcceptShift}
                  onDecline={handleDeclineShift}
                />
              </CardContent>
            </Card>
          )}

          {/* Shift Actions */}
          {shift.status !== "available" && (
            <ShiftActions 
              shiftId={shift.id}
              shiftStatus={shiftStatus}
              onStartShift={handleStartShift}
              onEndShift={handleEndShift}
            />
          )}

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
