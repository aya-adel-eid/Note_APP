import { createReducer, on } from '@ngrx/store';

import { logInAction } from './auth.actions';
import { AuthAction } from './actions-type';

export interface RespState {
  msg: string;
  token?: string;
}
export const initialAutState: RespState = {
  msg: '',
  token: '',
};
export const authReducer = createReducer(
  initialAutState,
  on(AuthAction.logInAction, (state, action) => {
    return {
      msg: action.msg,
      token: action.token,
    };
  }),
);
