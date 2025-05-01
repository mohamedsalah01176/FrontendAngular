import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthService);
  if (_AuthService.getTokenFromCookies()) {
    return true;
  }
  _Router.navigate(['/login']);
  return false;
};
