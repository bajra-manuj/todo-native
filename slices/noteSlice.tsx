import {createSlice} from '@reduxjs/toolkit';
import {NoteType} from '../Components/Note';

type InitialState = {
  notes: NoteType[];
};
const initialState: InitialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNewNote: (state, action) => {
      const newNote: NoteType = action.payload;
      state.notes = [...state.notes, newNote];
    },
    updateNote: (state, action) => {
      const updatedNote: NoteType = action.payload;
      state.notes = state.notes.map(note => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }
        return note;
      });
    },
    deleteNote: (state, action) => {
      const deleteId: string = action.payload;
      state.notes = state.notes.filter(note => note.id !== deleteId);
    },
    toggleDoneStatus: (state, action) => {
      const id = action.payload;
      state.notes = state.notes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            done: !note.done,
          };
        }
        return note;
      });
    },
  },
});

export default noteSlice.reducer;
export const {addNewNote, updateNote, deleteNote, toggleDoneStatus} =
  noteSlice.actions;
