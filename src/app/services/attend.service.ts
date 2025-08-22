import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendance } from '../models/attendance';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendService {
  private apiUrl = 'http://localhost:3000/attend';

  constructor(private http: HttpClient) {}

  getAttendanceRecords(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl);
  }

  getRecordByDate(date: string): Observable<Attendance> {
    return this.http.get<Attendance>(`${this.apiUrl}?date=${date}`);
  }

updateAttendanceRecord(id: number, record: Attendance) {
  return this.http.put(`http://localhost:3000/attend/${id}`, record);
}


  generateCurrentMonth(): Observable<Attendance[]> {
    
    return of([]);
  }
  
addAttendanceRecord(record: Attendance) {
  return this.http.post<Attendance>('http://localhost:3000/attend', record);
}
}