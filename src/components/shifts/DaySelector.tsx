
import React from "react";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface DaySelectorProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
}

const DaySelector = ({ selectedDate, onDateSelect }: DaySelectorProps) => {
  const generateWeekDays = () => {
    const days = [];
    for (let i = -3; i <= 3; i++) {
      const date = i === 0 ? new Date() : i > 0 ? addDays(new Date(), i) : subDays(new Date(), Math.abs(i));
      days.push(date);
    }
    return days;
  };
  
  const weekDays = generateWeekDays();

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {weekDays.map((day, index) => (
          <CarouselItem key={index} className="pl-1 basis-1/5 sm:basis-1/7">
            <div className="p-1">
              <Card 
                className={`rounded-lg ${isSameDay(day, selectedDate || new Date()) ? 'bg-sky-100 border-sky-300' : 'bg-white'}`}
                onClick={() => onDateSelect(day)}
              >
                <CardContent className="flex flex-col items-center justify-center p-2">
                  <span className="font-medium">
                    {format(day, 'EEE')}
                  </span>
                  <span className={`text-xl font-bold ${isSameDay(day, new Date()) ? 'text-sky-600' : ''}`}>
                    {format(day, 'd')}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default DaySelector;
