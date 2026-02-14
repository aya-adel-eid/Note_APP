import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from '../../services/note.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { addNote, updateNote } from '../../state/note.actions';
import { Update } from '@ngrx/entity';
import { Note } from '../../interfaces/userNotes';
@Component({
  selector: 'app-add-note',
  imports: [MatCard, MatCardHeader, MatCardContent, ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css',
})
export class AddNoteComponent {
  private readonly fb = inject(FormBuilder);
  private readonly matDialog = inject(MatDialog);
  private readonly noteServices = inject(NoteService);
  private readonly store = inject(Store);
  noteEdit = this.noteServices.updateNote;
  constructor() {
    effect(() => {
      const note = this.noteEdit();
      if (note) {
        this.objNote.patchValue(note);
      } else this.objNote.reset();
    });
  }
  objNote: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
  });
  close() {
    this.matDialog.closeAll();
  }
  sendData() {
    // this.noteServices.addNote(this.objNote.value).subscribe({
    //   next: (resp) => {
    //     this.noteServices.getUserNote();
    //     this.matDialog.closeAll();
    //     this.objNote.reset();
    //   },
    //   error: (error: HttpErrorResponse) => {},
    // });
    this.store.dispatch(addNote({ note: this.objNote.value }));
    this.matDialog.closeAll();
  }
  updateData() {
    const update: Update<Note> = {
      id: this.noteEdit()?._id!,
      changes: this.objNote.value!,
    };
    this.store.dispatch(updateNote({ noteUpdate: update }));
    this.matDialog.closeAll();
    // this.noteServices.editNote(this.noteEdit()?._id!, this.objNote.value).subscribe({
    //   next: (resp) => {
    //     this.noteServices.getUserNote();
    //     this.matDialog.closeAll();
    //     this.objNote.reset();
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.objNote.reset();
    //   },
    // });
  }
}
