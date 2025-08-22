
import { Component, OnInit } from '@angular/core';
import { PerformanceService, Review } from '../../services/performance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports:[FormsModule,CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.performanceService.getReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.errorMessage = 'Failed to load reviews. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'bg-success';
      case 'Upcoming': return 'bg-info';
      default: return 'bg-secondary';
    }
  }
}