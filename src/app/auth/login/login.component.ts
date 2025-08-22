import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
       
        const token = res.token;
        let role: string = '';

       
        if (Array.isArray(res.roles) && res.roles.length > 0) {
          role = res.roles[0]; 
        } else if (typeof res.roles === 'string') {
          role = res.roles;
        }

        
        this.authService.saveToken(token,role);

       
        if (role.toLowerCase() === 'employee') {
          this.router.navigate(['dashboard']);
        } else if (role.toLowerCase() === 'hr') {
          this.router.navigate(['hr-dashboard']);
        } else {
          this.router.navigate(['/']); 
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}

