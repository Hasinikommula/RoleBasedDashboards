import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResignationService {
  private apiUrl = 'http://localhost:3000/resignationSubmissions';

  constructor(private http: HttpClient) {}

  getResignationSubmissions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addResignationSubmission(submission: any): Observable<any> {
    return this.http.post(this.apiUrl, submission);
  }
}