import { createReducer, on } from '@ngrx/store';
import { loadingSpinnerAction } from './loadingSpinner.action';

export interface loadingSpinnerStatue {
  loading: boolean;
}
export const initState: loadingSpinnerStatue = {
  loading: false,
};
export const loadingSpinnerReducer = createReducer(
  initState,
  on(loadingSpinnerAction, (state, { statue }) => ({
    ...state,
    loading: statue,
  })),
);
