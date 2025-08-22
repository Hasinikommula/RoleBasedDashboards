import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-leave-approval',
  imports:[CommonModule,FormsModule,SidebarComponent],
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent implements OnInit {
  leaveRequests: any[] = [];

  constructor(private http: HttpClient,private profileService : ProfileService) {}

  ngOnInit() {
    this.getLeaveRequests();
  }

  getLeaveRequests() {
    this.http.get<any[]>('http://localhost:3000/leaveRequests')
      .subscribe(data => this.leaveRequests = data);
  }

  updateStatus(id: number, status: string) {
    this.http.patch(`http://localhost:3000/leaveRequests/${id}`, { status })
      .subscribe(() => {
        alert(`Leave request ${status}`);
        this.getLeaveRequests(); 
      });
  }
}
