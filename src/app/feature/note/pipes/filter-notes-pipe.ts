import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../interfaces/userNotes';

@Pipe({
  name: 'filterNotes',
})
export class FilterNotesPipe implements PipeTransform {
  transform(notes: Note[], searchKey: string): Note[] {
    if (!notes) return [];
    if (!searchKey) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchKey.toLowerCase()) ||
        note.content.toLowerCase().includes(searchKey.toLowerCase()),
    );
  }
}
