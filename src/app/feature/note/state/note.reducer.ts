import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Note } from '../interfaces/userNotes';
import { createReducer, on } from '@ngrx/store';

import { NoteActions } from './note-actions-type';
export interface NoteState extends EntityState<Note> {
  selectedNoteId: string | null;
  noteLoaded: boolean;
}
export const adapter = createEntityAdapter<Note>({ selectId: (note: Note) => note._id });
export const noteInitialState = adapter.getInitialState({
  noteLoaded: false,
});
export const noteReducer = createReducer(
  noteInitialState,
  on(NoteActions.AllNotesLoadAction, (state, action) =>
    adapter.addMany(action.notes, { ...state, noteLoaded: true }),
  ),
  on(NoteActions.updateNote, (state, action) => adapter.updateOne(action.noteUpdate, state)),
  on(NoteActions.deleteNote, (state, action) => adapter.removeOne(action.id, state)),
  on(NoteActions.addNottSuccess, (state, action) => adapter.addOne(action.note, state)),
);
export const { selectAll } = adapter.getSelectors();
