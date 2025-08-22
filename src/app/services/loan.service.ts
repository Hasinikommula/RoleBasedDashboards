import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:3000/loanApplications';

  constructor(private http: HttpClient) {}

  getLoanApplications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addLoanApplication(application: any): Observable<any> {
    return this.http.post(this.apiUrl, application);
  }
}
