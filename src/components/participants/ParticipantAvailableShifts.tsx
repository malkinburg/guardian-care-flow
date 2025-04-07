
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { formatDate, formatTime } from "@/lib/date-utils";
import { useNavigate } from 'react-router-dom';
import { ShiftProps } from "@/components/dashboard/ShiftCard";

interface ParticipantAvailableShiftsProps {
  participantId: string;
  participantName: string;
  availableShifts: ShiftProps[];
}

const ParticipantAvailableShifts = ({ 
  participantId, 
  participantName, 
  availableShifts 
}: ParticipantAvailableShiftsProps) => {
  const navigate = useNavigate();
  
  if (availableShifts.length === 0) {
    return null;
  }

  const handleViewShift = (shiftId: string) => {
    navigate(`/shifts/${shiftId}`);
  };

  return (
    <Card className="bg-purple-50 border-purple-100 mb-4">
      <CardContent className="p-4">
        <h3 className="text-purple-700 font-medium mb-3">
          Available Shifts for {participantName}
        </h3>
        <div className="space-y-2">
          {availableShifts.map(shift => (
            <div 
              key={shift.id} 
              className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium">{shift.jobTitle || "Personal Care Assistant"}</p>
              </div>
              
              <div className="space-y-1 text-sm mb-3">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-2 text-purple-500" />
                  <span>{formatDate(shift.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-2 text-purple-500" />
                  <span>{formatTime(shift.startTime)} - {formatTime(shift.endTime)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-2 text-purple-500" />
                  <span>{shift.location}</span>
                </div>
              </div>
              
              <Button 
                size="sm" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => handleViewShift(shift.id)}
              >
                View & Respond
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipantAvailableShifts;
