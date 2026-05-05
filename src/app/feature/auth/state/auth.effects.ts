import { inject, Injectable, signal } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthAction } from './actions-type';
import { catchError, exhaustMap, interval, map, mergeMap, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {
  autoLoginAction,
  loginFailureAction,
  loginSuccessfullyAction,
  signUpAction,
} from './auth.actions';
import { Router } from '@angular/router';
import { STORED_KYE } from '../../../core/constance/STORED_KYES';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { loadingSpinnerAction } from '../../../shared/loadingSpinnerState/loadingSpinner.action';
@Injectable({ providedIn: 'root' })
export class authEffect {
  private readonly action$ = inject(Actions);
  private readonly authServices = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toaster = inject(ToastrService);
  private readonly store = inject(Store);
  count = signal<number>(5);
  // sign in
  logIn$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthAction.logInAction),
      exhaustMap(({ password, email }) =>
        this.authServices.logIn({ password, email }).pipe(
          map((data) => {
            localStorage.setItem(STORED_KYE.user, JSON.stringify(data));
            this.store.dispatch(loadingSpinnerAction({ statue: false }));
            return AuthAction.loginSuccessfullyAction({ info: data, isAuto: false });
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(loadingSpinnerAction({ statue: false }));
            return of(loginFailureAction({ error: error.error }));
          }),
        ),
      ),
    );
  });
  logInSuccess$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(AuthAction.loginSuccessfullyAction),
        tap((action) => {
          if (!action.isAuto) {
            this.toaster.success('Log In Success!', '', {
              progressBar: true,
              timeOut: 4000,
            });
            this.router.navigateByUrl('/userNotes');
          }
        }),
      );
    },
    { dispatch: false },
  );
  logInFailure$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loginFailureAction),
        tap((error) => {
          console.log(error.error.msg);

          this.toaster.error(error.error.msg, '', {
            progressBar: true,
            timeOut: 4000,
          });
        }),
      );
    },
    { dispatch: false },
  );
  // auto sign in
  logInAuto$ = createEffect(() => {
    return this.action$.pipe(
      ofType(autoLoginAction),
      mergeMap(() => {
        console.log(this.authServices.getAutoLocalStorage());
        const userData = this.authServices.getAutoLocalStorage();
        return of(loginSuccessfullyAction({ info: userData, isAuto: true }));
      }),
    );
  });
  // sign up
  signUp$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthAction.signUpAction),
      exhaustMap((data) =>
        this.authServices.logUp(data).pipe(
          map((data) => {
            this.store.dispatch(loadingSpinnerAction({ statue: false }));
            return AuthAction.signUpSuccessfullyAction({ userData: data });
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(loadingSpinnerAction({ statue: false }));
            return of(AuthAction.signUpFailureAction({ error: error.error }));
          }),
        ),
      ),
    );
  });
  signUpSuccessfullyAction$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(AuthAction.signUpSuccessfullyAction),
        tap(() => {
          interval(1000)
            .pipe(take(5))
            .subscribe(() => {
              this.count.set(this.count() - 1);
              if (this.count() === 0) {
                this.router.navigateByUrl('/login');
              }
            });
          this.toaster.success(
            `Account created successfully  you will be redirect to login in ${this.count()} second!`,
            '',
            {
              progressBar: true,
              timeOut: 5000,
            },
          );
        }),
      );
    },
    { dispatch: false },
  );
  signUpFailure$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(AuthAction.signUpFailureAction),
        tap((action) => {
          this.toaster.error(action.error.msg, '', {
            progressBar: true,
            timeOut: 4000,
          });
        }),
      );
    },
    { dispatch: false },
  );
  // sign out
  signOut$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(AuthAction.logOutAction),
        tap(() => {
          this.authServices.logOut();
          this.router.navigateByUrl('/login');
        }),
      );
    },
    { dispatch: false },
  );
}
