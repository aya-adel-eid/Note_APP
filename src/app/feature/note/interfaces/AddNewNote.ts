export interface Note {
  title: string;
  content: string;
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NoteData {
  msg: string;
  note: Note;
}
