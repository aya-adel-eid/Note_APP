import { createAction, props } from '@ngrx/store';

export const loadingSpinnerAction = createAction('[loading spinner]', props<{ statue: boolean }>());
