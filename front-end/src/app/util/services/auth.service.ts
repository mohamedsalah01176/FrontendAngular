import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _Router = inject(Router);
  private http = inject(HttpClient);
  userData = null;
  private baseUrl = 'http://localhost:4000/api/auth';
  setRegisterForm(data: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  setLoginForm(data: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, data);
  }



  getTokenFromCookies(): string | null {
    const matches = document.cookie.match(/(?:^|; )userToken=([^;]*)/);
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken')) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }
  logOut(): void {
    document.cookie =
      'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.userData = null;
    this._Router.navigate(['/login']);
  }
  sendVerificationCode(email: string) {
    return this.http.post(`${this.baseUrl}/verification-code`, { email });
  }
  resetPassword(email: string, code: string, newPassword: string) {
    return this.http.post(`${this.baseUrl}/reset-passwordgit`, {
      email,
      code,
      newPassword,
    });
  }
  forgetPassword(email: string) {
    return this.http.post(`${this.baseUrl}/forget-password`, { email });
  }

  verifyForgetPassword(email: string, code: string, newPassword: string) {
    return this.http.post(`${this.baseUrl}/forget-password-verification`, {
      email,
      code,
      newPassword,
    });
  }
  verifyEmail(email: string, code: string) {
    return this.http.post(`${this.baseUrl}/verification`, { email, code });

  document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  this.userData = null;
  this._Router.navigate(['/login']);
  }
}
