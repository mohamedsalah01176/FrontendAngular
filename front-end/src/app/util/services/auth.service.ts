import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _Router = inject(Router);
  userData = null;
  constructor(private http: HttpClient, private router: Router) {} 

  setRegisterForm(data: object): Observable<any> {
    return this.http.post(
      'http://localhost:4000/api/auth/signup',
      data
    );
  }
  // }
  //change url only
  // setLoginForm(data: object): Observable<any> {
  //   return this._HttpClient.post(
  //     `${environment.baseUrl}/api/v1/auth/signin`,
  //     data
  //   );
  // }
  saveUserData(): void {
    if (localStorage.getItem('userToken')) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }
  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login']);
  }
}
