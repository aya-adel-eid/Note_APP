import { Component, inject, OnInit, signal } from '@angular/core';
import { NoteCardComponent } from '../../components/note-card/note-card.component';

import { Store } from '@ngrx/store';

import { noteLoaded, selectAllNotes } from '../../state/note.selector';

import { loadUserNotes } from '../../state/note.actions';
import { FormsModule } from '@angular/forms';
import { FilterNotesPipe } from '../../pipes/filter-notes-pipe';

@Component({
  selector: 'app-note-page',
  imports: [NoteCardComponent, FormsModule, FilterNotesPipe],
  templateUrl: './note-page.component.html',
  styleUrl: './note-page.component.css',
})
export class NotePageComponent implements OnInit {
  private readonly store = inject(Store);
  userNotes = this.store.selectSignal(selectAllNotes);
  noteLoaded = this.store.selectSignal(noteLoaded);
  searchInput!: string;
  ngOnInit(): void {
    if (!this.noteLoaded()) {
      this.store.dispatch(loadUserNotes());
    }
  }
  // ngOnInit(): void {
  //   this.store.dispatch(loadAllNotes());
  //   this.getUserNote();
  //   this.store
  //     .pipe(
  //       select(areNoteSelector),
  //       tap((noteLoaded) => {
  //         if (!noteLoaded) {
  //           this.store.dispatch(NoteActions.loadAllNote());
  //         }
  //       }),
  //     )
  //     .subscribe();
  //   this.store.dispatch(NoteActions.loadAllNote());
  // }
  // getUserNote() {
  //    this.noteServices.getUserNote().subscribe();
  //   this.store.pipe(select(selectAllNotes)).subscribe((notes) => this.userNotes.set(notes));
  // }
}
