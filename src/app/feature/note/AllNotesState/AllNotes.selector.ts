import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AllNotesState, selectAll } from './AllNotes.reducer';

export const selectAllNotesState = createFeatureSelector<AllNotesState>('AllNotes');
export const selectAllNotes = createSelector(selectAllNotesState, selectAll);
export const selectNotesLoaded = createSelector(selectAllNotesState, (state) => state.notesLoaded);
export const selectCurrentPage = createSelector(selectAllNotesState, (state) => state.currentPage);

export const selectPaginatedNotes = createSelector(
  selectAllNotes,
  selectCurrentPage,
  (notes, page) => {
    const pageSize = 16;
    const start = (page - 1) * pageSize;
    return notes.slice(start, start + pageSize);
  },
);

export const selectTotalPages = createSelector(selectAllNotes, (notes) =>
  Math.ceil(notes.length / 16),
);
