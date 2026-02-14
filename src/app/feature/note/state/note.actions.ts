import { createAction, props } from '@ngrx/store';
import { Note } from '../interfaces/userNotes';
import { Update } from '@ngrx/entity';
export const loadAllNote = createAction('[Courses Resolver] Load All Note');
export const AllNotesLoadAction = createAction(
  '[Load note effect] all notes loaded',
  props<{ notes: Note[] }>(), //payload
);
export const updateNote = createAction(
  '[update Note dialog] updateNote',
  props<{ noteUpdate: Update<Note> }>(),
);
export const addNote = createAction('[add note dialog] ADDNote', props<{ note: Partial<Note> }>());
export const addNottSuccess = createAction('[add note successfuly]', props<{ note: Note }>());
export const deleteNote = createAction('[delete Note]Delete', props<{ id: string }>());
