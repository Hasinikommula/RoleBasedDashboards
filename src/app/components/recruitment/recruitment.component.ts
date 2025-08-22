import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recruitment',
  imports:[SidebarComponent,FormsModule,CommonModule],
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent {
  activeTab: string = 'openPositions';
  searchQuery: string = '';
  openPositions = [
    { title: 'Senior Full Stack Developer', dept: 'Engineering', location: 'Bangalore, India', exp: '3-5 years', salary: '₹12-18 LPA', posted: '1/15/2024', applied: false },
    { title: 'Product Marketing Manager', dept: 'Marketing', location: 'Mumbai, India / Remote', exp: '4-6 years', salary: '₹15-22 LPA', posted: '1/10/2024', applied: false },
    { title: 'UX/UI Designer', dept: 'Design', location: 'Hyderabad, India', exp: '2-4 years', salary: '₹8-14 LPA', posted: '1/12/2024', applied: false },
    { title: 'Data Scientist', dept: 'Analytics', location: 'Pune, India', exp: '3-5 years', salary: '₹14-20 LPA', posted: '1/8/2024', applied: false }
  ];
  myReferrals = [
    { name: 'Alex Johnson', role: 'Frontend Developer', dept: 'Engineering', referred: '1/10/2024', status: 'interview scheduled', bonus: '₹25,000' },
    { name: 'Sarah Wilson', role: 'Product Manager', dept: 'Product', referred: '1/5/2024', status: 'application review', bonus: '₹30,000' }
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  applyForPosition(index: number) {
    this.openPositions[index].applied = true;
  }

  getFilteredPositions() {
    return this.openPositions.filter(position =>
      position.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      position.dept.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      position.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}