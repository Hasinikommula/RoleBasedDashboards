import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: 'On Track' | 'Achieved' | 'At Risk';
  dueDate: string;
}

export interface Review {
  id: number;
  title: string;
  status: 'Completed' | 'Upcoming';
  rating?: string;
  date: string;
  notes?: string;
}

export interface Feedback {
  id: number;
  from: string;
  role: string;
  date: string;
  content: string;
  type: 'Positive' | 'Constructive';
  tags: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  progress: number;
  goals: number;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

 
  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.apiUrl}/goals`);
  }

  
  addGoal(goal: Omit<Goal, 'id'>): Observable<Goal> {
    return this.http.post<Goal>(`${this.apiUrl}/goals`, goal);
  }

  
  updateGoal(id: number, goal: Partial<Goal>): Observable<Goal> {
    return this.http.patch<Goal>(`${this.apiUrl}/goals/${id}`, goal);
  }

 
  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/goals/${id}`);
  }

 
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews`);
  }

  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedback`);
  }

  
  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.apiUrl}/team`);
  }
}