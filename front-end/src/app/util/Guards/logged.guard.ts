import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
export const loggedGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (_AuthService.getTokenFromCookies()) {
      _Router.navigate(['/home']);
      return false;
    }
    return true;
  }
  return false;
};
