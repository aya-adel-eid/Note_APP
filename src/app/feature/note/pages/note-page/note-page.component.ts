import { Component, inject, OnInit, signal } from '@angular/core';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { NoteService } from '../../services/note.service';
import { select, Store } from '@ngrx/store';
import { NoteActions } from '../../state/note-actions-type';
import { Note } from '../../interfaces/userNotes';
import { areNoteSelector, selectAllCourses } from '../../state/note.selector';
import { tap } from 'rxjs';

@Component({
  selector: 'app-note-page',
  imports: [NoteCardComponent],
  templateUrl: './note-page.component.html',
  styleUrl: './note-page.component.css',
})
export class NotePageComponent implements OnInit {
  private readonly noteServices = inject(NoteService);
  private readonly store = inject(Store);

  userNotes = signal<Note[]>([]);
  ngOnInit(): void {
    this.getUserNote();
    this.store
      .pipe(
        select(areNoteSelector),
        tap((noteLoaded) => {
          if (!noteLoaded) {
            this.store.dispatch(NoteActions.loadAllNote());
          }
        }),
      )
      .subscribe();
    // this.store.dispatch(NoteActions.loadAllNote());
  }
  getUserNote() {
    // this.noteServices.getUserNote().subscribe();
    this.store.pipe(select(selectAllCourses)).subscribe((notes) => this.userNotes.set(notes));
  }
}
