import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/helper/base-http.service';
import { APP_APIS } from '../../../core/constance/APP_APIs';
import { App } from '../../../app';
import { STORED_KYE } from '../../../core/constance/STORED_KYES';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { LogIn } from '../interfaces/Login';
import { json } from 'stream/consumers';
import { SignUp } from '../interfaces/signUp';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  private readonly router = inject(Router);
  logUp(userData: {}) {
    return this.httpClient.post<SignUp>(APP_APIS.AUTH.SIGNUP, userData);
  }
  logIn(userData: {}) {
    return this.httpClient.post<LogIn>(APP_APIS.AUTH.SIGNIN, userData);
  }
  logOut() {
    localStorage.removeItem(STORED_KYE.user);
  }
  decodeCode(token: string): boolean | void {
    try {
      jwtDecode(token);
      return true;
    } catch {
      this.logOut();
    }
  }
  getAutoLocalStorage() {
    const user = localStorage.getItem(STORED_KYE.user);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  // errors
  getErrorMessage(message: string) {}
}
