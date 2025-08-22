import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userName = '';
  userRole = '';
  menuItems: any[] = [];

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit() {
    this.userRole = this.authService.getRole() || 'Employee';
    this.userName = this.getUserNameFromToken(); 
    this.loadMenu();
  }

  getUserNameFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); 
      return payload.unique_name || payload.name || ''; 
    } catch (e) {
      return '';
    }
  }

  loadMenu() {
    const employeeMenu = [
      { icon: 'bi-house', label: 'Dashboard', link: '/dashboard' },
      { icon: 'bi-person', label: 'My Profile', link: '/profile' },
      { icon: 'bi-calendar', label: 'Leave Management', link: '/leave-management' },
      { icon: 'bi-briefcase', label: 'Payslip', link: '/payslip' },
      { icon: 'bi-bar-chart-line', label: 'Performance', link: '/performance' },
      { icon: 'bi-mortarboard', label: 'Training', link: '/training' },
      { icon: 'bi-people', label: 'Recruitment', link: '/recruitment' },
      { icon: 'bi-airplane', label: 'Travel Requisition', link: '/travelrequisition' },
      { icon: 'bi-currency-dollar', label: 'Employee Loan', link: '/employee-loan' },
  
   
    ];

    const hrMenu = [
     
      
      { icon: 'bi-calendar-check', label: 'Leave Approvals', link: '/leave-approvals' },
      { icon: 'bi-airplane-engines', label: 'Travel Approvals', link: '/travel-approvals' },
      
      { icon: 'bi-currency-dollar', label: 'Loan Approvals', link: '/loan-approvals' }
      
    ];

    this.menuItems = this.userRole === 'hr' ? hrMenu : employeeMenu;
  }
  logout(): void {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    localStorage.removeItem("token"); 
    this.router.navigate(['/login']); 
  }
}
}
