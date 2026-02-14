import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../../../feature/note/components/add-note/add-note.component';
import { AuthService } from '../../../feature/auth/services/auth.service';
@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly matDialog = inject(MatDialog);
  private readonly authServices = inject(AuthService);
  openDialog() {
    this.matDialog.open(AddNoteComponent, {
      width: '700px',
      height: '350px',
    });
  }
  signOut() {
    this.authServices.logOut();
  }
}
