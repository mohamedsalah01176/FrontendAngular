import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../util/services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  standalone: true,
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}
  oldPassword: string = '';
  newPassword: string = '';

  ngOnInit(): void {
    console.log(
      this.authService.changePassword(this.oldPassword, this.newPassword)
    );
  }
  onSubmit() {
    if (this.oldPassword && this.newPassword) {
      this.authService
        .changePassword(this.oldPassword, this.newPassword)
        .subscribe({
          next: (response) => {
            console.log('Password changed successfully', response);
            this.resetForm();
          },
          error: (error) => {
            console.error('Error changing password', error);
          },
        });
    }
  }

  private resetForm() {
    this.oldPassword = '';
    this.newPassword = '';
  }
}
