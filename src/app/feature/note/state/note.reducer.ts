import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Note } from '../interfaces/userNotes';
import { createReducer, on } from '@ngrx/store';

import { NoteActions } from './note-actions-type';

export interface NoteState extends EntityState<Note> {
  selectedNoteId: string | null;
  noteLoaded: boolean;
  error: string;
}
export const adapter = createEntityAdapter<Note>({ selectId: (note: Note) => note._id });
export const noteInitialState = adapter.getInitialState({ noteLoaded: false });

export const noteReducer = createReducer(
  noteInitialState,
  on(NoteActions.loadUserNotes, (state, action) => ({
    ...state,
    noteLoaded: false,
  })),
  on(NoteActions.UserNotesLoadSuccessAction, (state, action) =>
    adapter.addMany(action.notes, { ...state, noteLoaded: true }),
  ),
  on(NoteActions.UserNotesFailure, (state, action) =>
    adapter.removeAll({ ...state, error: action.error, noteLoaded: false }),
  ),
  // add new note
  on(NoteActions.addNotSuccess, (state, action) =>
    adapter.addOne(action.note, { ...state, noteLoaded: true }),
  ),
  on(NoteActions.addNotesFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  // update note******************
  on(NoteActions.updateNoteSuccessfully, (state, action) =>
    adapter.updateOne(action.note, { ...state }),
  ),
  on(NoteActions.updateNoteFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  // DeleteNote*************
  on(NoteActions.deleteNoteSuccess, (state, action) =>
    adapter.removeOne(action.id, { ...state, noteLoaded: true }),
  ),
  on(NoteActions.deleteNoteFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
);
export const { selectAll } = adapter.getSelectors();
