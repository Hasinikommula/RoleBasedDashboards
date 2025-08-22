import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-hr-dashboard',
  imports: [CommonModule, SidebarComponent],
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css']
})
export class HrDashboardComponent implements OnInit {
  pendingApprovals: Leave[] = [];
  approvedLeavesCount: number = 0;
  rejectedLeavesCount: number = 0;

 
  showNotifications = false;
  notificationCount = 0;

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
    
  }


  loadLeaveRequests() {
    this.leaveService.getLeaves().subscribe((data: Leave[]) => {
      this.pendingApprovals = data.filter(req => req.status === 'Pending');
      this.approvedLeavesCount = data.filter(req => req.status === 'Approved').length;
      this.rejectedLeavesCount = data.filter(req => req.status === 'Rejected').length;

      this.notificationCount = this.pendingApprovals.length; 
    });
  }


  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.notificationCount = 0; 
    }
  }


  approveRequest(request: Leave) {
    if (request.id) {
      this.leaveService.updateLeaveStatus(request.id, 'Approved').subscribe(() => {
        alert(`Approved leave for ${request.employeeName}`);
        this.loadLeaveRequests();
      });
    }
  }

  rejectRequest(request: Leave) {
    if (request.id) {
      this.leaveService.updateLeaveStatus(request.id, 'Rejected').subscribe(() => {
        alert(`Rejected leave for ${request.employeeName}`);
        this.loadLeaveRequests();
      });
    }
  }
}
