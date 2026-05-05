import { createAction, props } from '@ngrx/store';
import { Note } from '../interfaces/userNotes';
import { adapter } from '../state/note.reducer';

// load allNotes
export const loadAllNotes = createAction('[Notes Resolver] Load AllNotes');
export const AllNotesLoadSuccessAction = createAction(
  '[All Notes Page] allNotes loaded Success',
  props<{ AllNotes: Note[] }>(), //payload
);
export const loadNotesFailure = createAction(
  '[AllNotes page] load allNotes Failure',
  props<{ error: string }>(),
);
// handle pagination
export const setPage = createAction('[AllNotes] Set Page', props<{ page: number }>());
