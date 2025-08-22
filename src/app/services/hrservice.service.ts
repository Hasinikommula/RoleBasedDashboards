import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getLeaveRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/leaveRequests`);
  }

  updateLeaveRequest(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/leaveRequests/${id}`, data);
  }

  
}
