import { sign } from 'crypto';
import { environment } from '../../../environments/environment.development';

export const APP_APIS = {
  AUTH: {
    SIGNIN: `${environment.baseURl}users/signIn`,
    SIGNUP: `${environment.baseURl}users/signUp`,
  },
  Notes: {
    notes: `${environment.baseURl}notes`,
  },
};
