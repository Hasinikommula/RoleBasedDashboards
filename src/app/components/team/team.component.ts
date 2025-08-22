import { Component, OnInit } from '@angular/core';
import { PerformanceService, TeamMember } from '../../services/performance.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team',
  imports:[CommonModule,FormsModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  isLoading = true;

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.loadTeamMembers();
  }

  loadTeamMembers(): void {
    this.isLoading = true;
    this.performanceService.getTeamMembers().subscribe({
      next: (members) => {
        this.teamMembers = members;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load team members', err);
        this.isLoading = false;
        alert('Failed to load team members');
      }
    });
  }
}