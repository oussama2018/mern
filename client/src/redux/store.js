import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Correction : Utilisation d'une nouvelle variable pour éviter l'erreur de référence
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
