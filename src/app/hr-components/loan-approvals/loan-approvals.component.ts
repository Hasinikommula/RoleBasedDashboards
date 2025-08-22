import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-loan-approvals',
  imports:[CommonModule,FormsModule,SidebarComponent],
  templateUrl: './loan-approvals.component.html',
  styleUrls: ['./loan-approvals.component.css']
})
export class LoanApprovalsComponent implements OnInit {
  loanRequests: any[] = [];

  constructor(private http: HttpClient,private profileService : ProfileService) {}

  ngOnInit() {
    this.getLoanRequests();
  }

  getLoanRequests() {
    this.http.get<any[]>('http://localhost:3000/loanApplications')
      .subscribe(data => this.loanRequests = data);
  }

  updateStatus(id: number, status: string) {
    this.http.patch(`http://localhost:3000/loanApplications/${id}`, { status })
      .subscribe(() => {
        alert(`Loan request ${status}`);
        this.getLoanRequests(); 
      });
  }
}
