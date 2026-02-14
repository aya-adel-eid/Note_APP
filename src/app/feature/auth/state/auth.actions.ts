import { createAction, props } from '@ngrx/store';
export interface resp {
  msg: string;
  token?: string;
}
export const logInAction = createAction('[Login Page] Login', props<resp>());
