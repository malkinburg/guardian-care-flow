
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Star, Calendar, CheckCircle } from "lucide-react";
import { Participant } from "@/types/participants";
import { useNavigate } from 'react-router-dom';

interface PotentialWorkersProps {
  date: string;
  jobTitle: string;
  potentialWorkers: Participant[];
  onContactWorker?: (workerId: string) => void;
}

const PotentialWorkers = ({ 
  date, 
  jobTitle, 
  potentialWorkers,
  onContactWorker 
}: PotentialWorkersProps) => {
  const navigate = useNavigate();
  
  const handleViewProfile = (workerId: string) => {
    navigate(`/participants`);
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <h3 className="font-medium text-sky-700 mb-3 flex items-center">
          <User className="h-4 w-4 mr-2" />
          Available Workers ({potentialWorkers.length})
        </h3>
        
        {potentialWorkers.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p>No available workers for this shift</p>
          </div>
        ) : (
          <div className="space-y-3">
            {potentialWorkers.map(worker => (
              <div 
                key={worker.id}
                className="flex flex-col p-3 bg-sky-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {worker.image ? (
                      <img 
                        src={worker.image} 
                        alt={worker.name} 
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-sky-700" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{worker.name}</p>
                      <div className="flex items-center text-amber-500 text-xs">
                        {Array(Math.floor(worker.rating || 0)).fill(0).map((_, i) => (
                          <Star key={i} fill="currentColor" className="h-3 w-3" />
                        ))}
                        <span className="ml-1 text-gray-600">({worker.rating?.toFixed(1)})</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 mb-2 flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-sky-500" />
                  <span>Available on this date</span>
                </div>
                
                <div className="text-xs mb-3 flex flex-wrap gap-1">
                  {worker.skills?.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-sky-200 text-sky-700 hover:bg-sky-50"
                    onClick={() => handleViewProfile(worker.id)}
                  >
                    View Profile
                  </Button>
                  <Button 
                    size="sm"
                    className="text-xs bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => onContactWorker?.(worker.id)}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" /> Assign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PotentialWorkers;
