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

  setRegisterForm(data: object): Observable<any> {
    return this.http.post('http://localhost:4000/api/auth/signup', data);
  }

  setLoginForm(data: object): Observable<any> {
    return this.http.post(`http://localhost:4000/api/auth/signin`, data);
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
  document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  this.userData = null;
  this._Router.navigate(['/login']);
  }
}
