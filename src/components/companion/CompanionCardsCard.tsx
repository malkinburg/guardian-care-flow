
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CompanionCardsCard = () => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow transform hover:-translate-y-1 duration-300 bg-gradient-to-b from-white to-indigo-50/50 border border-indigo-100/80"
      onClick={() => navigate("/companions")}
    >
      <div className="p-4 relative">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-100/80 to-transparent rounded-bl-full opacity-70"></div>
        
        <div className="flex items-center justify-between mb-2 relative z-10">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" />
            <h3 className="font-medium">Companion Cards</h3>
          </div>
          
          <Badge className="bg-indigo-100 text-indigo-700">
            4 Cards
          </Badge>
        </div>
        
        <div className="space-y-1 mt-2 text-sm relative z-10">
          <div className="flex justify-between items-center">
            <span>Digital Cards</span>
            <span className="font-medium text-indigo-600">2</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Physical Cards</span>
            <span className="font-medium text-indigo-600">2</span>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t flex items-center justify-end text-indigo-500 text-sm font-medium relative z-10">
          View Cards <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </div>
    </Card>
  );
};

export default CompanionCardsCard;
