import { HttpInterceptorFn } from '@angular/common/http';
import { STORED_KYE } from '../constance/STORED_KYES';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { selectToken } from '../../feature/auth/state/auth.selector';
import { Store } from '@ngrx/store';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platID = inject(PLATFORM_ID);
  const store = inject(Store);
  if (req.urlWithParams.includes('signIn') || req.urlWithParams.includes('signUp'))
    return next(req);
  if (isPlatformBrowser(platID)) {
    const token = store.selectSignal(selectToken);
    console.log(store.selectSignal(selectToken));

    req = req.clone({
      setHeaders: {
        token: `3b8ny__${token()!}`,
      },
    });
  }
  return next(req);
};
