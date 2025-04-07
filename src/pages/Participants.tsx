
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ParticipantCard from "@/components/participants/ParticipantCard";
import ParticipantAvailableShifts from "@/components/participants/ParticipantAvailableShifts";
import { MOCK_PARTICIPANTS } from "@/data/mockParticipants";
import { MOCK_SHIFTS } from "@/data/mockShifts";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShiftProps } from "@/components/dashboard/ShiftCard";
import { Badge } from "@/components/ui/badge";

const Participants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);
  const [availableShiftsMap, setAvailableShiftsMap] = useState<{[key: string]: ShiftProps[]}>({});
  const [totalAvailableShifts, setTotalAvailableShifts] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Match available shifts with participants based on matching names
    const availableShifts = MOCK_SHIFTS.available;
    const shiftsByParticipant: {[key: string]: ShiftProps[]} = {};
    let totalShifts = 0;
    
    participants.forEach(participant => {
      // Filter shifts for this participant
      const matchingShifts = availableShifts.filter(shift => 
        // Match by name or check if worker skills match the job
        shift.clientName === participant.name ||
        (participant.skills && participant.skills.some(skill => 
          shift.jobTitle?.includes(skill) || false
        ))
      );
      
      if (matchingShifts.length > 0) {
        shiftsByParticipant[participant.id] = matchingShifts;
        totalShifts += matchingShifts.length;
      }
    });
    
    setAvailableShiftsMap(shiftsByParticipant);
    setTotalAvailableShifts(totalShifts);
  }, [participants]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = MOCK_PARTICIPANTS.filter(participant => 
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.supportNeeds.some(need => 
          need.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setParticipants(filtered);
    } else {
      setParticipants(MOCK_PARTICIPANTS);
    }
  }, [searchTerm]);

  const handleViewAllShifts = () => {
    navigate('/shifts', { state: { activeTab: 'available' } });
  };

  return (
    <MainLayout title="My Participants">
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-9 bg-white"
              placeholder="Search by name or support needs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {totalAvailableShifts > 0 && (
            <Button 
              onClick={handleViewAllShifts}
              className="ml-2 bg-purple-600 hover:bg-purple-700 flex items-center"
              size="sm"
            >
              <Calendar className="h-4 w-4 mr-1" />
              <Badge className="bg-white text-purple-700 ml-1">
                {totalAvailableShifts}
              </Badge>
            </Button>
          )}
        </div>

        <div className="space-y-4 pb-20">
          {participants.length > 0 ? (
            participants.map((participant) => (
              <div key={participant.id} className="space-y-2">
                {availableShiftsMap[participant.id] && (
                  <ParticipantAvailableShifts
                    participantId={participant.id}
                    participantName={participant.name}
                    availableShifts={availableShiftsMap[participant.id]}
                  />
                )}
                <ParticipantCard participant={participant} />
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No participants matching your search</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Participants;
