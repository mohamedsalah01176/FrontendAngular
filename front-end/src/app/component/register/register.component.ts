import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../util/services/auth.service'; 
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router:Router) {}

  successMessage: string | null = null;
  errorMessage: string | null = null;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('user', [Validators.required]) 
  });


  

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.getRawValue();
      this.authService.setRegisterForm(userData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          
          const message = response.message || 'Your account has been created';
          this.successMessage = message;
          this.errorMessage = null;  
          
          setTimeout(() => {
            this.successMessage = null;
          }, 4000);
  
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          
          const errorMessage = error?.error?.message || 'Registration failed. Please try again.';
          this.errorMessage = errorMessage;
          this.successMessage = null; 
          
          setTimeout(() => {
            this.errorMessage = null;
          }, 4000);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  
}
