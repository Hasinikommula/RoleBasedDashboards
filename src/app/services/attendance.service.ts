import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  location: string;
  status: 'present' | 'absent' | 'leave' | 'half-day';
  workingHours: number | null;
}

export interface DailyStatus {
  employeeId: number;
  lastCheckIn: string;
  lastLocation: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3000/attendance';

  constructor(private http: HttpClient) {}

  
  checkIn(employeeId: number, location: string): Observable<AttendanceRecord> {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().substring(0, 5);
    
    return this.http.patch(`${this.apiUrl}/dailyStatus`, {
      lastCheckIn: new Date().toISOString(),
      lastLocation: location
    }).pipe(
      switchMap(() => {
        return this.http.post<AttendanceRecord>(`${this.apiUrl}/attendance`, {
          employeeId,
          date: today,
          checkIn: now,
          checkOut: null,
          location,
          status: 'present',
          workingHours: null
        });
      })
    );
  }

  checkOut(employeeId: number): Observable<AttendanceRecord> {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().substring(0, 5);
    
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/attendance?employeeId=${employeeId}&date=${today}`).pipe(
      map(records => {
        if (!records || records.length === 0) {
          throw new Error('No check-in record found for today');
        }
        return records[0];
      }),
      switchMap(record => {
        const workingHours = this.calculateWorkingHours(record.checkIn!, now);
        const updatedRecord = {
          ...record,
          checkOut: now,
          workingHours,
          status: workingHours >= 6 ? 'present' : 'half-day'
        };
        return this.http.put<AttendanceRecord>(`${this.apiUrl}/attendance/${record.id}`, updatedRecord);
      })
    );
  }

  getTodayStatus(employeeId: number): Observable<AttendanceRecord | null> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/attendance?employeeId=${employeeId}&date=${today}`).pipe(
      map(records => records.length > 0 ? records[0] : null)
    );
  }

  getDailyStatus(): Observable<DailyStatus> {
    return this.http.get<DailyStatus>(`${this.apiUrl}/dailyStatus`);
  }

  getAttendanceForMonth(employeeId: number, year: number, month: number): Observable<AttendanceRecord[]> {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endDate = `${year}-${month.toString().padStart(2, '0')}-31`;
    
    return this.http.get<AttendanceRecord[]>(
      `${this.apiUrl}/attendance?employeeId=${employeeId}&date_gte=${startDate}&date_lte=${endDate}`
    );
  }

  getAttendanceForDate(employeeId: number, date: string): Observable<AttendanceRecord | null> {
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/attendance?employeeId=${employeeId}&date=${date}`).pipe(
      map(records => records.length > 0 ? records[0] : null)
    );
  }

  private calculateWorkingHours(checkIn: string, checkOut: string): number {
    const [inH, inM] = checkIn.split(':').map(Number);
    const [outH, outM] = checkOut.split(':').map(Number);
    return (outH - inH) + (outM - inM) / 60;
  }
}