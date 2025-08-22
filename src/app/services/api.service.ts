import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  
  getEmployeeProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/1`);
  }

  updateEmployeeProfile(profileData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/employees/1`, profileData);
  }

 
  getTodayAttendance(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/attendance?date=${date}`);
  }

  getAttendanceRecords(month: number, year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/attendance?month=${month}&year=${year}`);
  }

  clockIn(): Observable<any> {
    const clockInData = {
      date: new Date().toISOString().split('T')[0],
      clockIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Present'
    };
    return this.http.post(`${this.apiUrl}/attendance`, clockInData);
  }

  clockOut(): Observable<any> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.patch(`${this.apiUrl}/attendance?date=${today}`, {
      clockOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }

 
  getLeaveBalance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/1/leaveBalance`);
  }

  getLeaveRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees/1/leaveRequests`);
  }

  applyLeave(leaveData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/leaveRequests`, leaveData);
  }

  cancelLeaveRequest(requestId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/leaveRequests/${requestId}`);
  }


  getPayslips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees/1/payslips`);
  }

  downloadPayslip(payslipId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/payslips/${payslipId}/download`, { responseType: 'blob' });
  }

}