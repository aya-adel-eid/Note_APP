import { Injectable, signal } from '@angular/core';
import { BaseHttpService } from '../../../core/services/helper/base-http.service';
import { APP_APIS } from '../../../core/constance/APP_APIs';

import { HttpErrorResponse } from '@angular/common/http';
import { GetUserNotes, Note } from '../interfaces/userNotes';
import { NoteData } from '../interfaces/AddNewNote';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends BaseHttpService {
  userNote = signal<Note[]>([]);
  updateNote = signal<Note | null>(null);
  addNote(noteData: {}) {
    return this.httpClient.post<NoteData>(APP_APIS.Notes.notes, noteData);
  }
  getUserNotes() {
    return this.httpClient.get<GetUserNotes>(APP_APIS.Notes.notes);
  }
  deleteNote(id: string) {
    return this.httpClient.delete(`${APP_APIS.Notes.notes}/${id}`);
  }
  editNote(id: string, updateNote: {}) {
    return this.httpClient.put<NoteData>(`${APP_APIS.Notes.notes}/${id}`, updateNote);
  }
  getAllNotes() {
    return this.httpClient.get<GetUserNotes>(`${APP_APIS.Notes.notes}/allNotes`);
  }
}
