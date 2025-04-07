
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, ChevronRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Sample data for demonstration
const MOCK_MESSAGES = [
  {
    id: "msg1",
    sender: "Jane Cooper",
    content: "Hi there! Just checking in about tomorrow's shift.",
    timestamp: new Date(2025, 3, 5, 14, 30),
    read: false,
  },
  {
    id: "msg2",
    sender: "Robert Johnson",
    content: "The medication schedule has been updated. Please review.",
    timestamp: new Date(2025, 3, 4, 10, 15),
    read: false,
  },
  {
    id: "msg3",
    sender: "Sarah Miller",
    content: "Thanks for covering my shift last week!",
    timestamp: new Date(2025, 3, 3, 9, 45),
    read: true,
  },
  {
    id: "msg4",
    sender: "Michael Brown",
    content: "Please confirm you received the updated care protocol.",
    timestamp: new Date(2025, 3, 2, 16, 20),
    read: true,
  },
  {
    id: "msg5",
    sender: "Emily Wilson",
    content: "New training materials are available in the system.",
    timestamp: new Date(2025, 3, 1, 11, 10),
    read: true,
  }
];

const Messages = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleMessageClick = (id: string) => {
    console.log(`Message clicked: ${id}`);
    
    // Mark message as read
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
    
    // In a real app, navigate to message detail
    // navigate(`/messages/${id}`);
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <MainLayout title="Messages">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-700">Inbox</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="px-2 py-1">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {messages.map((message) => (
            <MessageCard 
              key={message.id}
              message={message}
              onClick={() => handleMessageClick(message.id)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

interface MessageCardProps {
  message: {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
    read: boolean;
  };
  onClick: () => void;
}

const MessageCard = ({ message, onClick }: MessageCardProps) => {
  const { sender, content, timestamp, read } = message;
  
  return (
    <Card 
      className={`bg-white border-0 shadow-sm hover:shadow-md transition-shadow ${!read ? 'border-l-4 border-l-sky-500' : ''}`} 
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <div className="p-2 rounded-full bg-sky-50 text-sky-500 mr-4">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className={`font-medium ${!read ? 'text-sky-800' : 'text-gray-800'}`}>{sender}</h3>
              <span className="text-xs text-gray-500">{format(timestamp, 'MMM d, h:mm a')}</span>
            </div>
            <p className={`text-sm mt-1 ${!read ? 'text-gray-800' : 'text-gray-500'}`}>{content}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Messages;
