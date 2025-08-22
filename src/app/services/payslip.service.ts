import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayslipService {

 private apiUrl = 'http://localhost:3000/payslip';

  constructor(private http: HttpClient) {}

  getPayslip(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
