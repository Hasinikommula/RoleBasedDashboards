import { Component, OnInit } from '@angular/core';
import { PerformanceService, Goal } from '../../services/performance.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goals',
  imports:[FormsModule,CommonModule],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  goals: Goal[] = [];
  isLoading = true;
  showAddModal = false;
  newGoal: Partial<Goal> = {
    title: '',
    description: '',
    progress: 0,
    status: 'On Track'
  };

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    this.isLoading = true;
    this.performanceService.getGoals().subscribe({
      next: (goals: Goal[]) => {
        this.goals = goals;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load goals', err);
        this.isLoading = false;
        alert('Failed to load goals');
      }
    });
  }

  openAddGoalModal(): void {
    this.showAddModal = true;
  }

  closeAddGoalModal(): void {
    this.showAddModal = false;
    this.newGoal = {
      title: '',
      description: '',
      progress: 0,
      status: 'On Track'
    };
  }

  addGoal(): void {
    if (!this.newGoal.title || !this.newGoal.description) {
      alert('Title and description are required');
      return;
    }

    this.performanceService.addGoal(this.newGoal as Omit<Goal, 'id'>).subscribe({
      next: () => {
        this.closeAddGoalModal();
        this.loadGoals();
        alert('Goal added successfully');
      },
      error: (err: HttpErrorResponse) => { 
        console.error('Failed to add goal', err);
        alert('Failed to add goal');
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'On Track': return 'bg-success';
      case 'Achieved': return 'bg-primary';
      case 'At Risk': return 'bg-warning text-dark';
      default: return 'bg-secondary';
    }
  }
}