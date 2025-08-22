import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getEmployeeData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employee`);
  }

  getLeaveBalance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/leaveBalance`);
  }

  getAttendance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/attendance`);
  }

  getHolidays(): Observable<any> {
    return this.http.get(`${this.apiUrl}/holidays`);
  }

  getPayslip(): Observable<any> {
    return this.http.get(`${this.apiUrl}/payslip`);
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`);
  }

  getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects`);
  }

  getAnnouncements(): Observable<any> {
    return this.http.get(`${this.apiUrl}/announcements`);
  }

  getCalendar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/calendar`);
  }

  deleteAnnouncement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/announcements/${id}`);
  }
}
