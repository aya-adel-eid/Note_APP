import { createReducer, on } from '@ngrx/store';

import { logInAction } from './auth.actions';
import { AuthAction } from './actions-type';
import { LogIn } from '../interfaces/Login';
import { SignUp } from '../interfaces/signUp';

export interface AuthState {
  infoData: LogIn | null;
  user: SignUp | null;
  error: string | null;
  isLoading: boolean;
}
export const initialAutState: AuthState = {
  infoData: null,
  error: null,
  user: null,
  isLoading: false,
};
export const authReducer = createReducer(
  initialAutState,
  // log in
  on(AuthAction.logInAction, (state) => ({ ...state, isLoading: true, error: null })),
  on(AuthAction.loginSuccessfullyAction, (state, { info }) => ({
    ...state,
    infoData: info,
    isLoading: false,
    error: null,
  })),
  on(AuthAction.loginFailureAction, (state, { error }) => ({
    ...state,
    error: error.msg,
    isLoading: false,
  })),
  on(AuthAction.signUpAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthAction.signUpSuccessfullyAction, (state, { userData }) => ({
    ...state,
    user: userData,
    error: null,
    isLoading: false,
  })),
  on(AuthAction.signUpFailureAction, (state, { error }) => ({
    ...state,
    error: error.msg,
    isLoading: false,
  })), // logOut
  on(AuthAction.logOutAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,

    infoData: null,
  })),
);
