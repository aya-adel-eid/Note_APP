import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NoteService } from '../services/note.service';
import { NoteActions } from './note-actions-type';
import { catchError, concatMap, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import {
  loadUserNotes,
  updateNote,
  UserNotesFailure,
  UserNotesLoadSuccessAction,
} from './note.actions';
import { Update } from '@ngrx/entity';
import { Note } from '../interfaces/userNotes';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotesEffects {
  private readonly action$ = inject(Actions);
  private readonly noteService = inject(NoteService);
  private readonly toaster = inject(ToastrService);
  // loaded Notes******************************************
  loadNotes$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadUserNotes),
      switchMap(() =>
        this.noteService.getUserNotes().pipe(
          map((resp) => {
            console.log(resp);

            return UserNotesLoadSuccessAction({ notes: resp.notes });
          }),
          catchError((error: HttpErrorResponse) =>
            of(UserNotesFailure({ error: error.error.message })),
          ),
        ),
      ),
    );
  });
  failureLoadNotes$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(UserNotesFailure),
        tap((action) => {
          this.toaster.error(action.error, '', {
            progressBar: true,
            timeOut: 4000,
          });
        }),
      );
    },
    { dispatch: false },
  );
  // Add New Note*********************************
  addNewNote$ = createEffect(() => {
    return this.action$.pipe(
      ofType(NoteActions.addNote),
      exhaustMap((noteInfo) =>
        this.noteService.addNote(noteInfo.note).pipe(
          map((resp) => {
            console.log(resp);
            return NoteActions.addNotSuccess({ note: resp.note });
          }),
          catchError((error: HttpErrorResponse) =>
            of(NoteActions.addNotesFailure({ error: error.error.msg })),
          ),
        ),
      ),
    );
  });
  addNoteSuccess$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(NoteActions.addNotSuccess),
        tap(() => {
          this.toaster.success('Add Note Successfully', '', {
            progressBar: true,
            timeOut: 4000,
          });
        }),
      );
    },
    { dispatch: false },
  );
  // add failure********************************
  addNoteFailure$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(NoteActions.addNotesFailure),
        tap((error) => {
          this.toaster.error(error.error, '', {
            progressBar: true,
            timeOut: 4000,
          });
        }),
      );
    },
    { dispatch: false },
  );
  // updatePost
  updateNote$ = createEffect(() => {
    return this.action$.pipe(
      ofType(NoteActions.updateNote),
      exhaustMap((noteInfo) =>
        this.noteService
          .editNote(noteInfo.noteUpdate.id as string, noteInfo.noteUpdate.changes)
          .pipe(
            map((resp) => {
              console.log(resp);

              return NoteActions.updateNoteSuccessfully({ note: noteInfo.noteUpdate });
            }),
            catchError((error: HttpErrorResponse) => {
              console.log(error.error.msg);

              return of(NoteActions.updateNoteFailure({ error: error.error.msg }));
            }),
          ),
      ),
    );
  });
  updateNoteSuccess$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(NoteActions.updateNoteSuccessfully),
        tap(() => {
          this.toaster.success('Updated Note Successfully!', '', {
            progressBar: true,
            timeOut: 4000,
          });
        }),
      );
    },
    { dispatch: false },
  );
  updateNoteFailure$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(NoteActions.updateNoteFailure),
        tap((action) => {
          this.toaster.error(action.error, '', {
            progressBar: true,
            timeOut: 4000,
          });
        }),
      );
    },
    { dispatch: false },
  );
  // DeleteNote
  deleteNote$ = createEffect(() => {
    return this.action$.pipe(
      ofType(NoteActions.deleteNote),
      exhaustMap((noteInfo) =>
        this.noteService.deleteNote(noteInfo.id).pipe(
          map((resp) => {
            console.log(resp);

            return NoteActions.deleteNoteSuccess({ id: noteInfo.id });
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error.error.msg);

            return of(NoteActions.deleteNoteFailure({ error: error.error.msg }));
          }),
        ),
      ),
    );
  });
  deleteNoteSuccess$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(NoteActions.deleteNoteSuccess),
        tap(() => {
          this.toaster.success('DeleteNote Successfully!', '', {
            progressBar: true,
            timeOut: 4000,
          });
        }),
      );
    },
    { dispatch: false },
  );
  deleteNoteFailure$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(NoteActions.deleteNoteFailure),
        tap((action) => {
          this.toaster.error(action.error, '', {
            progressBar: true,
            timeOut: 4000,
          });
        }),
      );
    },
    { dispatch: false },
  );
}
