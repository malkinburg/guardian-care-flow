
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Participant } from "@/types/participants";
import { formatDate } from "@/lib/date-utils";
import { useNavigate } from "react-router-dom";

interface ParticipantCardProps {
  participant: Participant;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant }) => {
  const navigate = useNavigate();
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  const handleClick = () => {
    navigate(`/participants/${participant.id}`);
  };
  
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Avatar className="h-12 w-12 mr-3 border">
            <AvatarImage src={participant.image} alt={participant.name} />
            <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-lg">{participant.name}</h3>
            <p className="text-sm text-gray-500">{participant.age} years old</p>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex flex-wrap gap-1 mt-2">
            {participant.supportNeeds.slice(0, 2).map((need, index) => (
              <Badge key={index} variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
                {need}
              </Badge>
            ))}
            {participant.supportNeeds.length > 2 && (
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                +{participant.supportNeeds.length - 2} more
              </Badge>
            )}
          </div>
        </div>
        
        {participant.nextAppointment && (
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <Calendar className="h-4 w-4 mr-1 text-sky-500" />
            <span>Next: {formatDate(participant.nextAppointment)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
