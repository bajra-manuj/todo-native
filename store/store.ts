import {configureStore} from '@reduxjs/toolkit';
import noteReducer from '../slices/noteSlice';

const Store = configureStore({
  reducer: {
    note: noteReducer,
  },
});

export default Store;
