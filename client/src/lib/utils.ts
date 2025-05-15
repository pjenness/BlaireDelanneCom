import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | Date): string {
  let date: Date;
  
  if (typeof dateString === 'string') {
    try {
      date = parseISO(dateString);
    } catch (error) {
      date = new Date(dateString);
    }
  } else {
    date = dateString;
  }
  
  return format(date, 'MMMM d, yyyy');
}
