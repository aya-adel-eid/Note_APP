import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadAllNotes, setPage } from '../../AllNotesState/AllNotes.actions';
import {
  selectAllNotes,
  selectCurrentPage,
  selectNotesLoaded,
  selectPaginatedNotes,
  selectTotalPages,
} from '../../AllNotesState/AllNotes.selector';
import { FilterNotesPipe } from '../../pipes/filter-notes-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-notes',
  imports: [FilterNotesPipe, FormsModule],
  templateUrl: './all-notes.component.html',
  styleUrl: './all-notes.component.css',
})
export class AllNotesComponent implements OnInit {
  private readonly store = inject(Store);
  loaded = this.store.selectSignal(selectNotesLoaded);
  allNotes = this.store.selectSignal(selectPaginatedNotes);
  // notes = this.store.selectSignal(selectPaginatedNotes);
  totalPages = this.store.selectSignal(selectTotalPages);
  currentPage = this.store.selectSignal(selectCurrentPage);

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.store.dispatch(setPage({ page: this.currentPage() + 1 }));
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.store.dispatch(setPage({ page: this.currentPage() - 1 }));
    }
  }
  searchInput!: string;
  ngOnInit(): void {
    if (!this.loaded()) {
      this.store.dispatch(loadAllNotes());
    }
  }
}
