import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Note } from '../interfaces/userNotes';
import { createReducer, on } from '@ngrx/store';
import {
  AllNotesLoadSuccessAction,
  loadAllNotes,
  loadNotesFailure,
  setPage,
} from './AllNotes.actions';

export interface AllNotesState extends EntityState<Note> {
  selectedId: string;
  notesLoaded: boolean;
  error: string;
  currentPage: number;
  pageSize: number;
}
const adapter = createEntityAdapter<Note>({ selectId: (note) => note._id });
export const noteInitialState = adapter.getInitialState({
  notesLoaded: false,
  error: '',
  currentPage: 1,
  pageSize: 16,
});
export const allNotesReducer = createReducer(
  noteInitialState,
  on(loadAllNotes, (state, action) => ({
    ...state,
    notesLoaded: false,
  })),
  on(AllNotesLoadSuccessAction, (state, action) =>
    adapter.setAll(action.AllNotes, { ...state, notesLoaded: true, error: '' }),
  ),
  on(loadNotesFailure, (state, { error }) => ({
    ...state,
    error: error,
    notesLoaded: false,
  })),
  on(setPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),
);
export const { selectAll } = adapter.getSelectors();
