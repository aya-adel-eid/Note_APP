import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NoteService } from '../services/note.service';
import { NoteActions } from './note-actions-type';
import { concatMap, map, tap } from 'rxjs';
import { AllNotesLoadAction, updateNote } from './note.actions';
import { Update } from '@ngrx/entity';
import { Note } from '../interfaces/userNotes';

@Injectable({
  providedIn: 'root',
})
export class NotesEffects {
  private readonly action$ = inject(Actions);
  private readonly noteServices = inject(NoteService);
  loadNote = createEffect(() => {
    return this.action$.pipe(
      ofType(NoteActions.loadAllNote),
      concatMap((action) => this.noteServices.getUserNote()),
      map((notes) => AllNotesLoadAction({ notes: notes.notes })),
    );
  });
  updateNote = createEffect(
    () => {
      return this.action$.pipe(
        ofType(NoteActions.updateNote),
        tap((resp) => console.log('edit', resp.noteUpdate)),
        concatMap(
          (action) =>
            this.noteServices.editNote(String(action.noteUpdate.id), action.noteUpdate.changes),
          // .pipe(map((note: any) => NoteActions.updateNote({ noteUpdate: note }))),
        ),
      );
    },
    { dispatch: false },
  );
  deleteNote = createEffect(
    () => {
      return this.action$.pipe(
        ofType(NoteActions.deleteNote),
        concatMap((action) => this.noteServices.deleteNote(action.id)),
      );
    },
    { dispatch: false },
  );
  // addNote$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(NoteActions.addNote),
  //     concatMap((action) =>
  //       this.noteServices
  //         .addNote(action.note)
  //         .pipe(map((resp: any) => NoteActions.addNottSuccess({ note: resp.note }))),
  //     ),
  //   ),
  // );
  addNote = createEffect(() => {
    return this.action$.pipe(
      ofType(NoteActions.addNote),
      concatMap((note) =>
        this.noteServices
          .addNote(note.note)
          .pipe(map((resp: any) => NoteActions.addNottSuccess({ note: resp.note }))),
      ),
    );
  });
}
