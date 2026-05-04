import { createAction, props } from '@ngrx/store';
import { LogIn, loginFailure } from '../interfaces/Login';
import { SignUp, SignUpFailure } from '../interfaces/signUp';
// login
export const logInAction = createAction(
  '[Login Page] Login',
  props<{ password: string; email: string }>(),
);
export const loginSuccessfullyAction = createAction(
  '[Auth] LogIn Success',
  props<{ info: LogIn; isAuto: boolean }>(),
);
export const loginFailureAction = createAction(
  '[Auth] LogIn Fail',
  props<{ error: loginFailure }>(),
);
// auto login
export const autoLoginAction = createAction('[Auth] Auto LogIn');
//sign Up
export const signUpAction = createAction(
  '[Auth] LogUp Page',
  props<{ email: string; password: string; name: string; age: number; phone: string }>(),
);
export const signUpSuccessfullyAction = createAction(
  '[Auth] logUp success',
  props<{ userData: SignUp }>(),
);
export const signUpFailureAction = createAction(
  '[Auth] LogUp Fail',
  props<{ error: SignUpFailure }>(),
);
// logOut
export const logOutAction = createAction('[Auth] LogOut');
