import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthAction } from './actions-type';
import { tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class authEffect {
  private readonly action$ = inject(Actions);
  login$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthAction.logInAction),
        tap((action) => {
          localStorage.setItem('msg', action.msg);
        }),
      ),
    { dispatch: false },
  ).subscribe();
}
