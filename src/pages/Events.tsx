
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Events = () => {
  return (
    <MainLayout title="Events">
      <div className="p-4">
        <div className="mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Events Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90">
                View and manage upcoming events for participants and staff.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EventCard 
            title="Training Workshop" 
            date="2025-04-15" 
            location="Main Office" 
            category="Training"
          />
          <EventCard 
            title="Team Building" 
            date="2025-04-22" 
            location="City Park" 
            category="Social"
          />
          <EventCard 
            title="Community Picnic" 
            date="2025-05-10" 
            location="Riverside Park" 
            category="Community"
          />
        </div>
      </div>
    </MainLayout>
  );
};

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  category: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, location, category }) => {
  const formatEventDate = (dateString: string) => {
    const eventDate = new Date(dateString);
    return eventDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'training':
        return 'bg-blue-100 text-blue-700';
      case 'social':
        return 'bg-green-100 text-green-700';
      case 'community':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all transform hover:-translate-y-1 duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(category)}`}>
            {category}
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-700 font-medium">{formatEventDate(date)}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <div className="mt-3 pt-2 border-t">
          <button className="text-sm text-blue-600 font-medium">View Details</button>
        </div>
      </div>
    </Card>
  );
};

export default Events;
