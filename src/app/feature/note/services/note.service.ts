import { Injectable, signal } from '@angular/core';
import { BaseHttpService } from '../../../core/services/helper/base-http.service';
import { APP_APIS } from '../../../core/constance/APP_APIs';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { GetUserNotes, Note } from '../interfaces/userNotes';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends BaseHttpService {
  userNote = signal<Note[]>([]);
  updateNote = signal<Note | null>(null);
  addNote(noteData: {}) {
    return this.httpClient.post(APP_APIS.Notes.notes, noteData);
  }
  getUserNote() {
    return this.httpClient.get<GetUserNotes>(APP_APIS.Notes.notes);
    // .subscribe({
    //   next: (resp) => {
    //     this.userNote.set(resp.notes);
    //   },
    //   error: (error: HttpErrorResponse) => {},
    // });
  }
  deleteNote(id: string) {
    return this.httpClient.delete(`${APP_APIS.Notes.notes}/${id}`);
  }
  editNote(id: string, updateNote: {}) {
    return this.httpClient.put(`${APP_APIS.Notes.notes}/${id}`, updateNote);
  }
}
