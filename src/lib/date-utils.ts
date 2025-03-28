// Format date as "Mon, Jan 1"
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

// Format time as "9:00 AM"
export const formatTime = (timeString: string): string => {
  // If the timeString is already in the correct format (9:00 AM), return it
  if (timeString.includes('AM') || timeString.includes('PM')) {
    return timeString;
  }

  // Otherwise, parse it (e.g., from "09:00")
  const [hours, minutes] = timeString.split(':').map(Number);
  
  let period = 'AM';
  let hour = hours;
  
  if (hours >= 12) {
    period = 'PM';
    hour = hours === 12 ? 12 : hours - 12;
  }
  
  if (hour === 0) {
    hour = 12;
  }
  
  return `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Calculate shift duration in hours
export const calculateDuration = (startTime: string, endTime: string): number => {
  const parseTime = (time: string): number => {
    let hours = 0;
    let minutes = 0;
    
    if (time.includes('AM') || time.includes('PM')) {
      const [timePart, period] = time.split(' ');
      const [hourStr, minuteStr] = timePart.split(':');
      
      hours = parseInt(hourStr, 10);
      minutes = parseInt(minuteStr, 10);
      
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
    } else {
      const [hourStr, minuteStr] = time.split(':');
      hours = parseInt(hourStr, 10);
      minutes = parseInt(minuteStr, 10);
    }
    
    return hours + minutes / 60;
  };
  
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  
  return end - start;
};
