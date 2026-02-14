import { Routes } from '@angular/router';

export const NOte_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/note-page/note-page.component').then((c) => c.NotePageComponent),
  },
];
