import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { STORED_KYE } from '../constance/STORED_KYES';
import { AuthService } from '../../feature/auth/services/auth.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const platID = inject(PLATFORM_ID);
  const router = inject(Router);
  const authServices = inject(AuthService);
  if (isPlatformBrowser(platID)) {
    const token = localStorage.getItem(STORED_KYE.TOKEN);
    if (token && authServices.decodeCode(token)) {
      return router.parseUrl('/note');
    }
  }
  return true;
};
