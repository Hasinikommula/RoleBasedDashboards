import { Component, OnInit } from '@angular/core';
import { format, startOfMonth, endOfMonth, isToday, isSameDay, isAfter } from 'date-fns';
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval';
import { AttendService } from '../../services/attend.service';
import { Attendance } from '../../models/attendance';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  imports: [FormsModule, CommonModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  currentDate = new Date();
  selectedDate: Date = new Date();
  calendarDays: { date: Date; day: number; status?: string }[] = [];
  attendanceRecords: Attendance[] = [];
  currentRecord?: Attendance;
  showStatusLegend = false;

  constructor(private attendanceService: AttendService) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.loadAttendanceData();
  }

  generateCalendar(): void {
    const start = startOfMonth(this.currentDate);
    const end = endOfMonth(this.currentDate);
    this.calendarDays = eachDayOfInterval({ start, end }).map(date => ({
      date,
      day: date.getDate(),
      status: this.getStatusForDate(date)
    }));
  }

  loadAttendanceData(): void {
    this.attendanceService.getAttendanceRecords().subscribe(records => {
      this.attendanceRecords = records;
      this.updateSelectedDateRecord();
      this.updateCalendarStatuses();
    });
  }

  updateCalendarStatuses(): void {
    this.calendarDays.forEach(day => {
      day.status = this.getStatusForDate(day.date);
    });
  }

  getStatusForDate(date: Date): string {
    const record = this.attendanceRecords.find(r => isSameDay(new Date(r.date), date));
    if (record) return record.status;
  
    if (!isAfter(date, this.currentDate)) return 'absent';
    return '';
  }

  onDateSelect(date: Date): void {
    this.selectedDate = date;
    this.updateSelectedDateRecord();
  }

  updateSelectedDateRecord(): void {
    
    if (isAfter(this.selectedDate, this.currentDate)) {
      this.currentRecord = undefined;
      return;
    }

    const formattedDate = format(this.selectedDate, 'yyyy-MM-dd');
    const existingRecord = this.attendanceRecords.find(r => r.date === formattedDate);

    if (existingRecord) {
      this.currentRecord = existingRecord;
    } else {
      this.currentRecord = {
        id: 0,
        date: formattedDate,
        status: 'absent', 
        checkIn: undefined,
        checkOut: undefined,
        location: 'Office',
        workingHours: '0h 0m'
      };
    }
  }

  checkIn(): void {
    if (!this.currentRecord) return;
    
    if (isAfter(this.selectedDate, this.currentDate)) return;

    const now = new Date();
    this.currentRecord.checkIn = format(now, 'HH:mm');
    this.currentRecord.status = 'present';
    this.currentRecord.location = 'Office';
    this.saveRecord();
  }

  checkOut(): void {
    if (!this.currentRecord) return;
    
    if (isAfter(this.selectedDate, this.currentDate)) return;

    const now = new Date();
    this.currentRecord.checkOut = format(now, 'HH:mm');
    this.currentRecord.workingHours = this.calculateWorkingHours();

    const totalMinutes = this.getMinutes(this.currentRecord.workingHours);

    if (totalMinutes >= 420) {
      this.currentRecord.status = 'present';
    } else if (totalMinutes >= 210) {
      this.currentRecord.status = 'half-day';
    } else {
      this.currentRecord.status = 'absent';
    }

    this.saveRecord();
  }

  private getMinutes(time: string): number {
    const [h, m] = time.split('h').map(x => parseInt(x.replace('m', '').trim()) || 0);
    return h * 60 + m;
  }

  saveRecord(): void {
    if (!this.currentRecord) return;

    const existingIndex = this.attendanceRecords.findIndex(r => r.date === this.currentRecord?.date);

    if (existingIndex > -1) {
      this.attendanceRecords[existingIndex] = this.currentRecord;
      this.attendanceService.updateAttendanceRecord(this.currentRecord.id, this.currentRecord).subscribe(() => {
        this.updateCalendarStatuses();
      });
    } else {
      this.attendanceService.addAttendanceRecord(this.currentRecord).subscribe((createdRecord) => {
        this.currentRecord!.id = createdRecord.id;
        this.attendanceRecords.push(this.currentRecord!);
        this.updateCalendarStatuses();
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'present': return 'present';
      case 'absent': return 'absent';
      case 'leave': return 'leave';
      case 'half-day': return 'half-day';
      default: return '';
    }
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return isSameDay(date1, date2);
  }

  calculateWorkingHours(): string {
    if (!this.currentRecord?.checkIn || !this.currentRecord?.checkOut) return '0h 0m';

    const [inH, inM] = this.currentRecord.checkIn.split(':').map(Number);
    const [outH, outM] = this.currentRecord.checkOut.split(':').map(Number);
    let mins = (outH * 60 + outM) - (inH * 60 + inM);
    if (mins < 0) mins += 24 * 60;

    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  }
}
