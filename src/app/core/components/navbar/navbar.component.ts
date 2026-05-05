import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../../../feature/note/components/add-note/add-note.component';
import { AuthService } from '../../../feature/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { logOutAction } from '../../../feature/auth/state/auth.actions';
import { NoteService } from '../../../feature/note/services/note.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly matDialog = inject(MatDialog);
  private readonly store = inject(Store);
  private readonly noteService = inject(NoteService);
  openDialog() {
    this.noteService.updateNote.set(null);
    this.matDialog.open(AddNoteComponent, {
      width: '700px',
    });
  }
  signOut() {
    this.store.dispatch(logOutAction());
    console.log(555);
  }
}
