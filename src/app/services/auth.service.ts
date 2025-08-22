 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthService {
  private apiUrl = 'http://localhost:29522/api/Auth'; 
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    this.currentUserSubject = new BehaviorSubject<any>(
      token && role ? { token, role } : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.currentUserSubject.next({ token, role });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isHR(): boolean {
    const role = this.getRole();
    return role ? role.toLowerCase() === 'hr' : false;
  }

  isEmployee(): boolean {
    const role = this.getRole();
    return role ? role.toLowerCase() === 'employee' : false;
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}


