
import { Component, OnInit } from '@angular/core';
import { PerformanceService, Feedback } from '../../services/performance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  imports:[CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.performanceService.getFeedback().subscribe({
      next: (feedback) => {
        this.feedbackList = feedback;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading feedback:', err);
        this.errorMessage = 'Failed to load feedback. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  getTypeClass(type: string): string {
    return type === 'Positive' ? 'bg-success' : 'bg-warning text-dark';
  }
}