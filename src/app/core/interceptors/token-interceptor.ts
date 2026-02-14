import { HttpInterceptorFn } from '@angular/common/http';
import { STORED_KYE } from '../constance/STORED_KYES';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platID = inject(PLATFORM_ID);
  if (req.urlWithParams.includes('signIn') || req.urlWithParams.includes('signUp'))
    return next(req);
  if (isPlatformBrowser(platID)) {
    const token = localStorage.getItem(STORED_KYE.TOKEN);
    req = req.clone({
      setHeaders: {
        token: `3b8ny__${token!}`,
      },
    });
  }
  return next(req);
};
