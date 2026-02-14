import { Routes } from '@angular/router';
import { noteResolver } from '../../core/resolver/note-resolver';

export const NOte_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/note-page/note-page.component').then((c) => c.NotePageComponent),
    // resolve: { notes: noteResolver },
  },
];
