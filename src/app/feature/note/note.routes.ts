import { Routes } from '@angular/router';

export const NOte_ROUTES: Routes = [
  {
    path: 'userNotes',
    loadComponent: () =>
      import('./pages/note-page/note-page.component').then((c) => c.NotePageComponent),
  },
  {
    path: 'AllNotes',
    loadComponent: () =>
      import('./pages/all-notes/all-notes.component').then((c) => c.AllNotesComponent),
  },
];
