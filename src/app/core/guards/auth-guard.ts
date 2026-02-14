import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { STORED_KYE } from '../constance/STORED_KYES';
import { AuthService } from '../../feature/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const platID = inject(PLATFORM_ID);
  const authServices = inject(AuthService);
  const router = inject(Router);
  if (!isPlatformBrowser(platID)) return true;
  if (isPlatformBrowser(platID)) {
    const token = localStorage.getItem(STORED_KYE.TOKEN);
    if (token && authServices.decodeCode(token)) {
      return true;
    }
  }
  return router.parseUrl('/login');
};
