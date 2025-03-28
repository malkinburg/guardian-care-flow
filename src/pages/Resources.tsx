
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Book, Video, Download, ChevronRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";

// Sample data for demonstration
const MOCK_RESOURCES = [
  {
    id: "resource1",
    title: "Caregiver Handbook",
    description: "Essential guidelines and protocols for care providers",
    type: "document",
    icon: FileText,
  },
  {
    id: "resource2",
    title: "First Aid Refresher",
    description: "Quick reference guide for emergency situations",
    type: "guide",
    icon: Book,
  },
  {
    id: "resource3",
    title: "Patient Transfer Training",
    description: "Video tutorial on safe transfer techniques",
    type: "video",
    icon: Video,
  },
  {
    id: "resource4",
    title: "Care Report Templates",
    description: "Downloadable templates for daily reports",
    type: "download",
    icon: Download,
  },
];

const Resources = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleResourceClick = (id: string) => {
    console.log(`Resource clicked: ${id}`);
    // Navigate to resource detail page
    // navigate(`/resources/${id}`);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <MainLayout title="Resources">
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {MOCK_RESOURCES.map((resource) => (
            <ResourceCard 
              key={resource.id}
              resource={resource}
              onClick={() => handleResourceClick(resource.id)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    type: string;
    icon: React.ComponentType<any>;
  };
  onClick: () => void;
}

const ResourceCard = ({ resource, onClick }: ResourceCardProps) => {
  const { icon: Icon, title, description, type } = resource;
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'text-blue-500 bg-blue-50';
      case 'guide':
        return 'text-purple-500 bg-purple-50';
      case 'video':
        return 'text-red-500 bg-red-50';
      case 'download':
        return 'text-green-500 bg-green-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className={`p-2 rounded-lg mr-4 ${getTypeColor(type)}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Resources;
