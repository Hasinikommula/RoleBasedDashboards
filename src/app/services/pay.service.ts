import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payslip {
  id: number;
  year: number;
  month: string;
  employeeName: string;
  basic: number;
  hra: number;
  allowance: number;
  deductions: number;
  netPay: number;
}

@Injectable({ providedIn: 'root' })
export class PayService {
  private apiUrl = 'http://localhost:3000/payslips';

  constructor(private http: HttpClient) {}

  getPayslips(): Observable<Payslip[]> {
    return this.http.get<Payslip[]>(this.apiUrl);
  }
}

