import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payslip',
  imports:[SidebarComponent,FormsModule,CommonModule],
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {
  years = ['2025'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  selectedYear = '';
  selectedMonth = '';
  selectedPayslip: any = null;
  payslipData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
   
    this.http.get<any>('http://localhost:3000/payslips').subscribe({
      next: (data) => {
        this.payslips = data;
        this.updatePayslip();
      },
      error: (error) => {
        console.error('Error fetching payslips:', error);
      }
    });
  }
  payslips: any[] = [];
 

  onYearChange(event: Event) {
    this.selectedYear = (event.target as HTMLSelectElement).value;
    this.updatePayslip();
  }

  onMonthChange(event: Event) {
    this.selectedMonth = (event.target as HTMLSelectElement).value;
    this.updatePayslip();
  }

  updatePayslip() {
    if (this.selectedYear && this.selectedMonth) {
      this.selectedPayslip = this.payslips.find(p => p.year === this.selectedYear && p.month === this.selectedMonth);
      if (this.selectedPayslip) {
        this.payslipData = { ...this.selectedPayslip };
      }
    } else {
      this.selectedPayslip = null;
      this.payslipData = {};
    }
  }

  downloadPayslip() {
    if (this.selectedPayslip) {
      console.log(`Downloading payslip for ${this.selectedMonth} ${this.selectedYear}`);
      
    }
  }
}