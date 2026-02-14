import { Component, inject, input } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/userNotes';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../add-note/add-note.component';
import { Store } from '@ngrx/store';
import { updateNote } from '../../state/note.actions';
import { Update } from '@ngrx/entity';
import { NoteActions } from '../../state/note-actions-type';
@Component({
  selector: 'app-note-card',
  imports: [],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css',
})
export class NoteCardComponent {
  private readonly noteServices = inject(NoteService);
  private readonly matDialog = inject(MatDialog);
  private readonly store = inject(Store);
  note = input<Note>();
  deleteNote(id: string) {
    this.store.dispatch(NoteActions.deleteNote({ id: id }));
    // this.noteServices.deleteNote(id).subscribe({
    //   next: (resp) => {
    //     this.noteServices.getUserNote();
    //   },
    // });
  }
  editNote(note: Note) {
    this.noteServices.updateNote.set(note);
    //   const update:Update<Note>={
    //     id:note._id,
    //     changes:note
    //   }
    //  this.store.dispatch(updateNote({noteUpdate:update}))
    this.matDialog.open(AddNoteComponent, {
      width: '700px',
      height: '350px',
    });
  }
}
