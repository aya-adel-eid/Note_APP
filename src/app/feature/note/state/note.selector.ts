import { createFeatureSelector, createSelector } from '@ngrx/store';

import { NoteState, selectAll } from './note.reducer';

export const selectNoteState = createFeatureSelector<NoteState>('Notes');
export const selectAllCourses = createSelector(selectNoteState, selectAll);
export const areNoteSelector = createSelector(selectNoteState, (state) => state.noteLoaded);
