import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const loggedGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('userToken')) {
      _Router.navigate(['/home']);
      return false; // Return false when redirecting
    }
    return true; // Allow access if no token
  }

  // Server-side behavior
  return true; // Or false, depending on your needs
};
