import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayslipService } from '../../services/payslip.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AttendanceComponent } from "../attendance/attendance.component";
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SidebarComponent, AttendanceComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notifications: Notification[] = [];
  notificationCount: number = 0;
  showDropdown: boolean = false;

  selectedDate: Date = new Date();
  userName = 'Hasini';
  userRole = 'Employee';
  userDepartment = 'Department';
  employeeId = 'EMP001';
  currentDate: string = '';
  currentTime: string = '';
  leaveBalance: any[] = [];
  attendanceData: any;
  presentDays: any;
  absentDays: any;
  upcomingHolidays: any[] = [];
  payslip: any;
  checkInTime: string | null = null;
  checkOutTime: string | null = null;

  attendanceStatus: string = 'Absent';   
  constructor(
    private http: HttpClient,
    private payslipService: PayslipService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);


    this.http.get<any[]>('http://localhost:3000/leaveBalance')
      .subscribe(data => this.leaveBalance = data);

   
    this.http.get<any>('http://localhost:3000/dashboard')
      .subscribe(data => {
        this.attendanceData = data.attendanceRate;
        this.presentDays = data.presentDays;
        this.absentDays = data.absentDays;
      });

   
    this.http.get<any[]>('http://localhost:3000/upcomingHolidays')
      .subscribe(data => this.upcomingHolidays = data);


    this.payslipService.getPayslip().subscribe(data => this.payslip = data);

   
    this.loadNotifications();
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US');
  }

 
  loadNotifications() {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data.filter(n => !n.isRead);
      this.notificationCount = this.notifications.length;
    });
  }

  toggleNotifications() {
    this.showDropdown = !this.showDropdown;

    if (this.showDropdown) {
      
      this.notifications.forEach(n => {
        this.notificationService.markAsRead(n.id).subscribe(() => {
          this.loadNotifications();
        });
      });
    }
  }
}
