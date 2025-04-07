
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ParticipantCard from "@/components/participants/ParticipantCard";
import { MOCK_PARTICIPANTS } from "@/data/mockParticipants";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Participants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    }
  }, [navigate]);

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

  return (
    <MainLayout title="My Participants">
      <div className="px-4 py-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-9 bg-white"
            placeholder="Search by name or support needs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4 pb-20">
          {participants.length > 0 ? (
            participants.map((participant) => (
              <ParticipantCard key={participant.id} participant={participant} />
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
