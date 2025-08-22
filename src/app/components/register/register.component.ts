
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';


 export interface RegisterResponse {
  success: boolean;
  message?: string;
  errors?: string[];
  userId?: string;
}

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  errorMessage: string = '';
  successMessage: string = '';
  isLoading = false;

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role:['',[Validators.required]]
    }, { 
      validators: [this.passwordMatchValidator]
    });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  
  onSubmit(): void {
  if (this.registerForm.invalid || this.isLoading) {
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';
  this.successMessage = '';

  const registrationData = {
    username: this.registerForm.value.username,
    email: this.registerForm.value.email,
    phoneNumber: this.registerForm.value.phoneNumber,
    password: this.registerForm.value.password,
    confirmPassword: this.registerForm.value.confirmPassword,
    role: this.registerForm.value.role
  };

  console.log('Sending registration data:', registrationData); 
   
  this.authService.register(registrationData).subscribe({
    next: (response) => {
      console.log('Registration success:', response); 
      this.isLoading = false;
      this.successMessage = 'Registration successful! Redirecting to login...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    },
    error: (err) => {
      console.error('Registration error:', err); 
      this.isLoading = false;
      this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      if (err.error?.errors) {
        console.error('Validation errors:', err.error.errors); 
        this.errorMessage = err.error.errors.join(', ');
      }
    }
  });
}
}