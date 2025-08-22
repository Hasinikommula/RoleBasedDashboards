import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-loan',
  imports: [SidebarComponent,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './employee-loan.component.html',
  styleUrls: ['./employee-loan.component.css']
})
export class EmployeeLoanComponent {
  loanForm: FormGroup;
  showForm: boolean = false;
  loanApplications: any[] = [];
  minDate: string;

  constructor(private fb: FormBuilder, private loanService: LoanService) {
   
    const today = new Date('2025-08-06T09:06:00+05:30').toISOString().split('T')[0];
    this.minDate = today;

    this.loanForm = this.fb.group({
      loanAmount: ['', [Validators.required, Validators.min(1)]],
      repaymentPeriod: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      reason: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.loadLoanApplications();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    if (this.loanForm.valid) {
      const application = {
        date: new Date().toISOString().split('T')[0],
        amount: `₹${this.loanForm.value.loanAmount}`,
        repayment: `${this.loanForm.value.repaymentPeriod} Months`,
        status: 'Pending',
        reason: this.loanForm.value.reason
      };
      this.loanService.addLoanApplication(application).subscribe(() => {
        this.loadLoanApplications();
        this.loanForm.reset();
        this.showForm = false;
      });
    }
  }

  loadLoanApplications() {
    this.loanService.getLoanApplications().subscribe(data => {
      this.loanApplications = data;
    });
  }
}
