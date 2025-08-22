export interface Leave {
    employeeName: string;
    id?: number;
    leaveType: string;
  startDate: string;
  endDate: string;
  daysRequested: number;
  reason: string;
  status: 'Approved' | 'Rejected' | 'Pending';
}
