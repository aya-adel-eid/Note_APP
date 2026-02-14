import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loggedGuard } from './core/guards/logged-guard';

export const routes: Routes = [
  // auth
  {
    path: '',
    canActivate: [loggedGuard],
    loadComponent: () =>
      import('./core/layoutes/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent,
      ),
    loadChildren: () => import('./feature/auth/auth.routes').then((c) => c.AUTH_ROUTES),
  },
  // user
  {
    path: '',
    loadComponent: () =>
      import('./core/layoutes/main-layout/main-layout.component').then(
        (c) => c.MainLayoutComponent,
      ),

    canActivate: [authGuard],
    children: [
      {
        path: 'note',
        loadChildren: () => import('./feature/note/note.routes').then((c) => c.NOte_ROUTES),
      },
    ],
  },
];
