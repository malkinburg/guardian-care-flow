
import { format, parse, parseISO } from 'date-fns';

export const formatDate = (dateStr: string) => {
  try {
    // Handle different date formats
    if (dateStr.includes('-')) {
      // ISO format: YYYY-MM-DD
      const date = parseISO(dateStr);
      return format(date, 'MMM dd, yyyy');
    } else {
      // Already formatted or different format
      return dateStr;
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr;
  }
};

export const formatTime = (timeStr: string) => {
  try {
    // Check if the time has AM/PM indicator
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      return timeStr; // Already formatted
    }
    
    // Assuming timeStr is in 24-hour format like "14:00"
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeStr;
  }
};
