import {combineReducers, configureStore} from '@reduxjs/toolkit';
import noteReducer from '../slices/noteSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

let persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
let rootReducer = combineReducers({
  note: noteReducer,
});
let persistedReducer = persistReducer(persistConfig, rootReducer);
const Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default Store;
