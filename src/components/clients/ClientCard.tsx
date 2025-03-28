
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface ClientProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  profileImage?: string;
}

const ClientCard = ({ id, name, address, phone, profileImage }: ClientProps) => {
  const navigate = useNavigate();
  
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  const handleViewProfile = () => {
    navigate(`/clients/${id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">{address}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">{phone}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
