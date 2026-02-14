import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/helper/base-http.service';
import { APP_APIS } from '../../../core/constance/APP_APIs';
import { App } from '../../../app';
import { STORED_KYE } from '../../../core/constance/STORED_KYES';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  private readonly router = inject(Router);
  logUp(userData: {}) {
    return this.httpClient.post(APP_APIS.AUTH.SIGNUP, userData);
  }
  logIn(userData: {}) {
    return this.httpClient.post<any>(APP_APIS.AUTH.SIGNIN, userData);
  }
  logOut() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem(STORED_KYE.TOKEN);
  }
  decodeCode(token: string): boolean | void {
    try {
      jwtDecode(token);
      return true;
    } catch {
      this.logOut();
    }
  }
}
