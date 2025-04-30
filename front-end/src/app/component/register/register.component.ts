import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.getRawValue();
      this.registerForm.reset();
      console.log('User Data:', userData);
      // Send to backend or handle registration
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}




// onSubmit() {
//   if (this.registerForm.valid) {
//     const userData = this.registerForm.getRawValue();
//     this.authService.registerUser(userData).subscribe({
//       next: (response) => {
//         console.log('Registration successful:', response);
//         this.registerForm.reset();
//       },
//       error: (error) => {
//         console.error('Registration failed:', error);
//       }
//     });
//   } else {
//     this.registerForm.markAllAsTouched();
//   }
// }

