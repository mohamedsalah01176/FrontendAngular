import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const _AuthService = inject(AuthService);
  if (isPlatformBrowser(platformId)) {
    if (_AuthService.getTokenFromCookies()) {
      return true;
    }
    _Router.navigate(['/login']);
    return false;
  }

  return false;
};
