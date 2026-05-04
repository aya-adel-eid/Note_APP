import { createFeatureSelector, createSelector } from '@ngrx/store';
import { loadingSpinnerStatue } from './loadingSpinner.reducer';

export const selectLoadingState = createFeatureSelector<loadingSpinnerStatue>('loading');
export const selectStatue = createSelector(selectLoadingState, (state) => state.loading);
