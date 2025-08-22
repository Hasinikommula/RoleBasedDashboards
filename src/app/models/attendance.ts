export interface Attendance {
      id: number;
  date: string; 
  status: string;
  checkIn?: string;
  checkOut?: string;
  location?: string;
  workingHours?: string;
}
