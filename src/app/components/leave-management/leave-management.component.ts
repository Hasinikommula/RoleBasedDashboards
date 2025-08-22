import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave';

@Component({
  selector: 'app-leave-management',
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
  leaveForm!: FormGroup;
  showForm = false;
  leaveRequests: Leave[] = [];
  activeTab: string = 'requests'; 
  todayStr = '';

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    const today = new Date();
    this.todayStr = today.toISOString().split('T')[0]; // yyyy-MM-dd

    this.leaveForm = this.fb.group({
      leaveType: ['Sick Leave', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      daysRequested: [0, [Validators.required, Validators.min(1)]],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  this.loadLeaves();
  const storedTab = localStorage.getItem('activeLeaveTab');
  if (storedTab) this.activeTab = storedTab;
}


  toggleForm() {
    this.showForm = !this.showForm;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    localStorage.setItem('activeLeaveTab', tab);
  }

  calculateDaysDifference() {
    const start = new Date(this.leaveForm.value.startDate);
    const end = new Date(this.leaveForm.value.endDate);

    if (this.leaveForm.value.startDate && this.leaveForm.value.endDate && end >= start) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      this.leaveForm.patchValue({ daysRequested: diffDays });
    } else {
      this.leaveForm.patchValue({ daysRequested: 0 });
    }
  }

submitLeave() {
  if (this.leaveForm.valid) {
    const newLeave: Leave = {
      ...this.leaveForm.value,
      status: 'Pending'
    };

    this.leaveService.addLeave(newLeave).subscribe(() => {
      alert('Leave request submitted!');
      this.loadLeaves();
      this.leaveForm.reset({ leaveType: 'Sick Leave', daysRequested: 0 });
      this.showForm = false;
      this.setActiveTab('requests');
    });
  } else {
    this.leaveForm.markAllAsTouched();
  }
}
  

  cancel() {
    this.leaveForm.reset({ leaveType: 'Sick Leave', daysRequested: 0 });
    this.showForm = false;
  }

  get approvedLeaves() {
    return this.leaveRequests.filter(req => req.status === 'Approved');
  }

  get rejectedLeaves() {
    return this.leaveRequests.filter(req => req.status === 'Rejected');
  }

  get pendingLeaves() {
    return this.leaveRequests.filter(req => req.status === 'Pending');
  }

  get myLeaves() {
    return this.leaveRequests;
  }
  onDateChange() {
  const start = new Date(this.leaveForm.get('startDate')?.value);
  const end = new Date(this.leaveForm.get('endDate')?.value);

  if (start && end && start <= end) {
    const diff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    this.leaveForm.get('daysRequested')?.setValue(diff);
  }

  this.leaveForm.setErrors(null);
  if (start > end) {
    this.leaveForm.setErrors({ invalidRange: true });
  } else if (
    this.leaveForm.get('daysRequested')?.value !==
    Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  ) {
    this.leaveForm.setErrors({ daysMismatch: true });
  }
}
loadLeaves() {
  this.leaveService.getLeaves().subscribe(data => {
    this.leaveRequests = data;
  });
}

}

