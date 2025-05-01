import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Import Router for navigation
// import { LoginService } from './login.service'; // Import the LoginService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginError: string | null = null; // <-- error message variable

  router = inject(Router);

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Simulated login check
      if (email === 'test@example.com' && password === '123456') {
        //fack token
        localStorage.setItem(
          'userToken',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWUxZjI2NGE5MDQwMTY2YTk5Y'
        );
        // Clear any old error
        console.log('Login Successful');
        this.router.navigateByUrl('/home');
        this.loginError = null;
      } else {
        this.loginError = 'Incorrect email or password.';
      }

      // If using real loginService:
      /*
      this.loginService.login(email, password).subscribe(
        (response) => {
          this.loginError = null;
          this.router.navigate(['/home']);
        },
        (error) => {
          this.loginError = 'Incorrect email or password.';
        }
      );
      */
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
