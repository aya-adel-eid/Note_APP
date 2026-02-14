import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  // auth
  {
    path: '',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then((c) => c.LoginPageComponent),
    title: 'signIn',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then((c) => c.LoginPageComponent),
    title: 'signIn',
  },
  {
    path: 'signUp',
    loadComponent: () =>
      import('./pages/log-up-page/log-up-page.component').then((c) => c.LogUpPageComponent),
    title: 'SignUp',
  },
];
