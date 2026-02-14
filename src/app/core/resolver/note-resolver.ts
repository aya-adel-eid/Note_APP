import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs';
import { NoteActions } from '../../feature/note/state/note-actions-type';

export const noteResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);
  return store.pipe(
    tap(() => {
      store.dispatch(NoteActions.loadAllNote());
    }),
    first(),
  );
};
