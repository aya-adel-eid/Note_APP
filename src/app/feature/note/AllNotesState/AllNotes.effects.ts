import { inject, Injectable } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AllNotesLoadSuccessAction, loadAllNotes, loadNotesFailure } from './AllNotes.actions';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AllNotesEffect {
  private readonly noteService = inject(NoteService);
  private readonly action$ = inject(Actions);
  private readonly toaster = inject(ToastrService);
  getAllNotes$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadAllNotes),
      concatMap(() =>
        this.noteService.getAllNotes().pipe(
          map((resp) => {
            return AllNotesLoadSuccessAction({ AllNotes: resp.notes });
          }),
          catchError((error: HttpErrorResponse) =>
            of(loadNotesFailure({ error: error.error.msg })),
          ),
        ),
      ),
    );
  });
  loadAllNotesFailure$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loadNotesFailure),
        tap((error) => {
          this.toaster.error(error.error);
        }),
      );
    },
    { dispatch: false },
  );
}
