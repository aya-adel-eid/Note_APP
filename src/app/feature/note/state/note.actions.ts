import { createAction, props } from '@ngrx/store';
import { Note } from '../interfaces/userNotes';
import { Update } from '@ngrx/entity';
// load Notes*********************************
export const loadUserNotes = createAction('[Notes Resolver] Load All UserNotes');
export const UserNotesLoadSuccessAction = createAction(
  '[Load note effect] all user notes loaded Success',
  props<{ notes: Note[] }>(), //payload
);
export const UserNotesFailure = createAction(
  '[Notes page] load all user notes Failure',
  props<{ error: string }>(),
);
// Add NewNote**************************
export const addNote = createAction('[add note dialog] ADDNote', props<{ note: Partial<Note> }>());
export const addNotSuccess = createAction('[add note successfully]', props<{ note: Note }>());
export const addNotesFailure = createAction('[Add Note] Failure', props<{ error: string }>());
// update Note*****************
export const updateNote = createAction(
  '[update Note dialog] updateNote',
  props<{ noteUpdate: Update<Note> }>(),
);
export const updateNoteSuccessfully = createAction(
  '[Dialog Update] updateNote Successfully',
  props<{ note: Update<Note> }>(),
);
export const updateNoteFailure = createAction(
  '[Dialog Update] updateNote Failure',
  props<{ error: string }>(),
);
// ] Delete Note

export const deleteNote = createAction('[Note Page] Delete Note', props<{ id: string }>());
export const deleteNoteSuccess = createAction(
  '[Note Page] Delete Note Success',
  props<{ id: string }>(),
);
export const deleteNoteFailure = createAction(
  '[Note Page] Delete Note Failure',
  props<{ error: string }>(),
);
